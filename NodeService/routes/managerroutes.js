var express=require("express")
var route = express.Router();
var model = require('../orm/model')
const jwt=require("jsonwebtoken");
const sequelize = require("../orm/connection");

route.post("/manager", async function (request, response) {
   
    const manager=request.body.manager 
    console.log(manager);
    try {
       const employeeDetails = await model.skillmap.findAll({
          group: ['employee_id'],
          attributes: ['employee_id'],
          include: [{
             model: model.employee,
             attributes: ['employee_id','name', 'experience', 'manager'],
             required: true,
             where: { manager: manager, lockstatus: 'not_requested' }
          },
          {
             model: model.skill,
             attributes: [[sequelize.fn('GROUP_CONCAT', sequelize.col('skill.name')), 'skills']],
             require: true
          }]
       })
      console.log(employeeDetails)
       var EmployeeList = [];
       employeeDetails.map(employee => {
          let employ = {
             EmployeeId: employee.dataValues.employee_id,
             Name: employee.dataValues.employee.name,
             Skills: employee.dataValues.skill.dataValues.skills,
             Experience: employee.dataValues.employee.experience,
             Manager: employee.dataValues.employee.manager
          }
          EmployeeList.push(employ)
       });
       if (EmployeeList.length > 0) {
        response.json(EmployeeList)
       }
       else
         response.status(401).send("Failed")
    }
    catch (e) {
       console.log(e)
       response.status(500)
    }
 })
 
 route.post("/sendLockRequest", async function (request, response) {
    
    let employee_id = request.body.employee_id
    let manager = request.body.manager
    let requestmessage = 'Most Wanted!';
    try {
       let employee = await model.employee.findOne({ where: { employee_id: employee_id } })
       
       employee.lockstatus = 'request_waiting';
       await employee.save();
       await model.softlock.create({ employee_id: employee_id, manager: manager, requestmessage: requestmessage })
       await employee.reload();
       response.status(200)
       response.send("Lock Requested successfully!")
    } catch (e) {
       console.log(e)
       response.status(500)
    }
  })

  module.exports = route