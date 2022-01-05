var express=require("express");
var passport = require('passport');
var users=require('./routes/userroutes')
var managers=require('./routes/managerroutes')
var wfmmanagers=require('./routes/wfm_managersroutes')
var app=express();
const cors=require("cors")
app.use(passport.initialize());
app.use(cors())

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use("/users",users)

app.use("/managers",managers)
app.use("/wfmmanagers",wfmmanagers)

app.listen("8000",function(){
    console.log("Server running on port 8000")
})