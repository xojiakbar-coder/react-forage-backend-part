import express from "express";
import dotenv from "dotenv";
import swaggerSpec from "./config/swagger.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import swaggerUi from "swagger-ui-express";
import pool from "./db.js";
import authController from "./controllers/authController.js";

dotenv.config();

const app = express();

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.post("/signout", authController.signout);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const port = process.env.PORT || 3000;

app.get("/db-test", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS result");
    res.json({ dbStatus: "OK", result: rows[0].result });
  } catch (err) {
    res.status(500).json({ dbStatus: "Error", message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
