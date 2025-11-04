const express = require("express");
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
const connection = require("./database/database");

//banco de dados
connection.authenticate().then(() => {
    console.log("bd on");
}).catch((msgErro) => {
    console.log(msgErro);
});

//definindo o ejs como view engine
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));

//configurando body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", (req,res) => {
    res.render("index");
});

app.get("/perguntar", (req,res) => {
    res.render("perguntar");
});

app.post("/salvarpergunta", (req,res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    res.send(`${titulo} ${descricao}`);
});

app.listen(8080, () => {
    console.log("server ta on");
});