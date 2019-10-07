const Place = require('../models/Places');
const upload = require('../config/upload');
const uploader = require('../models/Uploader');
const helpers = require('./helpers');

const validParams = ["title","description","address","acceptCreditCard","openHour","closeHour"];

  function find(req,res,next){
    Place.findOne({slug:req.params.id})
    .then(place =>{
      req.place = place;
      console.log("buscando")
      next();
    }).catch(err=>{
      next(err);

    });
  }


  function index(req, res){
  //Todos los lugares
    Place.paginate({},{page: req.query.page || 1, limit: 8, sort: {'_id':-1} })
    .then(docs=>{
      res.json(docs);
    }).catch(err=>{
      res.json(err);
  });

  }

  function show(req,res){
  //Buesqueda individual
    res.json(req.place);
  }

  function create(req, res, next){
  //Crear nuevos lugares
  const params = helpers.paramsBuilder(validParams, req.body);
  console.log(req.user);
  Place.create(params).then(doc=>{
    req.place = doc;
    next();
  }).catch(err=>{
    console.log(err);
    next(err);
  });
}

  function update(req, res){
  //Actualizar un lugar
  const params = helpers.paramsBuilder(validParams, req.body);
  req.place = Object.assign(req.place, params);

  req.place.save()
  .then(doc=>{
    res.json(doc);
  }).catch(err=>{
    console.log(err);
    res.json(err);
  });
}

  function destroy(req, res){
  //Eliminar un lugar
    req.place.remove().then(docs=>{
      res.json({});
    }).catch(err=>{
      res.json(err);
    });
  }

  function multerMiddleware(){
    return upload.fields([
      {name:'avatar', maxCount: 1},
      {name:'cover', maxCount: 1}
    ])
  }

  function saveImage(req,res){
    if(req.place){
      const files = ['avatar', 'cover'];
      const promises = [];
      files.forEach(imageType=>{
        if(req.files && req.files[imageType]){
          const path = req.files[imageType][0].path;
          promises.push(req.place.updateImage(path, imageType));
        }
      });

      Promise.all(promises).then(result=>{
        console.log(result);
        res.json(req.place);
      }).catch(err=>{
        console.log(err);
        res.json(err);
      })
    } else{
      res.status(422).json({
        error: req.error || 'Could not save place'
      });
    }
  }

  module.exports = {index, show, create, update, destroy, find, multerMiddleware, saveImage};
