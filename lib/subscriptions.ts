import { prisma } from './prisma'
import { stripe } from './stripe'
import { PLAN_PRICES } from './stripe'

export type UserPlan = 'FREE' | 'PRO' | 'COLLECTOR' | 'RETAIL'

export async function updateUserSubscription(
  userId: string,
  subscriptionId: string,
  status: string
) {
  return prisma().user.update({
    where: { id: userId },
    data: {
      subscriptionId,
      subscriptionStatus: status,
      // Update plan based on subscription
      plan: status === 'active' ? 'PRO' : 'FREE', // TODO: Map to correct plan
    },
  })
}

export async function cancelUserSubscription(userId: string) {
  const user = await prisma().user.findUnique({
    where: { id: userId },
    select: { subscriptionId: true },
  })

  if (user?.subscriptionId) {
    await stripe.subscriptions.cancel(user.subscriptionId)
    await prisma().user.update({
      where: { id: userId },
      data: {
        subscriptionStatus: 'cancelled',
        plan: 'FREE',
      },
    })
  }
}

export function getPlanLimits(plan: UserPlan) {
  switch (plan) {
    case 'FREE':
      return {
        identificationsPerMonth: 3,
        canSaveCollection: false,
        watermarked: true,
        canExport: false,
      }
    case 'PRO':
      return {
        identificationsPerMonth: Infinity,
        canSaveCollection: true,
        watermarked: false,
        canExport: false,
      }
    case 'COLLECTOR':
      return {
        identificationsPerMonth: Infinity,
        canSaveCollection: true,
        watermarked: false,
        canExport: true,
        priorityQueue: true,
      }
    case 'RETAIL':
      return {
        identificationsPerMonth: Infinity,
        canSaveCollection: true,
        watermarked: false,
        canExport: true,
        apiAccess: true,
      }
    default:
      return getPlanLimits('FREE')
  }
}



