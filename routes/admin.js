var express = require("express");
var router = express.Router();
var productHelper = require("../helpers/productHelper");

/* GET users listing. */
router.get("/", function (req, res, next) {
  productHelper.getAllProducts().then((allProducts) => {
   // console.log(allProducts);
    res.render("admin/view-products", { allProducts, admin: true });
  });
});
router.get("/add-product", (req, res) => {
  res.render("admin/add-product", { admin: true });
});
router.post("/add-product", function (req, res) {
  console.log(req.body)
  //console.log(req.files)

  productHelper.addProducts(req.body, (id) => {
     console.log(id);
    let image = req.files.Image;
    console.log(image);
    image.mv("./public/product_images/" + id + ".jpg", (err, done) => {
      if (!err) {
        res.render( "./admin/add-Product");
      } else {
        console.log(err);
      }
    });
  });
});
router.get('/delete/:id', (req, res) => {
let prodId = req.params.id // Access the 'id' query parameter
 // console.log(prodId); // This should now log the correct ID

  productHelper.deleteproduct(prodId).then((response)=>{
  // console.log(response)
    console.log("sajith")
    res.redirect('/admin/')
  })})
  router.get('/edit/:id',async(req,res)=>{
    console.log(req.params.id)
    let product = await productHelper.getProductDetails(req.params.id)
    console.log(product)
    //console.log("hellooo")

    res.render('./admin/edit-product',{product})
      
      
    })
  router.post('/update-product/:id', (req, res) => {
   // console.log("Updating product with ID:", req.params.id)
    productHelper.updateProduct(req.params.id,req.body).then(()=>{ 
      let image = req.files.Image;
      console.log(image);
      image.mv("./public/product_images/" + req.params.id + ".jpg", (err, done) => {
        if (!err) {
          res.render( "./admin/add-Product");
        } else {
          console.log(err);
        }
      })

    })
    res.redirect('/admin/')
    
   
  });
  

module.exports = router;
