const express = require("express");
const app = express();
const path = require('path');

//definindo o ejs como view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', require('ejs').__express);

app.get("/", (req,res) => {
    res.render("index");
});

app.get("/perguntar", (req,res) => {
    res.render("perguntar");
});

app.post("/salvarpergunta", (req,res) => {
    res.send("aaaaa");
});

app.listen(8080, () => {
    console.log("server ta on");
});