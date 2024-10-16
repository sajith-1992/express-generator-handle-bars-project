var db = require("../Configuration/connection");
var collection = require("../Configuration/collection");
const { ObjectId } = require('mongodb');
const { response } = require("express");
module.exports = {
  addProducts: (product, callback) => {
    db.get()
      .collection("products")
      .insertOne(product)
      .then((data) => {
        console.log(data);
        callback(data.ops[0]._id);
      });
  },
  getAllProducts: () => {
    return new Promise(async (resolve, reject) => {
      var allProducts = await db
        .get()
        .collection(collection.PRODUCT_COLLECTION)
        .find()
        .toArray();
      resolve(allProducts);
    });
  },
  deleteproduct:(prodId)=>{
    console.log(prodId)
    
  
    return new Promise((resolve, reject) => {
      
      db.get().collection(collection.PRODUCT_COLLECTION ).deleteOne({_id: new ObjectId(prodId)}).then((response)=>{
        console.log(response)



        
        resolve(response)
      })


   } )
    },
    getProductDetails:(proId)=>{
      return new Promise(async(resolve, reject) => {
        console.log(proId)
        await db.get().collection(collection.PRODUCT_COLLECTION).findOne({_id: new ObjectId (proId)}).then((product)=>{
          resolve(product)
        })
        
      })
    },
    updateProduct:(proId,productDetails)=>{
      console.log("sajith")
      return new Promise(async(resolve, reject) => {
        await db.get().collection(collection.PRODUCT_COLLECTION).updateOne({_id:new ObjectId(proId)},{ $set:
          {
            name: productDetails.name,
            category:productDetails. category,
            price: productDetails.price
            
          }
       }).then((response)=>{
        resolve()
       })
      })
    }

  }
  

  




