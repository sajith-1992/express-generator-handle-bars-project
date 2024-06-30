const mongoClient = require("mongodb").MongoClient
const state={
    db:null
}

module.exports.connect=  function(done){
    const url='mongodb://0.0.0.0:27017'
  const dbname= "shoppingcart"
  mongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        state.db = client.db(dbname);
        console.log('Connected to database successfully');
    }
});
    

}

module.exports.get = function(){
     return state.db
    
    
}
