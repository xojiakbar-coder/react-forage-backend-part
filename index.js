import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger.js";

const app = express();

// Test endpoint
app.get("/api/hello", (req, res) => {
  res.json({ message: "Salom, dunyo!" });
});

app.get("/swagger.json", (req, res) => {
  res.json(swaggerSpec);
});

// Swagger UI route
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server ${port} portda ishlayapti`);
});

export default app;
