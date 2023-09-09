const { Router } = require("express");
const { getUsers, getOneUser, updateUser, deleteUser } = require("../controllers/user.controller");

const router = Router();

router.get("/get/users", getUsers);
router.get("/get/user/:id", getOneUser);
router.put("/update/user/:id", updateUser);
router.delete("/delete/user/:id", deleteUser);

module.exports = router;