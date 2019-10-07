const mongoose = require('mongoose');

const dbName = 'places_api';

module.exports = {
  connect: ()=>mongoose.connect('mongodb://localhost/'+dbName, { useNewUrlParser: true,
                                                                 useUnifiedTopology: true,
                                                                 useCreateIndex: true}),
  dbName,
  connection: ()=>{
    if(mongoose.connection)
      return mongoose.connection;
    return this.connect();
  }
}
