import express from "express";
import authController from "../controllers/authController.js";

const router = express.Router();

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid request
 */
router.post("/signup", authController.signup);

/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     summary: Authenticate user and return JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *       400:
 *         description: Invalid request
 */
router.post("/signin", authController.signin);

/**
 * @swagger
 * /api/auth/signout:
 *   post:
 *     summary: Invalidate token
 *     responses:
 *       200:
 *         description: Token invalidated successfully
 */
router.post("/signout", authController.signout);

export default router;
