const express = require("express");
const app = express();
const port = 3000;
app.use(express.urlencoded());

let databaseOfUsername = ["zach", "denise", "allison"]

const MESSAGES = { SUCCESS: "You exsist in the database!", FAILURE: "You do not exist in the database!" };

app.set('view engine', 'ejs')

app.get('/', (req, res) => { res.render("pages/index"); })
app.get("/myForm", (req, res) => { res.render("pages/myForm"); })

app.post("/myForm", (req, res) => {
    let formData = req.body;
    console.log(formData);
    let userName = formData.username;
    if (databaseOfUsername.includes(userName)) {
        res.render("pages/result", { result: MESSAGES.SUCCESS });

    } else {
        res.render("pages/result", {result: MESSAGES.FAILURE})
    }
})


app.listen(port)

