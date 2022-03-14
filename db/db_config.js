// const mysql = require('mysql2');
// require('dotenv').config()


// //create connection to the database 
// const pool = mysql.createPool({
//     host: process.env.db_host,
//     user: process.env.db_user,
//     database: process.env.db_database,
//     password: process.env.db_password,
//     //additional 
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// })

// //working fine
// const query = 'select * from user;';
// pool.query(query,
//     function (err, res, fields) {
//         if (err) {
//             console.error("Error: ", err)
//         }
//         console.log('results: ', res);
//     });