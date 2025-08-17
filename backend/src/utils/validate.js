const {z} = require("zod")

const summarizeSchema = z.object({
  transcript: z.string().min(30, "Transcript is too short (min 30 chars).").max(200000, "Transcript is too long."),
  prompt: z.string().min(3, "Prompt required.").max(1200, "Prompt too long.")
});

const emailSchema = z.object({
  to: z.string().email("Valid recipient email required."),
  subject: z.string().min(1).max(200),
  body: z.string().min(1).max(200000)
});

const validate = (schema, data) => {
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    const msg = parsed.error.errors.map(e => `${e.path.join(".")}: ${e.message}`).join("; ");
    const err = new Error(msg);
    err.status = 400;
    throw err;
  }
  return parsed.data;
};

module.exports = {summarizeSchema, emailSchema, validate}
