require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

const app = express();

// --- Middleware ---
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("combined"));

// --- Health Check ---
app.get("/health", (req, res) => res.send("OK"));

// --- Routes ---
const geminiRoutes = require(path.join(__dirname, "src", "routes", "gemini"));
app.use("/api", geminiRoutes);

// --- 404 Handler ---
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// --- Global Error Handler ---
app.use((err, req, res, next) => {
  console.error("💥 ERROR STACK:", err.stack);
  if (err.response) console.error("💥 API RESP ERROR:", err.response.data);
  res.status(500).json({ error: "Internal Server Error" });
});

// --- Start Server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

console.log("API key loaded:", process.env.GEMINI_API_KEY);
