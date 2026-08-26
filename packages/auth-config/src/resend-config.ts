import { env } from '@repo/env-config/env';
import { Resend } from 'resend';

const resend = new Resend(env.RESEND_API_KEY);

interface SendEmailOptions {
    to: string;
    subject: string;
    html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailOptions) {
    await resend.emails.send({
        from: env.RESEND_FROM_EMAIL,
        to,
        subject,
        html
    });
}
