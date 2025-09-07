import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { swaggerSpec } from "./swagger.js";

const app = express();

// __dirname o‘rnini ES Module uchun yasaymiz
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Swagger JSON
app.get("/swagger.json", (req, res) => {
  res.json(swaggerSpec);
});

// Swagger UI static fayllarini serve qilish
import swaggerUiDist from "swagger-ui-dist";
const swaggerUiPath = swaggerUiDist.absolutePath();

app.use("/api-docs", express.static(swaggerUiPath));

// Swagger UI index.html faylini json bilan bog‘lash
app.get("/api-docs", (req, res) => {
  res.sendFile(path.join(swaggerUiPath, "index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server ${port} portda ishlayapti`);
});

export default app;
