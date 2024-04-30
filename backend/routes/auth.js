const express = require("express");
const { registerController, loginController, logoutController, refetchController } = require("../controller/authcontroller");
const router = express.Router();

router.post("/register",registerController)

router.post("/login",loginController)

router.get("/logout",logoutController)

router.get("/refetch",refetchController)

module.exports = router;
