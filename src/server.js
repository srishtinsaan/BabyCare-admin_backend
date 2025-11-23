import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

// Check DB connection
prisma.$connect()
  .then(() => console.log("Database connected successfully!"))
  .catch((err) => {
    console.error("Database connection failed", err);
  });


app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Admin Backend Running");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log("Admin backend running on " + PORT));
