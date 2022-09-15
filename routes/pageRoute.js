import express from "express"
import { getIndexPage, getAboutPage, getRegisterPage, getLoginPage, getLogout, getContactPage } from "../controllers/pageController.js"


const router = express.Router()

router.route("/").get(getIndexPage)
router.route("/about").get(getAboutPage)
router.route("/register").get(getRegisterPage)
router.route("/login").get(getLoginPage)
router.route("/logout").get(getLogout)
router.route("/contact").get(getContactPage)

export default router