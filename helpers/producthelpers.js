var db = require('../Configuration/connection')

module.exports={
    addProducts:(product,callback)=>{
        db.get().collection(product).insertOne(product).then((data)=>{
            callback(data)


        })
    }    

    }
 
