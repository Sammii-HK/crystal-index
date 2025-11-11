import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-11-20.acacia',
  typescript: true,
})

export const PLAN_PRICES = {
  PRO: 499, // £4.99 in pence
  COLLECTOR: 999, // £9.99 in pence
  RETAIL: 2999, // £29.99 in pence
} as const

export const CREDIT_BUNDLES = {
  SMALL: { credits: 10, price: 199 }, // £1.99
  MEDIUM: { credits: 50, price: 699 }, // £6.99
} as const

export function formatPrice(amount: number): string {
  return `£${(amount / 100).toFixed(2)}`
}



