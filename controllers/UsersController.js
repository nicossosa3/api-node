const paramsBuilder = require('./helpers').paramsBuilder;
const User = require('../models/User');

const validParams = ["email","name","password"];

function create(req,res,next){
  // creacion de un usuario
  let params = paramsBuilder(validParams, req.body);

  User.create(params).then(user=>{
    req.user = user;
    next();
  }).catch(error=>{
    console.log(error);
    res.status(422).json(error);
  });
}


function destroyAll(req,res,next){
  User.remove({}).then(r => res.json({}));
}


module.exports = { create, destroyAll }
