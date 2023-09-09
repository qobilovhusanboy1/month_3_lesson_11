const { Router } = require("express");
const { createCategoryExpense, getCategoryExpense, getOneCategoryExpense, updateCategoryExpense, deleteCategoryExpense } = require("../controllers/category_expense.controller");

const router = Router();

router.post("/create/category/expense", createCategoryExpense);
router.get("/get/category/expense", getCategoryExpense);
router.get("/get/category/expense/:id", getOneCategoryExpense);
router.put("/update/category/expense/:id", updateCategoryExpense);
router.delete("/delete/category/expense/:id", deleteCategoryExpense);

module.exports = router;