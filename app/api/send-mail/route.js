import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  const { fullName, phone, email, serviceType, description } = await request.json();

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"PestGuard Contact" <${process.env.SMTP_USER}>`,
      to: "ikonpestcontrolservice@gmail.com",
      subject: "New Consultation Request",
      text: `
        Full Name: ${fullName}
        Phone: ${phone}
        Email: ${email}
        Service Type: ${serviceType}
        Description: ${description}
      `.trim(),
      html: `
        <h2>New PestGuard Consultation Request</h2>
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service Type:</strong> ${serviceType}</p>
        <p><strong>Description:</strong><br/>${description.replace(/\n/g, '<br/>')}</p>
      `,
    });

    return NextResponse.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send email" },
      { status: 500 }
    );
  }
}
