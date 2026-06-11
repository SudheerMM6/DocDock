import validator from 'validator'
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'
import userModel from '../models/userModel.js'

const fail = (res, status, message) => res.status(status).json({ success: false, message })

// api for adding doctor
const addDoctor = async(req,res)=>{

    try {
        const { name,email,password,speciality,degree,experience,about,fees,address } = req.body
        const imageFile = req.file

        // checking for all data available to add doctor
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return fail(res, 400, 'Missing Details')
        }

        if (!imageFile) {
            return fail(res, 400, 'Doctor image is required')
        }
        
        // validating email format
        if (!validator.isEmail(email)) {
            return fail(res, 400, 'Enter a valid Email')
        }

        // validating strong password
        if (password.length < 8 ) {
            return fail(res, 400, 'Enter a strong password')
        }

        // hashing doctor password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"})
        const imageUrl = imageUpload.secure_url

        let parsedAddress
        try {
            parsedAddress = JSON.parse(address)
        } catch {
            return fail(res, 400, 'Invalid address')
        }

        const doctorData = {
            name,
            email,
            image:imageUrl,
            password:hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address:parsedAddress,
            date:Date.now() 
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()

        res.json({success:true,message:'Doctor added'})

    } catch (error) {
        
        console.error(error.message);
        if (error.code === 11000) {
            return fail(res, 409, 'Doctor email already registered')
        }
        fail(res, 500, error.message)

    }

}

// api for admin login
const loginAdmin = async(req,res)=>{
    try {

        const {email,password} = req.body
        if (!email || !password) {
            return fail(res, 400, 'Missing credentials')
        }

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            
            const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' })
            res.json({success:true,token})

        }else{
            fail(res, 401, 'Incorrect credentials')
        }
        
    } catch (error) {
        
        console.error(error.message);
        fail(res, 500, error.message)

    }
}

// api to get all doctor list for admin panel
const allDoctors = async (req,res)=>{

    try {
        
        const doctors = await doctorModel.find({}).select('-password')
        res.json({success:true,doctors})

    } catch (error) {
        console.error(error.message);
        fail(res, 500, error.message)
    }

}


// api to get all apointmnet list
const appointmentsAdmin = async(req,res)=>{
    try {
        
        const appointments = await appointmentModel.find({})
        res.json({success:true,appointments})

    } catch (error) {
        console.error(error.message);
        fail(res, 500, error.message)
    }
}

// api for appointment cancellation
const appointmentCancel = async(req,res)=>{
    try {
        
        const {appointmentId} = req.body
        if (!appointmentId) {
            return fail(res, 400, 'Missing appointment id')
        }

        const appointmentData = await appointmentModel.findById(appointmentId)

        if (!appointmentData) {
            return fail(res, 404, 'Appointment not found')
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


// api to get dashboard data

const adminDashboard = async(req,res)=>{
    try {

        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData ={
            doctors: doctors.length,
            appointments:appointments.length,
            patients:users.length,
            latestAppointments:appointments.reverse().slice(0,5)
        }

        res.json({success:true,dashData})

    } catch (error) {
        console.error(error.message)
        fail(res, 500, error.message)
    }
}

export { addDoctor,loginAdmin,allDoctors,appointmentsAdmin,appointmentCancel,adminDashboard }
