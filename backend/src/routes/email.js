const express = require("express");
const { emailSchema, validate } = require("../utils/validate.js");
const { sendSummaryMail } = require("../lib/mailer.js");

const router = express.Router()

router.post("/send-email", async (req, res, next) => {
  try {
    const payload = validate(emailSchema, req.body);
    const ok = await sendSummaryMail(payload);
    res.json({ ok });
  } catch (e) { next(e); }
});

module.exports = router
// export default router; 
