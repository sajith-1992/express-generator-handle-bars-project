var express = require('express');
var router = express.Router();
var productHelper = require('../helpers/productHelper')

/* GET users listing. */
router.get('/', function(req, res, next) {
  productHelper.getAllProducts().then((allProducts)=>{
    console.log(allProducts)
    res.render('admin/view-products',{allProducts,admin:true})
  
  })
  
});
router.get('/add-product',(req,res)=>{
  res.render("admin/add-product",{admin:true})
})
router.post('/add-product',function(req,res){
  //console.log(req.body)
  //console.log(req.files) 
  
  productHelper.addProducts(req.body,(id)=>{
    console.log(id)
    let image=req.files.Image
    console.log(image)
    image.mv('./public/product_image/'+id+'.jpg',(err,done)=>{
      if(!err){
        res.render('./admin/add-Product')
      }else{console.log(err)}
    })
  })
  
  
  
}) 

module.exports = router;

