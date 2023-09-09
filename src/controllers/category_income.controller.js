const {knex} = require("../database");

const createIncomeCategory = async(req, res) => {
    try {
        const {CategoryIncomeName} = req.body;

        const data = await knex("category_income").select("*").where({category_income_name: CategoryIncomeName}).first();    
        
        if(data) return res.status(401).json({message: 'This category already exists.'});
    
        const newData = await knex("category_income").insert({category_income_name: CategoryIncomeName}).returning("*");
    
        res.status(200).json({message: "Success", NewData: newData});
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'});
    }
};

const getIncomeCategory = async(req, res) => {
    try {
        const CategoryIncome = await knex("category_income").select("*");

        res.status(200).json({message: "Success", categoryes: CategoryIncome});
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'});
    }
};

const getOneIncomeCategory = async(req, res) => {
    try {
        const {id} = req.params;
    
        const CategoryIncome = await knex("category_income").select("*").where({category_income_id: id}).first();
    
        if(!CategoryIncome) return res.status(404).json({message: 'No such category exists'});
    
        res.status(200).json({message: "Success", category: CategoryIncome});
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'});
    }
};

const updateIncomeCategory = async(req, res) => {
    try {
        const {id} = req.params;
        const {newName} = req.body;
    
        const CategoryIncome = await knex("category_income").select("*").where({category_income_id: id}).first();
        if(!CategoryIncome) return res.status(404).json({message: 'No such category exists'});
    
        const CategoryIncomeUpdate = await knex("category_income").where({category_income_id: id}).update({category_income_name: newName}).returning("*");
    
        res.status(200).json({message: "Success", UpdateData: CategoryIncomeUpdate});
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'});
    }
};

const deleteIncomeCategory = async(req, res) => {
    try {
        const {id} = req.params;

        const data = await knex("category_income").select("*").where({category_income_id: id}).first();
        if(!data) res.status(404).json({message: 'No such category exists'});
    
        await knex("category_income").del().where({category_income_id: id});
        res.status(201).json({message: "Success"});
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'});
    }
};

module.exports ={
    createIncomeCategory,
    getIncomeCategory,
    getOneIncomeCategory,
    updateIncomeCategory,
    deleteIncomeCategory
};