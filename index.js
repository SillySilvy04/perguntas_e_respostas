const express = require("express");
const app = express();

//definindo o ejs como view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get("/", (req,res) => {
    res.render("index");
});

app.listen(8080, () => {
    console.log("server ta on");
});