import nodemailer, { type TransportOptions } from "nodemailer";

type MailOptions = {
  email: string;
  subject: string;
  message: string;
}

const sendEmail = async (options: MailOptions) => {
  const transporter = nodemailer.createTransport<TransportOptions>({
    //@ts-ignore
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: '"Dominik Wędzina" <dominik.wedzina@onet.pl>', 
    to: options.email,
    subject: options.subject,
    text: options.message, 
    // html: "<b>Hello world?</b>", 
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;