var express=require("express")
var route = express.Router();
var model = require('../orm/model')
const jwt=require("jsonwebtoken");
const sequelize = require("../orm/connection");

route.post("/WfmmanagerList", async function (request, response) {
    
    try {
       let wfm_manager = request.body.manager;
       
 
       const manager_requests = await model.softlock.findAll({
         group: ['employee_id'],
          attributes: ['employee_id','reqdate','requestmessage','lockid'],
          required: true,
         
          include: [{
            model: model.employee,
            attributes: [ 'manager', 'wfm_manager','name'],
            required: true,
            where: { wfm_manager: wfm_manager, lockstatus: 'request_waiting' }
         }]
   
       })
       
      
       let wfm_managerList = [];
       manager_requests.map(employee => {
          let wfm_manager = {
             EmployeeId: employee.dataValues.employee_id,
             Manager: employee.dataValues.employee.manager,
             Name:employee.dataValues.employee.name,
             reqDate: employee.dataValues.reqdate,
             wfm_manager: employee.dataValues.employee.wfm_manager,
             requestmessage:employee.dataValues.requestmessage,
             lockid:employee.dataValues.lockid
          }
          wfm_managerList.push(wfm_manager)
       });
      
 
       if (wfm_managerList.length > 0) {
          response.json(wfm_managerList)
       }
       else
          response.status(401).send("Failed")
    }
 
    catch (e) {
      response.status(500)
    }
 
 })
 route.post("/softlockstatus",async function(request,response){
    try{  
       let softlock = await model.softlock.findOne({ where: { employee_id: request.body.employee_id,lockid: request.body.lockid} }) 
       softlock.managerstatus = request.body.managerstatus;      
       await softlock.save();    
       let employee = await model.employee.findOne({ where: { employee_id: request.body.employee_id } })   
       employee.lockstatus =  request.body.status==='approve'? 'locked':'not_requested'; 
       await employee.save();    
       response.send("Requested status updated successfully!")    
    }
    catch (e) {  
       console.log(e)  
       response.status(500)  
    }      
 });
 
 module.exports = route