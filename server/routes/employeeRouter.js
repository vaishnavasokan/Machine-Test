var express = require("express");
var multer = require('multer');
var bodyParser = require("body-parser");
var path = require('path');
var employee = require("../model/employee");
var user = require("../model/user");
const employeeModel = require("../model/employee");
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }))
var dest = path.join(path.dirname(__dirname), '/public/profileImages');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, dest)
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, file.fieldname + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({ storage: storage }).single('profileImage');

router.post("/addEmployee", function (req, res) {

    upload(req, res, function (err) {
        if (err) {
            console.log("err : ", err);
            return res.status(422).send("an Error occured")
        }
        var e1 = new employee();
        var u1 = new user()
        const reqBody = req.body
        e1.employeeFirstname = reqBody.employeeFirstname;
        e1.employeeLastname = reqBody.employeeLastname;
        e1.employeeFullname = reqBody.employeeFirstname + " " + reqBody.employeeLastname
        e1.employeeDesignation = reqBody.employeeDesignation;
        e1.employeeAddress = reqBody.employeeAddress;
        e1.profileImage = req.file.filename;
        e1.userType = "Employee"
        e1.createdDate = new Date()
        u1.userName = reqBody.employeeFirstname
        u1.userPassword = reqBody.employeeFirstname
        u1.userType = "Employee"
        console.log("new Date : ", new Date);
        e1.save((err) => {
            if (err) throw err;
            else {
                e1.save((err) => {
                    if (err) throw err;
                    else {
                        console.log("Employee Added!");
                        res.send({ message: 'Employee Added!', statusCode: 200 })
                        u1.save((err) => {
                            if (err) throw err;
                            else {
                                console.log("login Added!")
                            }
                        })
                    }
                })
            }
        })

    });
})

router.get("/listEmployees", function (req, res) {
    employee.find({}, function (err, result) {
        if (err) throw err;
        else {
            res.send(result);
        }
    })
})

router.get("/viewProfile/:userName", function (req, res) {
    employee.find({ employeeFirstname: req.params.userName }, function (err, result) {
        if (err) throw err;
        else {
            res.send(result);
        }
    })
})

router.get("/profileImage/:profileImage", (req, res) => {

    console.log("profileImage  : ", req.params.profileImage);
    var dir = "" + path.join(path.dirname(__dirname), '/public/profileImages/') + req.params.profileImage
    res.sendFile(dir)
})

router.post("/filterByDate", (req, res) => {
    employee.find({
        createdDate: {
            $gte: (req.body.fromDate ? req.body.fromDate : "2000-01-01T18:05:52.133+00:00"),
            $lte: (req.body.toDate ? req.body.toDate : new Date)
        }
    }, function (err, result) {
        if (err) throw err;
        else {
            console.log("result : ", result);
            res.send(result);
        }
    })

})

router.post("/filterByName", (req, res) => {
    if (req.body.firstName && req.body.lastName) {
        employee.find({
            employeeFirstname: req.body.firstName, employeeLastname: req.body.lastName
        }, function (err, result) {
            if (err) throw err;
            else {
                res.send(result);
            }
        })
    }
    else if (req.body.firstName) {
        employee.find({
            employeeFirstname: req.body.firstName
        }, function (err, result) {
            if (err) throw err;
            else {
                res.send(result);
            }
        })
    }
    else if (req.body.lastName) {
        employee.find({
            employeeLastname: req.body.lastName
        }, function (err, result) {
            if (err) throw err;
            else {
                res.send(result);
            }
        })
    }
})
module.exports = router;