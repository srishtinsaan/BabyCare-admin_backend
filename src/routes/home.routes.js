import { Router } from "express";

import {
  getHomeData,
  updateHeading,
  updateSubHeading,
  updateBackgroundImage
} from "../controllers/home.controller.js";

import {upload} from "../middlewares/multer.js";

const router = Router();

router.get("/", getHomeData);

router.post("/heading", updateHeading);
router.post("/subheading", updateSubHeading);
router.post("/bg-image", upload.single("image"), updateBackgroundImage);


export default router;
