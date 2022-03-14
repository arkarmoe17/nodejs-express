const express = require('express');
const router = express.Router()
const courseController= require('../controllers/courseCrontroller')
router.use(logger);

//view and create APIs
router
    .route('/')
    .get(courseController.viewCourses)
    .post(courseController.createCourse)

//findById,update,delete APIs
router
    .route('/:id')
    .get(courseController.findById)
    .put(courseController.updateCourse)
    .delete(courseController.deleteCourse)

//Logger middleware
function logger(req, res, next) {
    console.log(req.originalUrl);
    next();
}
//export router
module.exports = router;
