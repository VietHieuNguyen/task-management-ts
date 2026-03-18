import express, {Router}  from "express"
import Task from "../models/task.model";
const router: Router = Router();
import * as controller from "../controllers/task.controller"


router.get("/", controller.index)

router.get("/detail/:id", controller.detail)

router.patch("/change-status/:id", controller.changeStatus)

router.patch("/change-multi", controller.changeMulti)






export const taskRoutes: Router = router;