module.exports = app => {
    const vehicles = require("../controllers/vehicle.controller.js");
    const router = require("express").Router();
    
    router.get("/", vehicles.findByType);
    
    app.use('/api/vehicles', router);
  };