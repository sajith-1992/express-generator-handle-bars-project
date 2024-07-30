var db = require("../Configuration/connection")
var collection = require ("../Configuration/collection")
const bcrypt = require('bcrypt')
module.exports={
    signup:(userdata)=>{
        return new Promise(async(resolve, reject) => {
           // console.log(userdata)
            userdata.password=await bcrypt.hash(userdata.password, 10)
            db.get().collection(collection.USER_COLLECTION).insertOne(userdata).then((data)=>{
                resolve(data.ops[0])
               
            })
            
        })
    
    
    }
    
}