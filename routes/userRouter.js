const express = require('express');
const router = express.Router()
const userController= require('../controllers/userController')
router.use(logger);

//router 
router
.route('/')
.post(userController.addUser)

router
.route('/all')
.get(userController.findAllUsers)

//Logger middleware
function logger(req, res, next) {
    console.log(req.originalUrl);
    next();
}

//module export 
module.exports = router;


