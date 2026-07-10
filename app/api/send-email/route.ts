import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { v2 as cloudinary } from "cloudinary";
import { render } from "@react-email/components";
import React from "react";
import ClientNotice from "@/emails/ClientNotice";

// ── Configure Cloudinary (for uploading the PDF) ────
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    });

// ── Configure the Zoho mail connection ──────
const transporter = nodemailer.createTransport({
    host: "smtppro.zoho.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.ZOHO_EMAIL,
        pass: process.env.ZOHO_APP_PASSWORD,
    },
});

export async function POST(req: NextRequest) {
    try {
        // 1. Read the form data sent from the page
        const formData = await req.formData();

        const to = formData.get("to") as string;
        const recipientName = formData.get("recipientName") as string;
        const documentTitle = formData.get("documentTitle") as string;
        const bodyText = formData.get("bodyText") as string;
        const file = formData.get("file") as File | null;

        // Build subject, heading, and button label FROM the document title
        const heading = documentTitle.toUpperCase();
        const emailSubject = documentTitle;
        const buttonLabel = `Download ${documentTitle}`;

        // 2. Upload the PDF to Cloudinary (if one was provided)
        let fileUrl = "";
        let buffer: Buffer | null = null;

        if (file) {
            const bytes = await file.arrayBuffer();
            buffer = Buffer.from(bytes);

            const uploadResult = await new Promise<any>((resolve, reject) => {
                cloudinary.uploader
                .upload_stream(
                    { resource_type: "raw", folder: "Compass-home-documents" },
                    (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                    }
                )
                .end(buffer!);
            });

            fileUrl = uploadResult.secure_url;
        }

        // 3. Render the branded email template into HTML
        const emailHtml = await render(
            React.createElement(ClientNotice, {
                recipientName,
                heading,
                bodyText,
                buttonLabel: buttonLabel || "Download Document",
                buttonUrl: fileUrl,
            })
        );

        // 4. Send the email through Zoho, attaching the same file
        await transporter.sendMail({
        from: `"Compass Home" <${process.env.ZOHO_EMAIL}>`,
        to,
        subject: emailSubject,
        html: emailHtml,
        attachments:
            file && buffer
            ? [
                {
                    filename: file.name,
                    content: buffer,
                },
                ]
            : [],
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
        { success: false, error: "Something went wrong" },
        { status: 500 }
        );
    }
}