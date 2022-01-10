const express = require('express');
const app = express();
// const port = process.env.PORT || 3000;
const port = 3000;
app.set("view engine","ejs");
app.use(express.json());

app.get('/',(req,res)=>{
    res.render("index",{text: "World."});
})

//routers
const courseRouter = require('./routes/courses');
app.use('/api/courses',courseRouter)

//server
app.listen(port,()=>console.log(`Express server is running at port ${port}`));

