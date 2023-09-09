const { Router } = require("express");
const isUser = require("../middlewares/isUser.middleware");
const { createExpense, getExpense, getExpenseTime } = require("../controllers/expense.controller");

const router = Router();

router.post("/create/expense", isUser, createExpense);
router.get("/get/expense", getExpense);
router.get("/get/expense/time", getExpenseTime);

module.exports = router;