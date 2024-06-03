import express from "express";


const app = express();

app.get("/", (req, res)=>{
    res.send("YOO");
});

app.listen(6000, ()=>
{
    console.log("Listening on port 6000");
});