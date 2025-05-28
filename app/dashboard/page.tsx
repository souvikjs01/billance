import { requireUser } from '@/lib/hook'
import React from 'react'

export default async function DashboardRoute() {
  const session = await requireUser();
  return (
    <div>
      dashboard
    </div>
  )
}
