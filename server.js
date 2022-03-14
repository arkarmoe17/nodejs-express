require('dotenv').config();
const express = require('express');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3000;
const db = require('./models')


var corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200
}

//middleware 
app.set("view engine", "ejs");
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


//root endpoint
app.get('/', (req, res) => {
    // res.render("index", { text: "World." });
    res.json({ message: "Hello from api." })
})

//routers
const courseRouter = require('./routes/courseRouter');
const userRouter = require('./routes/userRouter')
app.use('/api/courses', courseRouter)
app.use('/api/users', userRouter)

//server
db.sequelize.sync().then((req) => {
    app.listen(port, () => {
        console.log(`Express server is running at port ${port}`)
    });
})

