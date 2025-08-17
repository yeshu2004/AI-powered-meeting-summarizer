const express = require("express");
const { summarizeSchema, validate } = require("../utils/validate.js");
const { summarizeWithLLM } = require("../lib/aiservice.js");

const router = express.Router();

router.post("/summarize", async (req, res, next) => {
  try {
    const { transcript, prompt } = validate(summarizeSchema, req.body);
    let summary = await summarizeWithLLM({ transcript, prompt });
    res.json({ ok: true, summary });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
