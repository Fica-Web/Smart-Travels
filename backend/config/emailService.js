import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file

// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // App password (NOT your regular password)
    },
});

// Function to send an email
export const sendEmail = async (to, subject, html) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER, // Sender's email
            to,
            subject,
            html,
        };

        await transporter.sendMail(mailOptions);
        return { success: true, message: "Message sent successfully!" };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, message: "Error sending message." };
    }
};