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
export const sendEmail = async (name, email, message) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER, // Sender's email
            to: process.env.RECEIVER_EMAIL, // Your email where you want to receive messages
            subject: `New Contact Form Submission from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        };

        await transporter.sendMail(mailOptions);
        return { success: true, message: "Message sent successfully!" };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, message: "Error sending message." };
    }
};