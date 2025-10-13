import express from "express";
import { login } from "../controllers/login.js";

const router = express.Router();

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Welcome John Doe"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                   description: "JWT token for authentication"
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad request - missing email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Please fill all fields"
 *                 success:
 *                   type: boolean
 *                   example: false
 *       401:
 *         description: Unauthorized - invalid password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid password"
 *                 success:
 *                   type: boolean
 *                   example: false
 *       404:
 *         description: Not found - email doesn't exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email not exists"
 *                 success:
 *                   type: boolean
 *                   example: false
 */
router.post("/login", login);

export default router;
