var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let product=[{name:"iphone 15 prox",
  category:"phone case",
  price:"10 CAD",
  image:"https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRfztewwfpbqL71Pt0l3w8CaeqpOOQakp6H1gU-deaIMPogS2xrs3vyDfBx_Vc9EHK9EB0ZHtTugvl6QWHjkiyPIy5egMlTEEXgmkFWUWGcSVMkYAYCAgkd6A&usqp=CAE"

},{name:"i phone 13 pro",
category:"phone case",
price:"20 CAD"},{
name:"i phone 12",
category:"phone case",
price:"40 cad",
image:"https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRfztewwfpbqL71Pt0l3w8CaeqpOOQakp6H1gU-deaIMPogS2xrs3vyDfBx_Vc9EHK9EB0ZHtTugvl6QWHjkiyPIy5egMlTEEXgmkFWUWGcSVMkYAYCAgkd6A&usqp=CAE"
},{
name:"i phone 11 pro",
category:"phone case",
price:"30 cad",
image:"https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRfztewwfpbqL71Pt0l3w8CaeqpOOQakp6H1gU-deaIMPogS2xrs3vyDfBx_Vc9EHK9EB0ZHtTugvl6QWHjkiyPIy5egMlTEEXgmkFWUWGcSVMkYAYCAgkd6A&usqp=CAE"
}, {
name:"i phone 10 pro",
category:"phone case",
price:"40 cad",
image:"https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRfztewwfpbqL71Pt0l3w8CaeqpOOQakp6H1gU-deaIMPogS2xrs3vyDfBx_Vc9EHK9EB0ZHtTugvl6QWHjkiyPIy5egMlTEEXgmkFWUWGcSVMkYAYCAgkd6A&usqp=CAE"
}]
  res.render('admin/view-products',{product,admin:true});
});
router.get('/add-product',(req,res)=>{
  res.render("admin/add-product",{admin:true})
})
router.post('/add-product',function(req,res){
  console.log(req.body)
  console.log(req.files) 
  res.redirect('add-product')
  
  
  
})

module.exports = router;

