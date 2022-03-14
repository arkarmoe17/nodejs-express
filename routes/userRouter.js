const express = require('express');
const router = express.Router()
const userController = require('../controllers/userController')
router.use(logger);

//router 
router
    .route('/')
    .post(userController.addUser)
    .get(userController.findAllByPagination)

router
    .route('/all')
    .get(userController.findAllUsers)

router
    .route('/:id')
    .put(userController.updateUser)
    .delete(userController.deleteUser)
    .get(userController.findById)

//Logger middleware
function logger(req, res, next) {
    console.log(req.originalUrl);
    next();
}

//module export 
module.exports = router;


