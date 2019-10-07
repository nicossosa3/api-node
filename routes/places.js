const express = require('express');

let router = express.Router();

const placesController = require('../controllers/placesController');


  router.route('/')
    .get(placesController.index)
    .post(placesController.multerMiddleware(),
          placesController.create,
          placesController.saveImage);

  router.route('/:id')
    .get(placesController.find,placesController.show)
    .put(placesController.find,placesController.update)
    .delete(placesController.find,placesController.destroy);

  module.exports = router;
