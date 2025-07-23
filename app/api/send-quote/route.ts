import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const pricing = {
  "One Time": {
    "General Disinfectant": { RK: 799, "1BHK": 799, "2BHK": 999, "3BHK": 1199, "4BHK": 1399 },
    "Termite Treatment": { RK: 999, "1BHK": 1299, "2BHK": 1499, "3BHK": 1699, "4BHK": 1899 },
    "Bed Bug Treatment": { RK: 1499, "1BHK": 1599, "2BHK": 1799, "3BHK": 1999, "4BHK": 2299 },
    "Wood Borer Treatment": { RK: 1799, "1BHK": 1799, "2BHK": 2199, "3BHK": 2599, "4BHK": 3099 },
    "Rat Control": { RK: 1199, "1BHK": 1399, "2BHK": 1599, "3BHK": 1899, "4BHK": 2199 },
    "Ticks Treatment": { RK: 1899, "1BHK": 1899, "2BHK": 2299, "3BHK": 2699, "4BHK": 3199 },
    "Honey Bee Removal": { RK: 1999, "1BHK": 1999, "2BHK": 2399, "3BHK": 2799, "4BHK": 3299 },
    "Wasp Removal": { RK: 1799, "1BHK": 1799, "2BHK": 2199, "3BHK": 2599, "4BHK": 3099 },
    "Hornet Nest Removal": { RK: 2499, "1BHK": 2499, "2BHK": 2899, "3BHK": 3299, "4BHK": 3799 },
    "Beehive Relocation": { RK: 2999, "1BHK": 2999, "2BHK": 3499, "3BHK": 3999, "4BHK": 4499 },
    "Mosquito Fogging": { RK: 799, "1BHK": 899, "2BHK": 1099, "3BHK": 1199, "4BHK": 1599 }
  },
  "1 Year AMC (12 months - 3 times)": {
    "General Disinfectant": { RK: 1999, "1BHK": 2199, "2BHK": 2399, "3BHK": 2599, "4BHK": 2899 },
    "Termite Treatment": { RK: 2899, "1BHK": 3099, "2BHK": 4299, "3BHK": 4899, "4BHK": 5599 },
    "Bed Bug Treatment": { RK: 4874, "1BHK": 4874, "2BHK": 3599, "3BHK": 3999, "4BHK": 4499 },
    "Wood Borer Treatment": { RK: 4449, "1BHK": 4449, "2BHK": 5449, "3BHK": 6449, "4BHK": 7749 },
    "Rat Control": { RK: 3099, "1BHK": 3499, "2BHK": 3899, "3BHK": 4499, "4BHK": 5199 },
    "Honey Bee Removal": { RK: 1999, "1BHK": 1999, "2BHK": 2399, "3BHK": 2799, "4BHK": 3299 },
    "Wasp Removal": { RK: 1799, "1BHK": 1799, "2BHK": 2199, "3BHK": 2599, "4BHK": 3099 },
    "Hornet Nest Removal": { RK: 2499, "1BHK": 2499, "2BHK": 2899, "3BHK": 3299, "4BHK": 3799 },
    "Beehive Relocation": { RK: 2999, "1BHK": 2999, "2BHK": 3499, "3BHK": 3999, "4BHK": 4499 },
    "Ticks Treatment": { RK: 4699, "1BHK": 4699, "2BHK": 5699, "3BHK": 6699, "4BHK": 8099 },
    "Mosquito Fogging": { RK: 1999, "1BHK": 2299, "2BHK": 2899, "3BHK": 3199, "4BHK": 3799 }
  },
  "2 Year AMC (24 months - 6 times)": {
    "General Disinfectant": { RK: 3799, "1BHK": 4199, "2BHK": 4599, "3BHK": 4999, "4BHK": 5599 },
    "Termite Treatment": { RK: 4899, "1BHK": 6099, "2BHK": 7199, "3BHK": 8199, "4BHK": 9399 },
    "Bed Bug Treatment": { RK: 7299, "1BHK": 8699, "2BHK": 9799, "3BHK": 10899, "4BHK": 12499 },
    "Wood Borer Treatment": { RK: 7199, "1BHK": 7199, "2BHK": 8799, "3BHK": 10399, "4BHK": 12699 },
    "Rat Control": { RK: 5999, "1BHK": 6499, "2BHK": 7499, "3BHK": 8499, "4BHK": 9499 },
    "Honey Bee Removal": { RK: 1999, "1BHK": 1999, "2BHK": 2399, "3BHK": 2799, "4BHK": 3299 },
    "Wasp Removal": { RK: 1799, "1BHK": 1799, "2BHK": 2199, "3BHK": 2599, "4BHK": 3099 },
    "Hornet Nest Removal": { RK: 2499, "1BHK": 2499, "2BHK": 2899, "3BHK": 3299, "4BHK": 3799 },
    "Beehive Relocation": { RK: 2999, "1BHK": 2999, "2BHK": 3499, "3BHK": 3999, "4BHK": 4499 },
    "Ticks Treatment": { RK: 7599, "1BHK": 7599, "2BHK": 9199, "3BHK": 10799, "4BHK": 12999 },
    "Mosquito Fogging": { RK: 4399, "1BHK": 4999, "2BHK": 5999, "3BHK": 6499, "4BHK": 7999 }
  }
} as const;


type Freq = keyof typeof pricing
type ProductType = keyof typeof pricing["One Time"]
type FlatType = keyof typeof pricing["One Time"]["General Disinfectant"]

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { frequency, productType, flatType, phone, comments } = body as {
      frequency: Freq,
      productType: ProductType,
      flatType: FlatType,
      phone: string,
      comments: string
    }

    // Validate
    if (!frequency || !productType || !flatType || !phone) {
      return NextResponse.json({ success: false, message: "Missing fields" }, { status: 400 })
    }

    const cost = pricing[frequency]?.[productType]?.[flatType]
    if (!cost) {
      return NextResponse.json({ success: false, message: "Invalid pricing data" }, { status: 400 })
    }

    // Email setup
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: `"Quote Request" <${process.env.SMTP_USER}>`,
      to: "ikonpestcontrolservice@gmail.com",
      subject: "New Quote Request",
      html: `
        <h2>New Quote Request</h2>
        <p><strong>Product Type:</strong> ${productType}</p>
        <p><strong>Flat Type:</strong> ${flatType}</p>
        <p><strong>Service Frequency:</strong> ${frequency}</p>
        <p><strong>Estimated Cost:</strong> ₹${cost.toLocaleString()}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Comments:</strong><br/>${comments?.replace(/\n/g, "<br/>") || "None"}</p>
        <hr />
        <p><em>Note: 18% GST applicable on total service charges.</em></p>
      `,
    })

    return NextResponse.json({ success: true, message: "Quote email sent successfully." })

  } catch (err) {
    console.error("Email error:", err)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
