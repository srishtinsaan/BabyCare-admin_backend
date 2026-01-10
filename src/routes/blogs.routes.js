import { Router } from "express";

import {
  getblogs,addblogItem,
    updateHeading,
    updateSubHeading,
    updateblogItem
} from "../controllers/blogs.controller.js";

import {upload} from "../middlewares/multer.js";

const router = Router();

router.get("/", getblogs)

router.post("/heading", updateHeading);
router.post("/subheading", updateSubHeading);
router.post("/item", upload.single("image"), addblogItem)
  
router.patch(
  "/item/:blogId",
  upload.single("image"),
  updateblogItem
);


export default router;
