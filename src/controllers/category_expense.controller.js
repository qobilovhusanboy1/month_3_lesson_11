const {knex} = require("../database")

const createCategoryExpense = async(req, res) => {
    try {
        const {CategoryExpenseName} = req.body;

        const data = await knex("category_expense").select("*").where({category_expense_name: CategoryExpenseName}).first();    
        
        if(data) return res.status(401).json({message: 'This category already exists.'});
    
        const newData = await knex("category_expense").insert({category_expense_name: CategoryExpenseName}).returning("*");
    
        res.status(200).json({message: "Success", NewData: newData});
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'});
    }
};

const getCategoryExpense = async(req, res) => {
    try {
        const CategoryExpense = await knex("category_expense").select("*");

        res.status(200).json({message: "Success", categoryes: CategoryExpense});
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'});
    }
};

const getOneCategoryExpense = async(req, res) => {
    try {
        const {id} = req.params;
    
        const CategoryExpense = await knex("category_expense").select("*").where({category_exprense_id: id}).first();
    
        if(!CategoryExpense) return res.status(404).json({message: 'No such category exists'});
    
        res.status(200).json({message: "Success", category: CategoryExpense});
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'});
    }
};

const updateCategoryExpense = async(req, res) => {
    try {
        const {id} = req.params;
        const {newName} = req.body;
    
        const CategoryExpense = await knex("category_expense").select("*").where({category_exprense_id: id}).first();
        if(!CategoryExpense) return res.status(404).json({message: 'No such category exists'});
    
        const CategoryExpenseUpdate = await knex("category_expense").where({category_exprense_id: id}).update({category_expense_name: newName}).returning("*");
    
        res.status(200).json({message: "Success", UpdateData: CategoryExpenseUpdate});
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'});
    }
};

const deleteCategoryExpense = async(req, res) => {
    try {
        const {id} = req.params;

        const data = await knex("category_expense").select("*").where({category_exprense_id: id}).first();
        if(!data) res.status(404).json({message: 'No such category exists'});
    
        await knex("category_expense").del().where({category_exprense_id: id});
        res.status(201).json({message: "Success"});
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'});
    }
};


module.exports = {
    createCategoryExpense,
    getCategoryExpense,
    getOneCategoryExpense,
    updateCategoryExpense,
    deleteCategoryExpense
};