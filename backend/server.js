const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    message: "Automated Application Deployment Platform API",
    status: "running",
    version: "1.0.0"
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy"
  });
});

app.get("/api/info", (req, res) => {
  res.json({
    application: "Automated Application Deployment Platform",
    environment: process.env.NODE_ENV || "development",
    version: "1.0.0"
  });
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
