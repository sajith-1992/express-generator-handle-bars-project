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
    return new Promise(async(resolve, reject) => {
    let usercart = await db.get().collection(collection.CART_COLLECTION).findOne({user:new ObjectId(userId)})
    if(usercart){
      db.get().collection(collection.CART_COLLECTION).updateOne({user: new ObjectId(userId)},{
        
          $push :{products: new ObjectId(proId) }
          
        
      }).then((response)=>{
        resolve()
      })
      
      }


    else{
      const userobj ={
        user: new ObjectId(userId),
        products:[new ObjectId(proId)]
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
  resolve(cartItems)
  
})

  }


  }