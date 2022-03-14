const Joi = require("joi");
const db = require('../models/index')
const User = db.users;

//find all users 
const findAllUsers = async (req, res) => {
    const users = await User.findAll();
    res.status(200).send(users)
}

//create user 
const addUser = async (req, res) => {
    //validate user
    const { error } = validateUser(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    let info = {
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "age": req.body.age
    }
    const user = await User.create(info)
    res.status(200).send(user);
}


//validate course
function validateUser(user) {
    const schema = Joi.object({
        firstName: Joi.string().min(3).required(),
        lastName: Joi.string().min(3).required(),
        age: Joi.number().integer().min(0).required()
    })
    return schema.validate(user);
}

module.exports = { addUser, findAllUsers }