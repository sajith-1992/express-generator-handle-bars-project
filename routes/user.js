var express = require('express');
var router = express.Router();
var productHelper = require('../helpers/productHelper');
var userHelper= require('../helpers/userHelper');

/* GET home page. */
router.get('/', function(req, res, next) {
  productHelper.getAllProducts().then((allProducts)=>{
    console.log(allProducts)
    res.render('./user/view_products',{allProducts,admin:false})
  
  })})

  router.get('/user/signin', (req, res) => {
    console.log('Sign In route hit');
    res.render('user/signin');
  });
  router.get('/user/signup',(req,res)=>{
    res.render('user/signup')
  }) 
  router.post('/signup',(req,res)=>{
    
  
    userHelper.signup(req.body).then((response)=>{
   // console.log(response)
   
    })

    })

    
  

module.exports = router;
