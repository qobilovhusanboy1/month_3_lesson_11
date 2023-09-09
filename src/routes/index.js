const authRouter = require("./auth.route");
const userRouter = require("./user.routes");
const categoryExpenseRouter = require("./category_expense.router");
const categoryIncomeRouter = require("./category_income.router");
const IncomeRouter = require("./income.route");
const ExpenseRouter = require("./expense.router");

module.exports = [
    authRouter,
    userRouter,
    categoryExpenseRouter,
    categoryIncomeRouter,
    IncomeRouter,
    ExpenseRouter
];