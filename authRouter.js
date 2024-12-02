const Router = require("express");
const router = new Router();

const authController = require("./authController");

router.post("/login", authController.login);
router.post("/verify", authController.verify);

module.exports = router;
