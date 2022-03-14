const Joi = require("joi");

//courses
const courses=[
    {id:1,name:'course1'},
    {id:2,name:'course2'},
    {id:3,name:'course3'}
]

//view
function viewCourses(req,res){
    res.send(courses);
}

//create
function createCourse(req,res){
    //validate course
    const {error} = validateCourse(req.body);
    if(error)
        return res.status(400).send(error.details[0].message);
    //add new course
    const course = {
        id: courses.length+1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
}

//findById
function findById(req,res){
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course)
        return res.status(404).send('Id is not found.');
    res.send(course);
}

//update
function updateCourse(req,res){
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course)
        return res.status(404).send('Id is not found.');
    //validate course
    const {error} = validateCourse(req.body);
    if(error)
        return res.status(400).send(error.details[0].message);
    //Update course
    const {name} = req.body;
    console.log('in controller',req.body)
    course.name = name;
    res.send(course);
}

//delete
function deleteCourse(req,res){
    const course = courses.find(c => c.id === parseInt(req.params.id));
        if(!course)
            return res.status(404).send('Id is not found.');
        const index = courses.indexOf(course);
        courses.splice(index,1);
        res.send(course);
}


//validate course
function validateCourse(course){
    const schema =Joi.object({
        name : Joi.string().min(3).required()
    })
    return schema.validate(course);
}

//export modules
module.exports={viewCourses,createCourse,findById,updateCourse,deleteCourse}
