import crypto from 'crypto'

const createRazorpaySignature = ({ orderId, paymentId, secret }) => {
    return crypto
        .createHmac('sha256', secret)
        .update(`${orderId}|${paymentId}`)
        .digest('hex')
}

const isValidRazorpaySignature = ({ orderId, paymentId, signature, secret }) => {
    if (!orderId || !paymentId || !signature || !secret) {
        return false
    }

    const expectedSignature = createRazorpaySignature({ orderId, paymentId, secret })
    const expectedBuffer = Buffer.from(expectedSignature, 'hex')
    const receivedBuffer = Buffer.from(signature, 'hex')

    if (expectedBuffer.length !== receivedBuffer.length) {
        return false
    }

    return crypto.timingSafeEqual(expectedBuffer, receivedBuffer)
}

export { createRazorpaySignature, isValidRazorpaySignature }
