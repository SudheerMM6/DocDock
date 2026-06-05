import test from 'node:test'
import assert from 'node:assert/strict'
import { createRazorpaySignature, isValidRazorpaySignature } from '../utils/razorpaySignature.js'

test('creates a stable Razorpay signature for an order and payment', () => {
    const signature = createRazorpaySignature({
        orderId: 'order_test_123',
        paymentId: 'pay_test_456',
        secret: 'test_secret',
    })

    assert.equal(signature, 'b272703480fdac0ab4f26fe91c1959f257538587c322654319fc83e455f8a95d')
})

test('accepts a matching Razorpay signature', () => {
    const signature = createRazorpaySignature({
        orderId: 'order_test_123',
        paymentId: 'pay_test_456',
        secret: 'test_secret',
    })

    assert.equal(
        isValidRazorpaySignature({
            orderId: 'order_test_123',
            paymentId: 'pay_test_456',
            signature,
            secret: 'test_secret',
        }),
        true
    )
})

test('rejects a mismatched Razorpay signature', () => {
    assert.equal(
        isValidRazorpaySignature({
            orderId: 'order_test_123',
            paymentId: 'pay_test_456',
            signature: 'deadbeef',
            secret: 'test_secret',
        }),
        false
    )
})

test('rejects missing payment verification values', () => {
    assert.equal(
        isValidRazorpaySignature({
            orderId: '',
            paymentId: 'pay_test_456',
            signature: 'deadbeef',
            secret: 'test_secret',
        }),
        false
    )
})
