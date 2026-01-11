import { Router } from "express";

import {
  getteams,
  addteamItem,
  updateHeading,
  updateSubHeading,
  updateteamItem,
} from "../controllers/teams.controller.js";

import { upload } from "../middlewares/multer.js";

const router = Router();

router.get("/", getteams);

router.post("/heading", updateHeading);
router.post("/subheading", updateSubHeading);
router.post("/item", upload.single("image"), addteamItem);

router.patch("/item/:teamId", upload.single("image"), updateteamItem);

export default router;
