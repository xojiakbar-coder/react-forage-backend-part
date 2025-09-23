import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import todoModel from "../models/todoModel.js";

const router = express.Router();

router.use(authMiddleware);

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Get list of todos
 *     responses:
 *       200:
 *         description: Todos retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 */
router.get("/todos", (req, res) => {
  res.send(todoModel);
});

/**
 * @swagger
 * /todos/{id}:
 *   get:
 *     summary: Get single todo by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Todo retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 */
router.get("/todos/:id", (req, res) => {
  const id = req.params.id;
  const todo = todoModel.find((todo) => todo.id === parseInt(id));

  if (!todo) {
    return res.status(404).send({ message: "Todo not found" });
  }

  res.send(todo);
});

/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Create a new todo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Todo created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 */
router.post("/todos", (req, res) => {
  const { title, description } = req.body;
  const todo = { id: todoModel.length + 1, title, description };

  todoModel.push(todo);

  res.status(201).send(todo);
});

export default router;
