var express = require("express")
var route = express.Router();
var model = require('../orm/model')
const jwt = require("jsonwebtoken");
const sequelize = require("../orm/connection");

route.post("/signin", async function (request, response) {
   console.log(request);
   const { username, password } = request.body
   try {
      const user = await model.user.findOne({ where: { username: username } })
      let result = user.dataValues
console.log(result);
      if (result.password === password) {
         response.json(
            {
               username: username,
               usertype: result.role,
               token: jwt.sign({ username: username, password: password }, "node-app-22")
            }
         )
      }
      else
         response.status(401).send("Username or Password incorrect")
   }
   catch (e) {
      console.log(e)
      response.status(500)
   }

})



module.exports = route
















