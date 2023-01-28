const express = require("express");
const Users = require("../model/user.model");
const app = express.Router();



app.get("/",async(req,res)=>{
  let user=await Users.find()
  res.send(user);
})


app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await Users.findOne({ email });
    if (user){
      if (password === user.password) {
        res.send({
          token: `${email}_#_${password}`,
          user,
        });
      } else {
        res.status(401).send("Authentication failed,incorrect password");
      }
    } else {
      res.status(404).send(`User with email ${email}not found`);
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
});
app.post("/signup", async (req, res) => {
  const { email, password, name} = req.body;
  try {
    let user = await Users.findOne({ email });

    if (user) {
      res.status(404).send("Cannot create an user with existing email");
    }else{
     let newuser = await Users.create({
      email,
      password,
      name,
    });
    res.send({token:`${newuser.email}_#_${newuser.password}`}) 
    }
   
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = app;