import 'dotenv/config'
import bcrypt from 'bcrypt'
import connectDB from '../config/mongodb.js'
import doctorModel from '../models/doctorModel.js'

const placeholderImage =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
      <rect width="400" height="300" fill="#f4f6f4"/>
      <circle cx="200" cy="110" r="44" fill="#d8ded8"/>
      <path d="M120 242c10-48 42-78 80-78s70 30 80 78" fill="#d8ded8"/>
      <path d="M150 250h100" stroke="#4b5563" stroke-width="10" stroke-linecap="round"/>
      <text x="200" y="278" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="#4b5563">Doctor profile</text>
    </svg>
  `.trim())

const doctors = [
  {
    name: 'Dr. Aisha Menon',
    email: 'aisha.menon@docdock.local',
    image: placeholderImage,
    speciality: 'General physician',
    degree: 'MBBS',
    experience: '4 Years',
    fees: 500,
    address: { line1: 'Indiranagar Clinic', line2: 'Bengaluru' },
    about: 'General physician focused on routine consultations, preventive care, and follow-up visits.',
  },
  {
    name: 'Dr. Rohan Mehta',
    email: 'rohan.mehta@docdock.local',
    image: placeholderImage,
    speciality: 'Dermatologist',
    degree: 'MBBS, MD',
    experience: '5 Years',
    fees: 700,
    address: { line1: 'HSR Layout Clinic', line2: 'Bengaluru' },
    about: 'Dermatologist handling acne, skin allergy, hair fall, and routine skin checks.',
  },
  {
    name: 'Dr. Nisha Rao',
    email: 'nisha.rao@docdock.local',
    image: placeholderImage,
    speciality: 'Gynecologist',
    degree: 'MBBS, MS',
    experience: '6 Years',
    fees: 800,
    address: { line1: 'Jayanagar Clinic', line2: 'Bengaluru' },
    about: 'Gynecologist focused on consultations, menstrual health, and pregnancy follow-up visits.',
  },
  {
    name: 'Dr. Arjun Kapoor',
    email: 'arjun.kapoor@docdock.local',
    image: placeholderImage,
    speciality: 'Pediatricians',
    degree: 'MBBS, DCH',
    experience: '5 Years',
    fees: 650,
    address: { line1: 'Whitefield Clinic', line2: 'Bengaluru' },
    about: 'Pediatrician for child health visits, fever care, vaccinations, and growth follow-up.',
  },
  {
    name: 'Dr. Kavya Iyer',
    email: 'kavya.iyer@docdock.local',
    image: placeholderImage,
    speciality: 'Neurologist',
    degree: 'MBBS, DM',
    experience: '8 Years',
    fees: 1000,
    address: { line1: 'Malleshwaram Clinic', line2: 'Bengaluru' },
    about: 'Neurologist handling headache, nerve pain, seizure follow-up, and related consultations.',
  },
  {
    name: 'Dr. Vikram Shah',
    email: 'vikram.shah@docdock.local',
    image: placeholderImage,
    speciality: 'Gastroenterologist',
    degree: 'MBBS, DM',
    experience: '7 Years',
    fees: 900,
    address: { line1: 'Koramangala Clinic', line2: 'Bengaluru' },
    about: 'Gastroenterologist for acidity, digestion issues, liver follow-up, and stomach pain.',
  },
]

const seedDoctors = async () => {
  await connectDB()

  const password = await bcrypt.hash('Doctor@123', 10)
  const docs = doctors.map((doctor) => ({
    ...doctor,
    password,
    available: true,
    date: Date.now(),
    slots_booked: {},
  }))

  await doctorModel.deleteMany({ email: { $regex: '@docdock\\.local$' } })
  await doctorModel.insertMany(docs)

  console.log(`Seeded ${docs.length} local doctor profiles`)
  process.exit(0)
}

seedDoctors().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
