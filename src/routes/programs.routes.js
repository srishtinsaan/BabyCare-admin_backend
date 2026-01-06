import { Router } from "express";

import {
  updateHeading,
  updateSubHeading,
  updateProgramItem
} from "../controllers/programs.controller.js";

import {upload} from "../middlewares/multer.js";

const router = Router();

router.post("/heading", updateHeading);
router.post("/subheading", updateSubHeading);
router.patch("/item/:programId", upload.single("image"), updateProgramItem);


export default router;
