import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '../../../../lib/stripe'
import { updateUserSubscription, cancelUserSubscription } from '../../../../lib/subscriptions'
import { prisma } from '../../../../lib/prisma'
import { headers } from 'next/headers'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = (await headers()).get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const customerId = session.customer as string
        
        // Get customer to find user
        const customer = await stripe.customers.retrieve(customerId)
        if (typeof customer === 'object' && customer.metadata?.userId) {
          const subscriptionId = session.subscription as string
          await updateUserSubscription(
            customer.metadata.userId,
            subscriptionId,
            'active'
          )
        }
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string
        
        const customer = await stripe.customers.retrieve(customerId)
        if (typeof customer === 'object' && customer.metadata?.userId) {
          await updateUserSubscription(
            customer.metadata.userId,
            subscription.id,
            subscription.status
          )
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string
        
        const customer = await stripe.customers.retrieve(customerId)
        if (typeof customer === 'object' && customer.metadata?.userId) {
          await cancelUserSubscription(customer.metadata.userId)
        }
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}



