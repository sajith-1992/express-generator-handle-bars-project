var db = require("../Configuration/connection")


module.exports = {
    addProducts: (product, callback) => {
        db.get().collection("products").insertOne(product).then((data)=>{
           console.log(data)
            callback(data.ops[0]._id)

        })}}