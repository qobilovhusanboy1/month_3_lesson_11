const { Router } = require("express");
const isUser = require("../middlewares/isUser.middleware");
const { createIncome, getIncome, getIncomeTime } = require("../controllers/income.controller");

const router = Router();

router.post("/create/income", isUser, createIncome);
router.get("/get/incomes", getIncome);
router.get("/get/income/time", getIncomeTime);

module.exports = router;