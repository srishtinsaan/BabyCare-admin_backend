import express from "express";
import cors from "cors";

import homeRoutes from "./routes/home.routes.js";
import aboutRoutes from "./routes/about.routes.js";
import programsRoutes from "./routes/programs.routes.js";
import eventsRoutes from "./routes/events.routes.js";
import blogsRoutes from "./routes/blogs.routes.js";
import teamRoutes from "./routes/team.routes.js";
import testimonialsRoutes from "./routes/testimonials.routes.js";

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


// real routes
app.use("/home", homeRoutes);
app.use("/about", aboutRoutes);
app.use("/programs", programsRoutes);
app.use("/events", eventsRoutes);
app.use("/blogs", blogsRoutes);
app.use("/team", teamRoutes);
app.use("/testimonials", testimonialsRoutes);




export default app