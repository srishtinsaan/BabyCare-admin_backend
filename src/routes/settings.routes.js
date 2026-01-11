import { Router } from "express";

import {
  updateusername,
  updatepassword
} from "../controllers/settings.controller.js";


const router = Router();

router.post("/newusername", updateusername);
router.post("/newpassword", updatepassword);


export default router;
