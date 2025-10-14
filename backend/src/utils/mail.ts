import nodemailer from "nodemailer"
import { ApiError } from "./apiError";

export const sendEmail = async (user: string, token: string): Promise<void> => {

  if (!process.env.MAIL_HOST || !process.env.MAIL_PORT || !process.env.MAIL_USER || !process.env.MAIL_PASSWORD) {
    throw new ApiError(400, "Mail configuration is missing in environment variables")
  }


  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT, 10),
    secure: parseInt(process.env.MAIL_PORT, 10) === 465, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });



const info = await transporter.sendMail({
  from: '"Finance Management App - FinEase" <no-reply@finease.com>',
  to: user,
  subject: "Email Verification",
  text: `Hi there, please verify your email by clicking this link: ${process.env.BASE_URL}verify?token=${token}`,
  html: `
    <h4>Hello there!</h4>
    <p>Please verify your email by clicking the link below:</p>
    <a href="${process.env.BASE_URL}verify?token=${token}">Verify Email</a>
  `,
});

  console.log("Message sent:", info.messageId);
};



/*Note:-
async automatically makes the function return a Promise.
void means that when the Promise resolves, it doesn't give you any data — just a signal that it's done.
*/