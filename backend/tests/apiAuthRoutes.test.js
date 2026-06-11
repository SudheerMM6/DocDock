import test, { after, afterEach, before } from 'node:test'
import assert from 'node:assert/strict'

process.env.JWT_SECRET = process.env.JWT_SECRET || 'test_jwt_secret_32_characters_long'
process.env.ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com'
process.env.ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin_password'
process.env.MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/docdock_test'
process.env.CLOUDINARY_NAME = process.env.CLOUDINARY_NAME || 'cloud'
process.env.CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || 'key'
process.env.CLOUDINARY_SECRET_KEY = process.env.CLOUDINARY_SECRET_KEY || 'secret'
process.env.KEY_ID = process.env.KEY_ID || 'rzp_test_key'
process.env.KEY_SECRET = process.env.KEY_SECRET || 'rzp_test_secret'
process.env.CURRENCY = process.env.CURRENCY || 'INR'

const { default: request } = await import('supertest')
const { default: mongoose } = await import('mongoose')
const { MongoMemoryServer } = await import('mongodb-memory-server')
const { default: jwt } = await import('jsonwebtoken')
const { default: app } = await import('../app.js')
const { default: userModel } = await import('../models/userModel.js')
const { default: doctorModel } = await import('../models/doctorModel.js')
const { default: appointmentModel } = await import('../models/appointmentModel.js')
const { validateRequiredEnvVars } = await import('../config/env.js')

let mongoServer

const createUserToken = (userId) => jwt.sign({ id: String(userId) }, process.env.JWT_SECRET)

const createUser = (overrides = {}) =>
  userModel.create({
    name: 'Patient One',
    email: `patient-${Date.now()}-${Math.random()}@example.com`,
    password: 'hashed-password',
    ...overrides,
  })

const createDoctor = (overrides = {}) =>
  doctorModel.create({
    name: 'Dr Test',
    email: `doctor-${Date.now()}-${Math.random()}@example.com`,
    password: 'hashed-password',
    image: 'https://example.com/doctor.png',
    speciality: 'General physician',
    degree: 'MBBS',
    experience: '5 years',
    about: 'General consultation',
    fees: 500,
    address: { line1: 'Clinic road', line2: 'City' },
    date: Date.now(),
    slots_booked: {},
    ...overrides,
  })

before(async () => {
  mongoServer = await MongoMemoryServer.create()
  await mongoose.connect(mongoServer.getUri(), { dbName: 'docdock_api_tests' })
})

afterEach(async () => {
  await Promise.all([
    userModel.deleteMany({}),
    doctorModel.deleteMany({}),
    appointmentModel.deleteMany({}),
  ])
})

after(async () => {
  await mongoose.disconnect()
  await mongoServer.stop()
})

test('protected user routes reject missing tokens', async () => {
  const response = await request(app).get('/api/user/get-profile').expect(401)

  assert.equal(response.body.success, false)
  assert.equal(response.body.message, 'Not authorized')
})

test('protected doctor routes reject missing tokens', async () => {
  const response = await request(app).get('/api/doctor/profile').expect(401)

  assert.equal(response.body.success, false)
  assert.equal(response.body.message, 'Not authorized')
})

test('admin routes reject non-admin tokens', async () => {
  const user = await createUser()
  const token = createUserToken(user._id)

  const response = await request(app).get('/api/admin/dashboard').set('atoken', token).expect(403)

  assert.equal(response.body.success, false)
  assert.equal(response.body.message, 'Admin access required')
})

test('register validation uses a bad-request status code', async () => {
  const response = await request(app)
    .post('/api/user/register')
    .send({ name: '', email: 'bad-email', password: 'short' })
    .expect(400)

  assert.equal(response.body.success, false)
  assert.equal(response.body.message, 'Missing Details')
})

test('profile route uses token identity instead of body userId', async () => {
  const tokenUser = await createUser({ name: 'Token User', email: 'token-user@example.com' })
  const bodyUser = await createUser({ name: 'Body User', email: 'body-user@example.com' })
  const token = createUserToken(tokenUser._id)

  const response = await request(app)
    .get('/api/user/get-profile')
    .set('token', token)
    .send({ userId: String(bodyUser._id) })
    .expect(200)

  assert.equal(response.body.success, true)
  assert.equal(response.body.userData.email, 'token-user@example.com')
  assert.equal(response.body.userData.password, undefined)
})

test('booking returns not-found when the doctor id is valid but missing', async () => {
  const user = await createUser()
  const token = createUserToken(user._id)
  const missingDoctorId = new mongoose.Types.ObjectId().toString()

  const response = await request(app)
    .post('/api/user/book-appointment')
    .set('token', token)
    .send({
      docId: missingDoctorId,
      slotDate: '1_1_2026',
      slotTime: '10:00 AM',
    })
    .expect(404)

  assert.equal(response.body.success, false)
  assert.equal(response.body.message, 'Doctor not found')
})

test('users cannot cancel another user appointment', async () => {
  const appointmentOwner = await createUser({ email: 'owner@example.com' })
  const otherUser = await createUser({ email: 'other@example.com' })
  const doctor = await createDoctor({ slots_booked: { '1_1_2026': ['10:00 AM'] } })
  const appointment = await appointmentModel.create({
    userId: String(appointmentOwner._id),
    docId: String(doctor._id),
    slotDate: '1_1_2026',
    slotTime: '10:00 AM',
    userData: { name: appointmentOwner.name },
    docData: { name: doctor.name },
    amount: doctor.fees,
    date: Date.now(),
  })

  const response = await request(app)
    .post('/api/user/cancel-appointment')
    .set('token', createUserToken(otherUser._id))
    .send({ appointmentId: String(appointment._id), userId: String(appointmentOwner._id) })
    .expect(403)

  assert.equal(response.body.success, false)
  assert.equal(response.body.message, 'Unauthorized Action')

  const unchangedAppointment = await appointmentModel.findById(appointment._id)
  const unchangedDoctor = await doctorModel.findById(doctor._id)

  assert.equal(unchangedAppointment.cancelled, false)
  assert.deepEqual(unchangedDoctor.slots_booked['1_1_2026'], ['10:00 AM'])
})

test('production env validation requires CORS_ORIGIN', () => {
  const originalNodeEnv = process.env.NODE_ENV
  const originalCorsOrigin = process.env.CORS_ORIGIN

  try {
    process.env.NODE_ENV = 'production'
    delete process.env.CORS_ORIGIN

    assert.throws(
      () => validateRequiredEnvVars(),
      /Missing required environment variables: CORS_ORIGIN/
    )
  } finally {
    if (originalNodeEnv) {
      process.env.NODE_ENV = originalNodeEnv
    } else {
      delete process.env.NODE_ENV
    }

    if (originalCorsOrigin) {
      process.env.CORS_ORIGIN = originalCorsOrigin
    } else {
      delete process.env.CORS_ORIGIN
    }
  }
})
