var express = require("express");
var router = express.Router();
var productHelper = require("../helpers/productHelper");
var userHelper = require("../helpers/userHelper");
const verfyLogIn=(req,res,next)=>{
  if(req.session.loggedIn){
    next()
  } else{
    res.redirect('/')
  }
  }


/* GET home page. */
router.get("/", function (req, res, next) {
  productHelper.getAllProducts().then((allProducts) => {
    //console.log(allProducts);
    let user= req.session.user
    //console.log(user)
    res.render("./user/view_products", { allProducts , user:user });
  });
});

router.get("/signin", (req, res) => {
  // console.log('Sign In route hit');
  //console.log("hello");
  console.log(req.session.loggedIn);
  if(req.session.loggedIn){
    res.redirect('/')
  }else
  

  {res.render("user/signin",{"error":req.session.loggedError})
  req.seesin.loggedError=false}
   ;
});
router.get("/signup", (req, res) => {
  res.render("user/signup");
});
router.post("/signup", (req, res) => {
  userHelper.signup(req.body).then((response) => {
    //console.log(response)
  });
});
router.post("/signin", (req, res) => {
  //console.log("hello this post method")
  userHelper.dosignin(req.body).then((response)=>{
    
    if (response.status){
      req.session.loggedIn=true
      
      req.session.user= response.user
     
     res.redirect('/')
    }
    else{
      req.session.loggedError ="invalid username or password"
      res.redirect('/signin')
    }
  })
})
router.get('/signout',(req,res)=>{
  req.session.destroy()
  res.redirect('/')
})
router.get('/cart',verfyLogIn,(req,res)=>{


  res.render('user/cart')
})



module.exports = router;
