const bcrypt=require('bcrypt')
const userdb=require('../models/usermodels')
const admindb=require('../models/adminmodel')
const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key';


const hasspassword=async (pass)=>{
    const converpass=await bcrypt.hash(pass,10)
    return converpass
}

const getvalue = async (req, res) => {
    try {
  
      const findvalue = await userdb.find();
      res.status(200).json({ findvalue: findvalue });
    } catch (error) {
      res.status(500).json({ error });
    }
  };
  const updatevalue = async (req, res) => {
    try {
        const param = req.params.id;
        await userdb.findByIdAndUpdate({_id:param},{$set:{name:req.body.name,email:req.body.email,phone:req.body.phone}})
      res.status(200).json();
    } catch (error) {
      res.status(500).json({ error });
    }
  };
  const deltedata = async (req, res) => {
    try {
    
      await userdb.findByIdAndDelete({_id:req.params.id})
      res.status(200).json();
    } catch (error) {
      res.status(500).json({ error });
    }
  };

  const login = async (req, res) => {
    try {
      const emailchecker = await admindb.findOne({ name: req.body.name });
      if (emailchecker) {
        const passcompare = await bcrypt.compare(req.body.password, emailchecker.password);
        if (passcompare) {
          const token = jwt.sign({ value: emailchecker }, secretKey, { expiresIn: '6000000' });
          res.status(200).json({ status: 'success', token });
        } else {
          res.status(200).json({ status: 'error', msg: 'Invalid password', check: 'pass' });
        }
      } else {
        res.status(200).json({ status: 'error', msg: 'Invalid admin', check: 'email' });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  };



  module.exports={
    getvalue,
    updatevalue,
    deltedata,
    login
    
   
}