import { prisma } from "@/lib/prisma";
import { emailClient } from "@/app/utils/mailtrap";
import { requireUser } from "@/lib/hook";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, context: { params: { invoiceId: string } }) {
  try {
    const session = await requireUser();

    // @ts-ignore
    const { invoiceId } = context.params

    const invoiceData = await prisma.invoice.findUnique({
      where: {
        id: invoiceId,
        userId: session.user?.id,
      },
    });

    if (!invoiceData) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    const sender = {
      email: "hello@demomailtrap.co",
      name: "Souvik Biswas"
    };

    emailClient.send({
       from: sender,
       to: [{ email: "souvik741156@gmail.com" }],
       template_uuid: "e095ec86-4127-46d0-b1bb-5e1a9e417075",
       template_variables: {
            "first_name": invoiceData.clientName,
            "company_info_name": "Billance",
            "company_info_address": "Park street",
            "company_info_city": "Kolkata",
            "company_info_zip_code": "877887",
            "company_info_country": "India"
        }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send Email reminder" },
      { status: 500 }
    );
  }
}
