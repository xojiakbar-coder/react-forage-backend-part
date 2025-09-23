import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import userModel from "../models/userModel.js";

const router = express.Router();

router.use(authMiddleware);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get list of users
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/users", (req, res) => {
  res.send(userModel);
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get single user by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const user = userModel.find((user) => user.id === parseInt(id));

  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  res.send(user);
});

export default router;
