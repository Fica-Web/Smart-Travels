import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file

// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true, // true for port 465, false for 587
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app password
    },
});

// Function to send an email
export const sendEmail = async (name, email, message) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER, // Sender's email
            to: process.env.RECEIVER_EMAIL, // Your email where you want to receive messages
            subject: `New Contact Form Submission from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        };

        console.log("Sending email with options:", mailOptions);
        await transporter.sendMail(mailOptions);
        return { success: true, message: "Message sent successfully!" };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, message: "Error sending message." };
    }
};