var express = require("express");
var router = express.Router();
var productHelper = require("../helpers/productHelper");
var userHelper = require("../helpers/userHelper");

/* GET home page. */
router.get("/", function (req, res, next) {
  productHelper.getAllProducts().then((allProducts) => {
    console.log(allProducts);
    res.render("./user/view_products", { allProducts, admin: false });
  });
});

router.get("/signin", (req, res) => {
  // console.log('Sign In route hit');
  res.render("user/signin");
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
  userHelper.dosignin(req.body).then((response)=>{
    if (response.status){
     res.redirect('/')
    }
    else{
      res.redirect('/signin')
    }
  })
});

module.exports = router;
