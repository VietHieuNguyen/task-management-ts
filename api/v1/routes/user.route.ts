import { Router } from "express";
import * as controller from "../controllers/user.controller"

const router: Router = Router()

router.post("/register", controller.register)

router.post("/login", controller.login)

router.post("/detail/:id", controller.detail)


export const userRoutes: Router = router