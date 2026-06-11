import fs from 'fs'
import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import razorpay from 'razorpay'
import { isValidRazorpaySignature } from '../utils/razorpaySignature.js'

const fail = (res, status, message) => res.status(status).json({ success: false, message })

//api to register
const registerUser = async (req,res) =>{
    try {
        
        const { name,email,password } = req.body

        //validating credential
        if (!name || !email || !password) {
            return fail(res, 400, "Missing Details")
        }
        if (!validator.isEmail(email)) {
            return fail(res, 400, "Enter a valid Email")
        }
        if (password.length < 8) {
            return fail(res, 400, "Enter a strong Password")
        }

        //hashing user password using bcrypt
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const userData = {
            name,
            email,
            password:hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

        res.json({success:true,token})

    } catch (error) {
        console.error(error.message)
        if (error.code === 11000) {
            return fail(res, 409, "Email already registered")
        }
        fail(res, 500, error.message)
    }
}

//api for user login
const loginUser = async (req,res)=>{
    try {

        const {email,password} = req.body
        const user = await userModel.findOne({email})

        if (!user) {
          return fail(res, 401, 'User Not Exist')
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if (isMatch) {
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
            res.json({success:true,token})
        }else{
            fail(res, 401, "Invalid Credentials")
        }

    } catch (error) {
        console.error(error.message)
        fail(res, 500, error.message)
    }
}

//api to get user data

const getProfile = async (req,res)=>{

    try {
        
        const userId = req.userId
        const userData = await userModel.findById(userId).select('-password')
        if (!userData) {
            return fail(res, 404, 'User not found')
        }

        res.json({success:true,userData})

    } catch (error) {
        console.error(error.message)
        fail(res, 500, error.message)
    }

}

//api to update profile
const updateProfile = async (req,res)=>{
    try {
        const userId = req.userId
        const {name,phone,address,dob,gender} = req.body
        const imageFile = req.file

        if (!name || !phone || !gender || !dob  ) {
            return fail(res, 400, "Data Missing")
        }

        let parsedAddress
        try {
            parsedAddress = JSON.parse(address)
        } catch {
            return fail(res, 400, "Invalid address")
        }

        const updatedUser = await userModel.findByIdAndUpdate(userId,{name,phone,address:parsedAddress,dob,gender})
        if (!updatedUser) {
            return fail(res, 404, 'User not found')
        }

        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
            const imageURL = imageUpload.secure_url
            await userModel.findByIdAndUpdate(userId,{image:imageURL})

            fs.unlink(imageFile.path, (err) => {
                if (err) console.error("Error deleting local file:", err);
            });
        }

        res.json({success:true,message:"Profile Updated"})

    } catch (error) {
        console.error(error.message)
        fail(res, 500, error.message)
    }
}

//api to book appointment
const bookAppointment = async (req,res)=>{
    try {
        
        const userId = req.userId
        const {docId,slotDate,slotTime} = req.body

        if (!docId || !slotDate || !slotTime) {
            return fail(res, 400, 'Missing appointment details')
        }

        const docData = await doctorModel.findById(docId).select('-password')
        if (!docData) {
            return fail(res, 404, 'Doctor not found')
        }

        if (!docData.available) {
            return fail(res, 409, 'Doctor not Available')
        }

        let slots_booked = docData.slots_booked

        //checking for slots availability
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {

                return fail(res, 409, 'Slot not Available')
            }else{
                slots_booked[slotDate].push(slotTime)
            }
        }else{
            slots_booked[slotDate]=[]
            slots_booked[slotDate].push(slotTime)

        }

        const userData = await userModel.findById(userId).select('-password')
        if (!userData) {
            return fail(res, 404, 'User not found')
        }

        delete docData.slots_booked

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount:docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        const updatedDoctor = await doctorModel.findOneAndUpdate(
            {
                _id: docId,
                [`slots_booked.${slotDate}`]: { $ne: slotTime }
            },
            { $push: { [`slots_booked.${slotDate}`]: slotTime } },
            { new: true }
        )

        if (!updatedDoctor) {
            await appointmentModel.findByIdAndDelete(newAppointment._id)
            return fail(res, 409, 'Slot not Available')
        }


        res.json({ success:true,  message:'Appointment Booked' })

    } catch (error) {
        console.error(error.message)
        fail(res, 500, error.message)
    }
}


//api to get user appointments for frontend
const listAppointment = async(req,res)=>{
    try {
        
        const userId = req.userId
        const appointments = await appointmentModel.find({userId})

        res.json({success:true,appointments})

    } catch (error) {
        console.error(error.message)
        fail(res, 500, error.message)
    }
}

//api to cancel appointments
const cancelAppointment = async(req,res)=>{
    try {
        
        const userId = req.userId
        const {appointmentId} = req.body
        if (!appointmentId) {
            return fail(res, 400, 'Missing appointment id')
        }

        const appointmentData = await appointmentModel.findById(appointmentId)
        if (!appointmentData) {
            return fail(res, 404, 'Appointment not found')
        }

        //verify appointment user
        if (appointmentData.userId !== userId ) {
            return fail(res, 403, 'Unauthorized Action')
        }

        await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})

        //releasing doctor slot after cancelling appointment

        const {docId,slotDate,slotTime} = appointmentData

        const doctorData = await doctorModel.findById(docId)
        if (!doctorData) {
            return res.json({success:true,message:'Appointment cancelled'})
        }

        let slots_booked = doctorData.slots_booked

        if (Array.isArray(slots_booked[slotDate])) {
            slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)
        }

        await doctorModel.findByIdAndUpdate(docId,{slots_booked})

        res.json({success:true,message:'Appointment cancelled'})

    } catch (error) {
        console.error(error.message)
        fail(res, 500, error.message)
    }
}

const razorpayInstance = new razorpay({
    key_id:process.env.KEY_ID,
    key_secret:process.env.KEY_SECRET 
})

// api to make payment of appointment using razorpay
const paymentRazorpay = async(req,res)=>{

    try {

        const {appointmentId} = req.body
        const userId = req.userId

        if (!appointmentId) {
            return fail(res, 400, "Missing appointment id")
        }

        const appointmentData = await appointmentModel.findById(appointmentId)
    
        if (!appointmentData) {
            return fail(res, 404, "Appointment cancelled or not found")
        }
        if (appointmentData.cancelled) {
            return fail(res, 409, "Appointment cancelled or not found")
        }
        if (appointmentData.userId !== userId) {
            return fail(res, 403, "Unauthorized Action")
        }
    
        // creating options for razorpay payment
        const options={
            amount:appointmentData.amount*100,
            currency:process.env.CURRENCY,
            receipt:appointmentId,
        }
    
    // creation of an order
    const order = await razorpayInstance.orders.create(options)
    res.json({success:true,order})
        
    } catch (error) {
        console.error(error.message)
        fail(res, 500, error.message)
    }

   

}


// api to verify payment using razorpay
const verifyRazorpay = async(req,res)=>{
    try {
        
        const userId = req.userId
        const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return fail(res, 400, 'Missing payment verification details')
        }

        const isPaymentSignatureValid = isValidRazorpaySignature({
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
            signature: razorpay_signature,
            secret: process.env.KEY_SECRET
        })

        if (!isPaymentSignatureValid) {
            return fail(res, 400, 'Payment verification failed')
        }

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        const appointmentData = await appointmentModel.findById(orderInfo.receipt)

        if (!appointmentData || appointmentData.userId !== userId) {
            return fail(res, 404, 'Appointment not found')
        }

       
        if (orderInfo.status === 'paid') {
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
            res.json({success:true,message:'Payment Successful'})
        }else{
            fail(res, 400, 'Payment Failed')
        }
        


    } catch (error) {
        console.error(error.message)
        fail(res, 500, error.message)
    }
}


export {registerUser,loginUser,getProfile,updateProfile,bookAppointment,listAppointment,cancelAppointment,paymentRazorpay,verifyRazorpay}
