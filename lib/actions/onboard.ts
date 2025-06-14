"use server"

import { requireUser } from "../hook"
import { parseWithZod } from "@conform-to/zod"
import { onboardingSchema } from "../zod-schema";
import { prisma } from "../prisma";
import { redirect } from "next/navigation";

export async function onboardUser(prevState: any, formData: FormData) {
    const session = await requireUser();

    const submission = parseWithZod(formData, {
        schema: onboardingSchema
    });

    if(submission.status !== 'success') {
        return submission.reply();
    }

    const data = await prisma.user.update({
        where: {
            id: session.user?.id,
        },
        data: {
            firstName: submission.value.firstName,
            lastName: submission.value.lastName,
            address: submission.value.address
        }
    })

    return redirect("/dashboard");
}