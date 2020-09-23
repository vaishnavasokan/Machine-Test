const express = require("express")
const mongoose = require("mongoose");
const employeeRouter = require("./routes/employeeRouter");
const user = require("./model/user");
const app = express();
var url = "mongodb+srv://vysh:pass123*@cluster0.isw7n.mongodb.net/employeedb_test?retryWrites=true&w=majority";

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen("8080", () => {
    console.log('Server started listening!')
})

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
    if (err)
        throw err;
    else
        console.log("DB Connected!");
})

app.use('/employee', employeeRouter);

app.post("/login", function (req, res) {
    console.log("req.body   : ", req.body);
    user.findOne({ userName: req.body.userName, userPassword: req.body.userPassword }, function (err, result) {
        if (err) {
            throw err;
        }
        else {
            console.log("docData   : ", result);
            res.send({ userData: result, status: 200 });
        }
    })

})
