import { MailtrapClient } from "mailtrap"

export const emailClient = new MailtrapClient({ 
    token:  process.env.MAILTRAP_TOKEN!
});

// const sender = { name: "Mailtrap Test", email: SENDER_EMAIL };

