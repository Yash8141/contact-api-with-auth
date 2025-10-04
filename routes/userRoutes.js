import express from 'express'
import { createRegister } from '../controllers/registerController.js';

const router = express.Router();

router.post("/register", createRegister);

export default router