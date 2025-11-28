import express from "express";
import cors from "cors";
import aboutRoutes from "./routes/admin.routes.js"

const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials: true
})) 

app.use(
    express.json({
        limit : "16kb"
    })
)

// Test route
app.get("/", (req, res) => {
  res.send("Admin Backend Running");
});

app.post("/about", aboutRoutes);



export default app