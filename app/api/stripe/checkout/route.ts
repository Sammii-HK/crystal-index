import { NextRequest, NextResponse } from 'next/server'
import { getSessionApp } from '../../../../lib/session-app'
import { stripe, PLAN_PRICES, CREDIT_BUNDLES } from '../../../../lib/stripe'

export async function POST(req: NextRequest) {
  try {
    const session = await getSessionApp()
    if (!session?.userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { plan, creditBundle } = body

    if (!plan && !creditBundle) {
      return NextResponse.json(
        { error: 'Plan or credit bundle required' },
        { status: 400 }
      )
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    if (plan) {
      // Create subscription checkout session
      const priceId = plan === 'PRO' ? process.env.STRIPE_PRICE_ID_PRO :
                     plan === 'COLLECTOR' ? process.env.STRIPE_PRICE_ID_COLLECTOR :
                     process.env.STRIPE_PRICE_ID_RETAIL

      if (!priceId) {
        return NextResponse.json(
          { error: 'Price ID not configured for this plan' },
          { status: 500 }
        )
      }

      const checkoutSession = await stripe.checkout.sessions.create({
        customer_email: session.user?.email || undefined,
        metadata: {
          userId: session.userId,
        },
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `${baseUrl}/collections?success=true`,
        cancel_url: `${baseUrl}/pricing?canceled=true`,
      })

      return NextResponse.json({ sessionId: checkoutSession.id, url: checkoutSession.url })
    }

    if (creditBundle) {
      // Create one-time payment for credit bundle
      const bundle = creditBundle === 'SMALL' ? CREDIT_BUNDLES.SMALL : CREDIT_BUNDLES.MEDIUM

      const checkoutSession = await stripe.checkout.sessions.create({
        customer_email: session.user?.email || undefined,
        metadata: {
          userId: session.userId,
          type: 'credit_bundle',
          credits: bundle.credits.toString(),
        },
        line_items: [
          {
            price_data: {
              currency: 'gbp',
              product_data: {
                name: `${bundle.credits} Identification Credits`,
              },
              unit_amount: bundle.price,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${baseUrl}/collections?credits_added=true`,
        cancel_url: `${baseUrl}/pricing?canceled=true`,
      })

      return NextResponse.json({ sessionId: checkoutSession.id, url: checkoutSession.url })
    }

    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Checkout session creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}

