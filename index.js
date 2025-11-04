const express = require("express");
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta")/

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
    Pergunta.findAll({raw:true, order:[
        ['id','DESC']
    ]}).then(perguntas => {
        res.render("index",{
            perguntas: perguntas
        });
    });
});

app.get("/perguntar", (req,res) => {
    res.render("perguntar");
});

app.post("/salvarpergunta", (req,res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    });
    res.redirect("/");
});

app.get("/pergunta/:id",(req,res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta !== null){
            res.render("pergunta", {
                pergunta: pergunta
            });
        }else{
            res.redirect("/");
        }
    });
});

app.listen(8080, () => {
    console.log("server ta on");
});