"use server"

import { requireUser } from "../hook"
import { parseWithZod } from "@conform-to/zod"
import { invoiceSchema } from "../zod-schema";
import { prisma } from "../prisma";
import { redirect } from "next/navigation";
import { emailClient } from "@/app/utils/mailtrap";
import { formatCurrency } from "@/app/utils/formatCurrency";

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
            userId: session.user?.id,
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

    const sender = {
        email: "hello@demomailtrap.co",
        name: "Souvik Biswas"
    };

    emailClient.send({
        from: sender,
        to: [{email: 'souvik741156@gmail.com'}], // if your domain verified [{email: submission.value.clientEmail}]
        template_uuid: "7d939a5f-f636-41e3-82d9-0609310f1727",
        template_variables: {
            "clientName": submission.value.clientName,
            "invoiceNumber": submission.value.invoiceNumber,
            "dueDate": new Intl.DateTimeFormat('en-US', {
                dateStyle: "long",
            }).format(new Date(submission.value.dueDate)),
            "totalAmount": formatCurrency({amount: submission.value.total, currency: submission.value.currency as any}),
            "invoiceLink": `http://localhost:3000/api/invoice/${data.id}`
        }
    })

    redirect("/dashboard/invoices")

}

export async function editInvoice(prevState: any, formData: FormData) {
  const session = await requireUser();

  const submission = parseWithZod(formData, {
    schema: invoiceSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.invoice.update({
    where: {
      id: formData.get("id") as string,
      userId: session.user?.id,
    },
    data: {
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
      note: submission.value.note,
    },
  });

  const sender = {
    email: "hello@demomailtrap.co",
    name: "Souvik Biswas"
  };

  emailClient.send({
    from: sender,
    to: [{ email: "souvik741156@gmail.com" }],
    template_uuid: "63bc73b5-5a04-46c0-8b02-40a65ab70c80",
    template_variables: {
      clientName: submission.value.clientName,
      invoiceNumber: submission.value.invoiceNumber,
      invoiceDueDate: new Intl.DateTimeFormat("en-US", {
        dateStyle: "long",
      }).format(new Date(submission.value.date)),
      invoiceAmount: formatCurrency({
        amount: submission.value.total,
        currency: submission.value.currency as any,
      }),
      invoiceLink:`http://localhost:3000/api/invoice/${data.id}`
    },
  });

  return redirect("/dashboard/invoices");
}

export async function DeleteInvoice(invoiceId: string) {
  const session = await requireUser();

  await prisma.invoice.delete({
    where: {
      userId: session.user?.id,
      id: invoiceId,
    },
  });

  return redirect("/dashboard/invoices");
}

export async function MarkAsPaidAction(invoiceId: string) {
  const session = await requireUser();

  await prisma.invoice.update({
    where: {
      userId: session.user?.id,
      id: invoiceId,
    },
    data: {
      status: "PAID",
    },
  });

  return redirect("/dashboard/invoices");
}