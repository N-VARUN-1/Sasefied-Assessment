import express from "express";
import { addTask, getTasks } from "../controllers/form.controller.js";

const router = express.Router();

router.post("/addtask", addTask);
router.get("/viewtasks", getTasks);

export default router;
