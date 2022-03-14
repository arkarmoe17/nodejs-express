const Joi = require("joi");
const db = require('../models/index')
const url = require('url')
const paginationService = require('../services/PaginationService')

//entity
const User = db.users;

//find all by pagination
const findAllByPagination = async (req, res) => {
    let queryObj = url.parse(req.url, true).query;
    const { page, size } = queryObj;
    const { limit, offset } = paginationService.getPagination(page, size);
    console.log("offset: ", offset)
    console.log("limit: ", limit)
    User.findAndCountAll({
        where: {},
        limit,
        offset
    })
        .then(data => {
            const response = paginationService.getPagingData(data, page, limit);
            res.status(200).send(response);
        }).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving user pagination."
            });
        });
}

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

//update user 
const updateUser = async (req, res) => {
    //validate user
    const { error } = validateUser(req.body);
    if (error)
        return res.status(400).send(error.details[0].message)
    let id = req.params.id;

    const userOpt = await User.findOne({ where: { id: id } });
    if (userOpt == null)
        return res.status(404).send({ message: 'Id is not found.' })

    let info = {
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "age": req.body.age
    }
    await User.update(info, { where: { id: id } })
    res.status(200).send({ message: 'Successful.' });
}

// delete user
const deleteUser = async (req, res) => {
    let id = req.params.id;
    const userOpt = await User.findOne({ where: { id: id } });
    if (userOpt == null)
        return res.status(404).send({ message: 'Id is not found.' })
    await User.destroy({ where: { id: id } })
    res.status(200).send({ message: 'Successful.' });
}

//find by Id 
const findById = async (req, res) => {
    let id = req.params.id;
    const userOpt = await User.findOne({
        where: { id: id },
        attributes: ['firstName', 'lastName', 'age']
    });
    if (userOpt == null)
        return res.status(404).send({ message: 'Id is not found.' })
    res.status(200).send({ message: 'Successful.', data: userOpt });
}


//validate user
function validateUser(user) {
    const schema = Joi.object({
        firstName: Joi.string().min(3).required(),
        lastName: Joi.string().min(3).required(),
        age: Joi.number().integer().min(0).required()
    })
    return schema.validate(user);
}


module.exports = { findAllUsers, addUser, updateUser, deleteUser, findById, findAllByPagination }