const { Router } = require("express");
const { authRegister, authLogin } = require("../controllers/auth.controller");

const router = Router();

router.post("/auth/register", authRegister);
router.post("/auth/login", authLogin);

module.exports = router;