import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

// form submission route
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send({ message: "All fields are required." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "nodemailer6831@gmail.com", 
        pass: "mmpwdviwecyrljaz",   
      },
    });

    const mailOptions = {
      from: email, 
      to: "support@example.com", 
      subject: `Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).send({ message: "Your message has been sent successfully." });
  } catch (error) {
    console.error("Error sending email:", error);;
    return res.status(500).send({ message: "Failed to send email. Please try again later." });
  }
});

export default router;