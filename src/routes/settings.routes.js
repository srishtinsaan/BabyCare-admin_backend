import { Router } from "express";

import {
  getsettings,
  updateusername,
  updatepassword
} from "../controllers/settings.controller.js";


const router = Router();

router.get("/", getsettings);
router.post("/newusername", updateusername);
router.post("/newpassword", updatepassword);


export default router;
