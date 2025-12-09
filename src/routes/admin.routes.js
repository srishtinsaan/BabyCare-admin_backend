import { Router } from "express";

import { updateUserImage } from "../controllers/admin.controller.js";
import {getUserImage} from "../controllers/admin.controller.js"

import {upload} from "../middlewares/multer.js";

const router = Router();

router.post("/", upload.single("image"), updateUserImage);

router.get("/", getUserImage);

export default router;
