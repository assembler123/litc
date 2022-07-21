const express = require("express");
var bodyParser = require('body-parser')
const cors = require("cors");
const {exec} = require("child_process")
const app = express();
app.use(cors())
app.use(bodyParser.json())

app.post("/runcpp",(req,res)=>{
    console.log(req.body);
    req.body.test.split("\n")
    require("fs").writeFileSync("file.in",req.body.test,(e)=>{
    });
    require("fs").writeFileSync("progrtest.cpp",req.body.code,(e)=>{
    });
    exec("g++ -o main ./progrtest.cpp && ./main < file.in",(err,stdout,stderr)=>{
        if(err){
            res.send({
                success:false,
                out:stderr
            })
        }else{
            if(stdout)
                res.send({success:true,out:stdout});
            else
                res.send({success:false,out:stderr});
        }
    })

})

app.listen(3002,()=>{
    console.log("Listening On PORT 3002")
})