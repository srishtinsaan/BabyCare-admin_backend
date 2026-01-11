import { Router } from "express";

import {
  gettestimonials,
  addtestimonialItem,
  updateHeading,
  updateSubHeading,
  updatetestimonialItem,
} from "../controllers/testimonials.controller.js";

import { upload } from "../middlewares/multer.js";

const router = Router();

router.get("/", gettestimonials);

router.post("/heading", updateHeading);
router.post("/subheading", updateSubHeading);
router.post("/item", upload.single("image"), addtestimonialItem);

router.patch("/item/:testimonialId", upload.single("image"), updatetestimonialItem);

export default router;
