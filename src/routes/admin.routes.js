import { Router } from "express";
import { updateUserImage } from "../controllers/admin.controller.js";
import {upload} from "../middlewares/multer.js";

const router = Router();

router.post("/about", upload.single("image"), updateUserImage)

export default router;
