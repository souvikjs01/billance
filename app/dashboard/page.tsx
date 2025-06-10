import { DashboardBlocks } from '@/components/dashboard/DashboardBlocks';
import EmptyState from '@/components/dashboard/EmptyState';
import { InvoiceGraph } from '@/components/dashboard/InvoiceGraph';
import RecentInvoices from '@/components/dashboard/RecentInvoices';
import { Skeleton } from '@/components/ui/skeleton';
import { requireUser } from '@/lib/hook'
import { prisma } from '@/lib/prisma';
import React, { Suspense } from 'react'

async function getData(userId: string) {
  const data = await prisma.invoice.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
    },
  });

  return data;
}

export default async function DashboardRoute() {
  const session = await requireUser();
  const data = await getData(session.user?.id as string)
  return (
    <>
      {data.length < 1 ? (
        <EmptyState
          title="No invoices found"
          description="Create an invoice to see it right here"
          buttontext="Create Invoice"
          href="/dashboard/invoices/create"
        />
      ) : (
        <Suspense fallback={<Skeleton className="w-full h-full flex-1" />}>
          <DashboardBlocks />
          <div className="grid gap-4 lg:grid-cols-3 md:gap-8">
            <InvoiceGraph />
            <RecentInvoices />
          </div>
        </Suspense>
      )}
    </>
  )
}
