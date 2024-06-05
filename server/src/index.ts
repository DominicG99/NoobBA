import express from "express";


const app = express();

app.get("/", (req, res) =>
{
    res.send("YOO");
});

app.listen(6900, () =>
{
    console.log("Listening on port 6900");
});