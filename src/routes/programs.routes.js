import { Router } from "express";

import {
  getPrograms,
  updateHeading,
  updateSubHeading,
  updateProgramItem,
  addProgramItem
} from "../controllers/programs.controller.js";

import {upload} from "../middlewares/multer.js";

const router = Router();

router.get("/", getPrograms)

router.post("/heading", updateHeading);
router.post("/subheading", updateSubHeading);
router.post("/item", upload.fields([
  { name: "image", maxCount: 1 },
  { name: "teacherImg", maxCount: 1 }]), addProgramItem);

router.patch(
  "/item/:programId",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "teacherImg", maxCount: 1 }
  ]),
  updateProgramItem
);


export default router;
