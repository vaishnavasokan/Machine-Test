var mongoose = require("mongoose");
var schema = mongoose.Schema;

var employeeSchema = new schema(
    {
        employeeFirstname: { type: String, required: true },
        employeeLastname: { type: String, required: true },
        employeeFullname: { type: String, required: true },
        employeeDesignation: { type: String, required: true },
        employeeAddress: { type: String, required: true },
        profileImage: { type: String, required: true },
        userType: { type: String, required: true },
        createdDate: { type: Date, required: true }
    }
)
var employeeModel = mongoose.model("employees", employeeSchema, "employees");
module.exports = employeeModel;