const express = require("express");
const app = express();

app.set("/",(res,res)=>{
    res.send("hello world");
});

app.listen(3000,()=>{
    console.log("server is running")
});