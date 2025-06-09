import { DashboardBlocks } from '@/components/dashboard/DashboardBlocks';
import { InvoiceGraph } from '@/components/dashboard/InvoiceGraph';
import { requireUser } from '@/lib/hook'
import React from 'react'

export default async function DashboardRoute() {
  const session = await requireUser();
  return (
    <div>
      <DashboardBlocks />
      <div className="grid gap-4 lg:grid-cols-3 md:gap-8">
        <InvoiceGraph />
      </div>
    </div>
  )
}
