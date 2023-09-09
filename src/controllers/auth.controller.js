const bcrypt = require("bcrypt");

const {knex} = require("../database");
const jwt = require("../utils/jwt");

const authRegister = async(req, res) => {
    try {
        const {username, password, purse} = req.body;

        const findUser = await knex('users').select('*').where({user_name: username}).first();
        if(findUser)
            return res.status(403).json({message: "Username already exists"});

        const hashedPass = await bcrypt.hash(password, 12);

        const [user] = await knex("users").insert({user_name: username, user_password: hashedPass, user_purse: purse}).returning("user_id");

        const token = jwt.sign({id: user.user_id});

        res.status(201).json({message: 'Success', token});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'})
    }
};

const authLogin = async(req, res) => {
    try {
        const {username, password} = req.body;

        const findUser = await knex("users").select("*").where({user_name: username}).first();
        if(!findUser)
            return res.status(403).json({message: 'Invalid username or password'});
    
        const pswd = await bcrypt.compare(password, findUser.user_password);
    
        if(!pswd)
            return res.status(403).json({message: 'Invalid username or password'});
    
        const token = jwt.sign({id: findUser.user_id});
    
        res.status(201).json({message: 'Success', token});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'})
    }
};

module.exports = {
    authRegister,
    authLogin
};