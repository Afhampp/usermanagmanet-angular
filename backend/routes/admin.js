var express = require('express');
var router = express.Router();
const admincontroller=require('../controllers/admincontroller')
const jwt =require('../midleware/jsontoken')

/* GET home page. */
router.get('/getvalue',jwt,admincontroller.getvalue);
router.put('/update/:id',admincontroller.updatevalue)
router.delete('/deletedata/:id',admincontroller.deltedata)
router.post('/login',admincontroller.login)
module.exports = router;
