import express from "express";
import cors from "cors";
import adminRoutes from "./routes/admin.routes.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/admin", adminRoutes);

app.listen(5001, () => console.log("Admin Backend Running on 5001"));
