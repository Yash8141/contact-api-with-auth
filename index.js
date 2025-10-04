import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config({ path: ".env" });

const app = express();
const port = process.env.PORT || 4000;

// Middleware function
app.use(cors());
app.use(express.json());

const mongoDbUrl = process.env.MONGODB_URL;
const dbName = process.env.DB_NAME;

// MongoDB connection
await connectDB(mongoDbUrl, dbName);

app.use("/api/users", userRoutes);

// Swagger Documentation
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Home route
app.get("/", (req, res) => {
  res.json({ 
    message: "Contact API with Authentication 🔥🔐",
    documentation: "/api/docs"
  });
});

app.use(errorHandler)
app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});
