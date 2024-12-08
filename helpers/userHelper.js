var db = require("../Configuration/connection");
var collection = require("../Configuration/collection");
const { ObjectId } = require('mongodb');
const bcrypt = require("bcrypt");
const { response } = require("express");
module.exports = {
  signup: (userdata) => {
    return new Promise(async (resolve, reject) => {
      // console.log(userdata)
      userdata.password = await bcrypt.hash(userdata.password, 10);
      db.get()
        .collection(collection.USER_COLLECTION)
        .insertOne(userdata)
        .then((data) => {
          resolve(data.ops[0]);
        });
    });
  },
  dosignin: (data) => {
    return new Promise(async (resolve, reject) => {
      let response = {}
      let user = await db
        .get()
        .collection(collection.USER_COLLECTION)
        .findOne({ email: data.email });
      if (user) {
        bcrypt.compare(data.password, user.password).then((status) => {
          if (status) {
            response.user = user;
            response.status = true;
            resolve(response)
          } else {
           resolve({status:false})
          }
        });
      } else {
        resolve({status:false})
      }
    });
  },
  addToCart:(proId,userId)=>{
    let proObj={
      item: new ObjectId(proId),
      quantity:1
    } 
    return new Promise(async(resolve, reject) => {
    let usercart = await db.get().collection(collection.CART_COLLECTION).findOne({user:new ObjectId(userId)})
    if(usercart){
      let proExist= usercart.products.findIndex(products=>products.item == proId)
      
      console.log(proExist)
      // if (proExist !==-1){
      //   db.get().collection(collection.CART_COLLECTION).updateOne({'products.item': new ObjectId
      //     (proId)
      //   }, { $inc: { 'products.$.quantity': 1 } })

      // }


      // db.get().collection(collection.CART_COLLECTION).updateOne({user: new ObjectId(userId)},{
        
      //     $push :{products: new ObjectId(proId) }
          
        
      // }).then((response)=>{
      //   resolve()
      // })
      
      }


    else{
      const userobj ={
        user: new ObjectId(userId),
        products:[proObj]
      }
      db.get().collection(collection.CART_COLLECTION).insertOne(userobj).then((response)=>{
        resolve()
      })
    }
    })
  },
   getuserproduct:(userId)=>{

return new Promise((resolve, reject) => {
  
  let cartItems=db.get().collection(collection.CART_COLLECTION).aggregate([
    { 
      $match : {user: new ObjectId(userId)}
    },
    {
      $lookup:{
        from:collection.PRODUCT_COLLECTION,
        let:{prolist:'$products'},
        pipeline:[
          {
            $match:{
              $expr:{
                $in:['$_id',"$$prolist"]
              }
            }
          }


        ],as: 'cartItems'
        
        
      }
    }
  ]).toArray()
  .then(cartItems => {
    // If no items are found in the cart for the user
    if (cartItems.length > 0) {
      resolve(cartItems[0].cartItems);
    } else {
      resolve([]); // Empty cart case
    }
  })
  .catch(error => {
    reject(error); // In case of any errors
  });
});
},
cartcount:(userID)=>{

  return new Promise(async(resolve, reject) => {
    let cart = await db.get().collection(collection.CART_COLLECTION).findOne({user: new ObjectId (userID)
    })
    let cartcount = 0
    if (cart){

      cartcount = cart.products.length

    }
    resolve(cartcount)
  })
}
}