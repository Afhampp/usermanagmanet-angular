const express = require('express');
const router = express.Router();
const jwt=require('../midleware/jsontoken')
const usercontroller=require('../controllers/usercontroller');
const upload=require('../midleware/upload')

/* GET users listing. */
router.post('/signup',usercontroller.signup)
router.post('/login',usercontroller.login)
router.get('/retrive', jwt,usercontroller.retrivevalue);
router.put('/profile/:id',upload.single('file'),usercontroller.proifleupdate)
router.put('/edituserdetails',usercontroller.editdetails)

module.exports = router;
