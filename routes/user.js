var express = require("express");
var router = express.Router();
var productHelper = require("../helpers/productHelper");
var userHelper = require("../helpers/userHelper");
const verifyLogIn=(req,res,next)=>{
  if(req.session.loggedIn){
    next()
  } else{
    res.redirect('/')
  }
  }


/* GET home page. */
router.get("/",async function (req, res, next) {


  let user= req.session.user
  let cartcount=null
  if(req.session.user)
  {cartcount= await userHelper.cartcount(req.session.user._id)}

  productHelper.getAllProducts().then((allProducts) => {
    //console.log(allProducts);
    let user= req.session.user
    //console.log(user)
    res.render("./user/view_products", { allProducts , user:user ,cartcount});
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
  req.session.loggedError=false}
   ;
});
router.get("/signup", (req, res) => {
  res.render("user/signup");
});
router.post("/signup", (req, res) => {
  userHelper.signup(req.body).then((response) => {
    //console.log(response)
    req.session.loggedIn = true
    req.session.user = response
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
router.get('/cart',verifyLogIn,async(req,res)=>{

 let cartproduct= await userHelper.getuserproduct(req.session.user._id)
 console.log(cartproduct)
  res.render('user/cart',{cartproduct,user:req.session.user})
})

router.get('/add-cart/:id',(req,res)=>{
  // console.log("onclick working")

  // console.log(req.params.id)

    
  userHelper.addToCart(req.params.id,req.session.user._id).then(()=>{
    //res.redirect('/')

    res.json({status:true})
    
  })
})



module.exports = router;
