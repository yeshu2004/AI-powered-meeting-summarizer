const nodemailer = require("nodemailer")

function makeTransport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    const err = new Error("SMTP configuration missing.");
    err.status = 500;
    throw err;
  }
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    auth: { user: SMTP_USER, pass: SMTP_PASS }
  });
}

async function sendSummaryMail({ to, subject, body }) {
  const transporter = makeTransport();
  const info = await transporter.sendMail({
    from: process.env.MAIL_FROM || "no-reply@ainotes.local",
    to, subject,
    text: body
  });
  return Boolean(info?.messageId);
}


module.exports = {makeTransport, sendSummaryMail}