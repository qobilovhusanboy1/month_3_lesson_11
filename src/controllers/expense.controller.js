const {knex} = require("../database");

const createExpense = async(req, res) => {
    try {
        const id = req.idUser;
        const {category_id, money, description} = req.body;
    
        const user = await knex("users").select("*").where({user_id: id}).first();

        const newPurse = user.user_purse - money;
        await knex("users").where({user_id: id}).update({user_name: user.user_name, user_password: user.user_password, user_purse: newPurse})
    
        const newData = await knex("expense").insert({expense_user_id: id, expense_category_id: category_id, expense_how_much_money: money, expense_description: description}).returning("*");
    
        res.status(201).json({message: "Success", newData: newData});
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'});
    }
};

const getExpense = async(req, res) => {
    try {
        const expense = await knex("expense").select("*");

        if(!expense?.length) return res.status(201).json({message: "Costs are not wave"});
    
        res.status(201).json({message: "Success", expense: expense});
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'});
    }
};

const getExpenseTime = async(req, res) => {
    try {
        const {time1, time2} = req.body;

        let query = knex('expense');

        query = query.where("expense_created_att", ">", time1);

        query = query.andWhere("expense_created_att", "<", time2);

        const data = await query;

        if(!data?.length) return res.status(201).json({message: "Earn between these dates"});
        
        res.status(200).json({message: "Success", data});
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    createExpense,
    getExpense,
    getExpenseTime
};