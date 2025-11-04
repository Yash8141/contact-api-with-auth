import express from "express";
import { createRegister } from "../controllers/register.js";

const router = express.Router();

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User registered successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                       description: "User's full name"
 *                     email:
 *                       type: string
 *                       example: "john@gmail.com"
 *                       description: "User's email address"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-10-18T10:30:45.123Z"
 *                       description: "User creation timestamp"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-10-18T10:30:45.123Z"
 *                       description: "User last update timestamp"
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad request - validation error or user already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   oneOf:
 *                     - example: "Please fill all the fields"
 *                     - example: "Password must be at least 8 characters long"
 *                     - example: "User with this email already exists"
 *                   description: "Error message describing the validation issue"
 *                 success:
 *                   type: boolean
 *                   example: false
 */
router.post("/register", createRegister);

export default router;
