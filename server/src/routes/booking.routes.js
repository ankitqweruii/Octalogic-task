module.exports = app => {
    const bookings = require("../controllers/booking.controller.js");
    const router = require("express").Router();
    
    router.post("/", bookings.create);
    router.get("/availability", bookings.checkAvailability);
    
    app.use('/api/bookings', router);
  };