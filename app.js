const http = require('http')

const server = http.createServer((req,res)=>{
    console.log("request:",req);
    if(req.url==='/'){
        res.write("Hello world.");
        res.end();
    }
})
server.listen(4000);
console.log("server is running with port 4000.");