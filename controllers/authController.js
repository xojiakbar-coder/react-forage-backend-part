// controllers/authController.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db.js"; // MySQL connection pool

const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Email bor-yo‘qligini tekshirish
    const [existing] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (existing.length > 0) {
      return res.status(400).send({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query("INSERT INTO users (email, password) VALUES (?, ?)", [
      email,
      hashedPassword,
    ]);
    res.status(201).send({ message: "User created successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (rows.length === 0) {
      return res.status(400).send({ message: "Invalid email or password" });
    }
    const user = rows[0];

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).send({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    res.send({ token });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const signout = async (req, res) => {
  // token invalidatsiyasini bu yerda amalga oshirasiz (blacklist, redis va h.k.)
  res.send({ message: "Token invalidated successfully" });
};

export default { signup, signin, signout };
