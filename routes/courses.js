const express = require('express');
const router = express.Router()
const { viewCourses, createCourse, findById, updateCourse, deleteCourse } = require('../controllers/courses')
router.use(logger);

//view and create APIs
router
    .route('/')
    .get(viewCourses)
    .post(createCourse)

//findById,update,delete APIs
router
    .route('/:id')
    .get(findById)
    .put(updateCourse)
    .delete(deleteCourse)

//Logger middleware
function logger(req, res, next) {
    console.log(req.originalUrl);
    next();
}
//export router
module.exports = router;
