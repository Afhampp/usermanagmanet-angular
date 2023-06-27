const bcrypt=require('bcrypt')
const userdb=require('../models/usermodels')
const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key';
const cloudinary=require('../midleware/clodinary')

const hasspassword=async (pass)=>{
    const converpass=await bcrypt.hash(pass,10)
    return converpass
}


const signup=async (req, res) =>{
    try{
        const emailchecker=await userdb.findOne({email:req.body.email})
        if(emailchecker){
            res.status(500).json({'msg':"email already existed"})
            
        }
        else{
            const pass=await hasspassword(req.body.password)
            const inserted=await userdb.insertMany([{name:req.body.name,email:req.body.email,password:pass,phone:req.body.phone}])
            res.status(200).json({inserted:inserted})
        }
        
    }
    catch(error){
        res.status(500).json({error})
    }
}


const login = async (req, res) => {
    try {
      const emailchecker = await userdb.findOne({ email: req.body.email });
      if (emailchecker) {
        const passcompare = await bcrypt.compare(req.body.password, emailchecker.password);
        if (passcompare) {
          const token = jwt.sign({ email: emailchecker }, secretKey, { expiresIn: '600000' });
          res.status(200).json({ status: 'success', token });
        } else {
          res.status(200).json({ status: 'error', msg: 'Invalid password', check: 'pass' });
        }
      } else {
        res.status(200).json({ status: 'error', msg: 'Invalid email', check: 'email' });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  };
  


  const retrivevalue = async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(' ')[1];
      const decoded = jwt.verify(token, secretKey);
      const email = decoded.email.email;
  
      const findvalue = await userdb.findOne({ email: email });
      res.status(200).json({ findvalue: findvalue });
    } catch (error) {
      res.status(500).json({ error });
    }
  };

  const proifleupdate = async (req, res) => {
    try {
      console.log("hai");
      console.log(req.file);
      
      const result = await cloudinary.uploader.upload(req.file.path);
      console.log(result.public_id);
      console.log(req.params.id)
      
      
      await userdb.findOneAndUpdate({ _id: req.params.id }, { $set: { image: result.public_id } });
      
      res.status(200).json();
    } catch (error) {
      res.status(500).json({ error });
    }
  };
  


  const editdetails=async (req, res) => {
    try {
      
      await userdb.findOneAndUpdate({ email: req.body.email },{$set:{name:req.body.name,email:req.body.email,phone:req.body.phone}});
      res.status(200).json();
    } catch (error) {
      res.status(500).json({ error });
    }
  };
  
  


module.exports={
    signup,
    login,
    retrivevalue,
    proifleupdate,
    editdetails
   
}