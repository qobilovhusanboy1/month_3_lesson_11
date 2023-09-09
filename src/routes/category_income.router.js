const { Router } = require("express");
const { createIncomeCategory, getIncomeCategory, getOneIncomeCategory, updateIncomeCategory, deleteIncomeCategory } = require("../controllers/category_income.controller");

const router = Router();

router.post("/create/category/income", createIncomeCategory);
router.get("/get/category/income", getIncomeCategory);
router.get("/get/category/income/:id", getOneIncomeCategory);
router.put("/update/category/income/:id", updateIncomeCategory);
router.delete("/delete/category/income/:id", deleteIncomeCategory);

module.exports = router;