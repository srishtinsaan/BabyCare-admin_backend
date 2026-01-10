import { Router } from "express";

import {
  getservices,
  addserviceItem,
  updateHeading,
  updateSubHeading,
  updateserviceItem,
} from "../controllers/services.controller.js";

import { upload } from "../middlewares/multer.js";

const router = Router();

router.get("/", getservices);

router.post("/heading", updateHeading);
router.post("/subheading", updateSubHeading);
router.post("/item", upload.single("image"), addserviceItem);

router.patch("/item/:serviceId", upload.single("image"), updateserviceItem);

export default router;
