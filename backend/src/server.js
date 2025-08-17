const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const rateLimit = require("express-rate-limit")
const dotenv = require("dotenv")
dotenv.config()

const aiRoutes = require("./routes/ai.js");
const emailRoutes =  require("./routes/email.js");
const { notFound, errorHandler } = require("./middleware/error.js");

const app = express();

const origins = (process.env.CORS_ORIGINS || "").split(",").map(s => s.trim()).filter(Boolean);
app.use(cors({ origin: origins.length ? origins : true, credentials: false }));
app.use(helmet());
app.use(express.json({ limit: "2mb" }));

const limiter = rateLimit({ windowMs: 60_000, max: 30, standardHeaders: true, legacyHeaders: false });
app.use("/api", limiter);

app.get("/health", (req, res) => res.json({ ok: true }));

app.use("/api", aiRoutes);
app.use("/api", emailRoutes);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Backend listening on :${port}`));
