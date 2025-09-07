import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger.js";

const app = express();

/**
 * @swagger
 * /api/hello:
 *   get:
 *     summary: Salom dunyo qaytaradi
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli javob
 */
app.get("/api/hello", (req, res) => {
  res.json({ message: "Salom, dunyo!" });
});

// Swagger UI route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server ${port} portda ishlayapti`);
});
