import { Router } from "express";

import {
  getEvents,addEventItem,
    updateHeading,
    updateSubHeading,
    updateeventItem
} from "../controllers/events.controller.js";

import {upload} from "../middlewares/multer.js";

const router = Router();

router.get("/", getEvents)

router.post("/heading", updateHeading);
router.post("/subheading", updateSubHeading);
router.post("/item", upload.single("image"), addEventItem)
  
router.patch(
  "/item/:eventId",
  upload.single("image"),
  updateeventItem
);


export default router;
