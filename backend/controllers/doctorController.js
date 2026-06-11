import doctorModel from "../models/doctorModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js"

const fail = (res, status, message) => res.status(status).json({ success: false, message })

const changeAvailability = async(req,res)=>{

    try {

        const {docId} = req.body

        const docData = await doctorModel.findById(docId)
        if (!docData) {
            return fail(res, 404, 'Doctor not found')
        }
        await doctorModel.findByIdAndUpdate(docId,{available:!docData.available})
        res.json({success:true,message:'Availability Changed'})
        
    } catch (error) {
        console.error(error.message)
        fail(res, 500, error.message)
    }

}

const doctorList = async (req,res)=>{
    try {
        const doctors = await doctorModel.find({}).select(['-password','-email'])

        res.json({success:true,doctors})
    } catch (error) {
        console.error(error.message)
        fail(res, 500, error.message)
    }
}

// api for doctor login
const loginDoctor = async(req,res)=>{

    try {

        const {email,password} = req.body
        if (!email || !password) {
            return fail(res, 400, 'Missing credentials')
        }

        const doctor = await doctorModel.findOne({email})

        if (!doctor) {
            return fail(res, 401, 'Invalid Credentials')
        }

        const isMatch = await bcrypt.compare(password,doctor.password)

        if (isMatch) {
            const token = jwt.sign({id:doctor._id},process.env.JWT_SECRET)

            res.json({success:true,token})
        }else{
            fail(res, 401, 'Invalid Credentials')
        }
        
    } catch (error) {
        console.error(error.message)
        fail(res, 500, error.message)
    }

}

// api to get doctor appointments for doc panel
const appointmentsDoctor = async(req,res)=>{

    try {

        const docId = req.doctorId
        const appointments = await appointmentModel.find({docId})

        res.json({success:true,appointments})
        
    } catch (error) {
        console.error(error.message)
        fail(res, 500, error.message)
    }

}

// api to mark appointment completed
const appointmentComplete = async(req,res)=>{
    try {

        const docId = req.doctorId
        const {appointmentId} = req.body
        if (!appointmentId) {
            return fail(res, 400, 'Missing appointment id')
        }

        const appointmentData = await appointmentModel.findById(appointmentId)

        if (!appointmentData) {
            return fail(res, 404, 'Appointment not found')
        }

        if (appointmentData.docId === docId) {

            await appointmentModel.findByIdAndUpdate(appointmentId,{isCompleted:true})

            return res.json({success:true,message:'Appointment Completed'})

        }else{
            return fail(res, 403, 'Mark Failed')
        }

        
    } catch (error) {
        console.error(error.message)
        fail(res, 500, error.message)
    }
}


// api to cancel appointment completed
const appointmentCancel = async(req,res)=>{
    try {

        const docId = req.doctorId
        const {appointmentId} = req.body
        if (!appointmentId) {
            return fail(res, 400, 'Missing appointment id')
        }

        const appointmentData = await appointmentModel.findById(appointmentId)

        if (!appointmentData) {
            return fail(res, 404, 'Appointment not found')
        }

        if (appointmentData.docId === docId) {

            await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})

            return res.json({success:true,message:'Appointment Cancelled'})

        }else{
            return fail(res, 403, 'Cancellation Failed')
        }

        
    } catch (error) {
        console.error(error.message)
        fail(res, 500, error.message)
    }
}


// api to get doctor data for doctor panel
const doctorDashboard = async(req,res)=>{

    try {

        const docId = req.doctorId

        const appointments = await appointmentModel.find({docId})

        let earnings = 0

        appointments.map((item)=>{
            if (item.isCompleted || item.payment ) {
                earnings += item.amount
            }
        })

        let patients = []
        appointments.map((item)=>{
            if(!patients.includes(item.userId)) {
                patients.push(item.userId)
            }
        })

        const dashData = {
            earnings,
            appointments:appointments.length,
            patients:patients.length,
            latestAppointments:appointments.reverse().slice(0,5)
        }

        res.json({success:true,dashData})

    } catch (error) {
        console.error(error.message)
        fail(res, 500, error.message)
    }

}

// api to get doctor profile for doctor panel
const doctorProfile = async(req,res)=>{
    try {

        const docId = req.doctorId
        const profileData = await doctorModel.findById(docId).select('-password')
        if (!profileData) {
            return fail(res, 404, 'Doctor not found')
        }
        res.json({success:true,profileData})
        
        
    } catch (error) {
        console.error(error.message)
        fail(res, 500, error.message)
    }
}

// api to update doctor profile data for doctor panel
const updateDoctorProfile = async(req,res)=>{
    try {

        const docId = req.doctorId
        const { fees,address,available } = req.body

        const updatedDoctor = await doctorModel.findByIdAndUpdate(docId,{fees,address,available})
        if (!updatedDoctor) {
            return fail(res, 404, 'Doctor not found')
        }

        res.json({success:true,message:"Profile Updated Successfully"})
        
    } catch (error) {
        console.error(error.message)
        fail(res, 500, error.message)
    }
}


export {changeAvailability,doctorList,loginDoctor,
    appointmentsDoctor,appointmentComplete,
    appointmentCancel,doctorDashboard,
    doctorProfile,updateDoctorProfile
}
