const bcrypt = require("bcrypt");

const {knex} = require("../database");

const getUsers = async(req, res) => {
    try {
        const users = await knex("users").select("*");
    
        res.status(201).json({message: "Success", users});
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'});
    }
};

const getOneUser = async(req, res) => {
    try {
        const {id} = req.params;
    
        const User = await knex("users").select("*").where({user_id: id}).first();
    
        if(!User) return res.status(404).json({message: 'No such category exists'});
    
        res.status(200).json({message: "Success", user: User});
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'});
    }
};

const updateUser = async(req, res) => {
    try {
        const {id} = req.params;
        const {newName, newPassword, newPurce} = req.body;
    
        const User = await knex("users").select("*").where({user_id: id}).first();
        if(!User) return res.status(404).json({message: 'No such category exists'});

        const hashedPass = await bcrypt.hash(newPassword, 12) 
    
        const UpdateUser = await knex("users").where({user_id: id}).update({user_name: newName, user_password: hashedPass, user_purse: newPurce}).returning("*");
    
        res.status(200).json({message: "Success", UpdateData: UpdateUser});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
};

const deleteUser = async(req, res) => {
    try {
        const {id} = req.params;

        const data = await knex("users").select("*").where({user_id: id}).first();
        if(!data) res.status(404).json({message: 'No such category exists'});
    
        await knex("users").del().where({user_id: id});
        res.status(201).json({message: "Success"});
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'});
    }
};

module.exports = {
    getUsers,
    getOneUser,
    updateUser,
    deleteUser
};