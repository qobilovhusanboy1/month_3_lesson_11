const {knex} = require("../database");

const createIncome = async(req, res) => {
    try {
        const id = req.idUser;
        const {category_id, money, description} = req.body;
    
        const user = await knex("users").select("*").where({user_id: id}).first();
    
        const newPurse = user.user_purse + money;
        await knex("users").where({user_id: id}).update({user_name: user.user_name, user_password: user.user_password, user_purse: newPurse})
    
        const newData = await knex("income").insert({income_user_id: id, income_category_id: category_id, income_how_much_money: money, income_description: description}).returning("*");
    
        res.status(201).json({message: "Success", newData: newData});
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'});
    }
};

const getIncome = async(req, res) => {
    try {
        const incomes = await knex("income").select("*");

        if(!incomes?.length) return res.status(201).json({message: "You don't have any income yet"});
    
        res.status(201).json({message: "Success", incomes: incomes});
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'});
    }
};

const getIncomeTime = async(req, res) => {
    try {
        const {time1, time2} = req.body;

        let query = knex('income');

        query = query.where("income_created_att", ">", time1);

        query = query.andWhere("income_created_att", "<", time2);

        const data = await query;

        if(!data?.length) return res.status(201).json({message: "Earn between these dates"});
        
        res.status(200).json({message: "Success", data});
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    createIncome,
    getIncome,
    getIncomeTime
};