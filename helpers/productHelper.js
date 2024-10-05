var db = require("../Configuration/connection");
var collection = require("../Configuration/collection");
const { ObjectId } = require('mongodb');
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
    }
  }

  




