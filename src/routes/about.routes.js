import { Router } from "express";

import {
  getAboutData,
  updateHeading,
  updateSubHeading,
  updateParagraph,
  updateRightImage,
  updateBackgroundImage
} from "../controllers/about.controller.js";

import {upload} from "../middlewares/multer.js";

const router = Router();

router.get("/", getAboutData);

router.post("/heading", updateHeading);
router.post("/subheading", updateSubHeading);
router.post("/paragraph", updateParagraph);

router.post("/right-image", upload.single("image"), updateRightImage);
router.post("/bg-image", upload.single("image"), updateBackgroundImage);


export default router;
