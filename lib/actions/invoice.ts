"use server"

import { requireUser } from "../hook"
import { parseWithZod } from "@conform-to/zod"
import { invoiceSchema } from "../zod-schema";
import { prisma } from "../prisma";
import { redirect } from "next/navigation";

export async function createInvoice(prevState: any, formData: FormData) {
    const session = await requireUser();
    const submission = parseWithZod(formData, {
        schema: invoiceSchema
    })

    if(submission.status !== 'success') {
        return submission.reply()
    }

    const data = await prisma.invoice.create({
        data: {
            id: session.user?.id,
            clientAddress: submission.value.clientAddress,
            clientEmail: submission.value.clientEmail,
            clientName: submission.value.clientName,
            currency: submission.value.currency,
            date: submission.value.date,
            dueDate: submission.value.dueDate,
            fromAddress: submission.value.fromAddress,
            fromEmail: submission.value.fromEmail,
            fromName: submission.value.fromName,
            invoiceItemDescription: submission.value.invoiceItemDescription,
            invoiceItemQuantity: submission.value.invoiceItemQuantity,
            invoiceItemRate: submission.value.invoiceItemRate,
            invoiceName: submission.value.invoiceName,
            invoiceNumber: submission.value.invoiceNumber,
            status: submission.value.status,
            total: submission.value.total,
            note: submission.value.note
        }
    })
    redirect("/dashboard/invoices")

}