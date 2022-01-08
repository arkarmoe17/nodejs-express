const Joi = require('joi');
const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyparser = require('body-parser');

app.use(express.json()); //add middleware
// app.use(bodyparser.json());
//
// const connection = mysql.createConnection({
//     host: 'localhost',
//     username: 'user',
//     password: 'P@ssW0rd',
//     database: 'hibernate-test',
//     timezone: 'utc'
// })
//
// connection.connect((err)=>{
//     if(!err)
//         console.log("DB connection success.");
//     else
//         console.error("DB connection fail.\n Error:"+JSON.stringify(err,undefined,2));
// })
//
// app.listen(3000,()=>console.log("Express server is running at port no:3000"));

app.get("menus",(res,req)=>{
    connection.query('SELECT * FROM menu',(err,rows,fields)=>{
        if(!err)
            console.log(rows);
        else
            console.log(err);
    })
})

//courses
const courses=[
    {id:1,name:'course1'},
    {id:2,name:'course2'},
    {id:3,name:'course3'}
]

app.get('/',(req,res)=>{
    res.send('Hello world from Express.')
})

app.get('/api/courses',(req,res)=>{
    res.send(courses);
});

app.get('/api/courses/:id',(req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course)
        return res.status(404).send('Id is not found.');
    res.send(course);
});

//create course
app.post('/api/courses',(req,res)=>{
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
});

//update course
app.put('/api/courses/:id',(req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course)
        return res.status(404).send('Id is not found.');
    //validate course
    const {error} = validateCourse(req.body);
    if(error)
        return res.status(400).send(error.details[0].message);
    //Update course
    course.name = req.body.name;
    res.send(course);
});

//delete course
app.delete('/api/courses/:id',(req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course)
        return res.status(404).send('Id is not found.');
    const index = courses.indexOf(course);
    courses.splice(index,1);
    res.send(course);
});

//validate course
function validateCourse(course){
    const schema =Joi.object({
        name : Joi.string().min(3).required()
    })
    return schema.validate(course);
}


// server port with glob
const port = process.env.PORT || 3000;
app.listen(port,()=>console.log(`Express server is running at port ${port}`));

