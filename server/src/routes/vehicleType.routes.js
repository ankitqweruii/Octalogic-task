module.exports = app => {
    const vehicleTypes = require("../controllers/vehicleType.controller.js");
    const router = require("express").Router();
    
    router.get("/", vehicleTypes.findAll);
    
    app.use('/api/vehicle-types', router);
  };
  