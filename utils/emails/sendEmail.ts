import nodemailer from 'nodemailer';

export const sendEmail = async ({
  to,
  subject,
  message,
  withHTML,
}: {
  to: string;
  subject: string;
  message: string;
  withHTML?: boolean;
}) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 2525,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // 2) Define the email options
  const mailOptions = {
    from: 'NextJS blogpost app: Meta Blog',
    to,
    subject,
    [withHTML ? 'html' : 'text']: message,
  };

  // 3) Send an email
  await transporter.sendMail(mailOptions);
};
