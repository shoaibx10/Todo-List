const express = require("express");
const bodyParser = require("body-parser");

var tasks = [];
var work = [];

const app = express();

app.set("view engine","ejs");


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.get("/",function(req,res){
let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
};
const d = new Date();
let date = d.toLocaleDateString("en-US",options);
res.render("list",{kindofday:date,tasks:tasks});
});

app.get("/work",function(req,res){
   res.render("list",{kindofday:"Work List",tasks:work})
});

app.post("/",(req,res)=>{
    task = req.body.task;
    console.log(task);
    if(req.body.add=== "Work"){
    work.push(task);
    res.redirect("/work");
    }
    else{
        tasks.push(task);
        console.log(tasks);
        res.redirect("/");
    }
    
});


app.listen(process.env.PORT || 8000,()=>{
console.log("server started on port 8000");
});