const db = require("../models");
const Booking = db.bookings;
const Vehicle = db.vehicles;
const { Op } = require("sequelize");

// Check availability
exports.checkAvailability = async (req, res) => {
  try {
    const { vehicleId, startDate, endDate } = req.query;
    
    if (!vehicleId || !startDate || !endDate) {
      return res.status(400).send({
        message: "Vehicle ID, start date, and end date are required!"
      });
    }
    
    // Check for overlapping bookings
    const overlappingBookings = await Booking.findAll({
      where: {
        vehicleId,
        [Op.or]: [
          {
            startDate: {
              [Op.between]: [new Date(startDate), new Date(endDate)]
            }
          },
          {
            endDate: {
              [Op.between]: [new Date(startDate), new Date(endDate)]
            }
          },
          {
            [Op.and]: [
              { startDate: { [Op.lte]: new Date(startDate) } },
              { endDate: { [Op.gte]: new Date(endDate) } }
            ]
          }
        ]
      }
    });
    
    res.send({
      available: overlappingBookings.length === 0
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error checking availability."
    });
  }
};

// Create a new booking
exports.create = async (req, res) => {
  try {
    // Validate request
    if (!req.body.firstName || !req.body.lastName || !req.body.vehicleId || 
        !req.body.startDate || !req.body.endDate) {
      return res.status(400).send({
        message: "All fields are required!"
      });
    }
    
    const { firstName, lastName, vehicleId, startDate, endDate } = req.body;
    
    // Check for overlapping bookings
    const overlappingBookings = await Booking.findAll({
      where: {
        vehicleId,
        [Op.or]: [
          {
            startDate: {
              [Op.between]: [new Date(startDate), new Date(endDate)]
            }
          },
          {
            endDate: {
              [Op.between]: [new Date(startDate), new Date(endDate)]
            }
          },
          {
            [Op.and]: [
              { startDate: { [Op.lte]: new Date(startDate) } },
              { endDate: { [Op.gte]: new Date(endDate) } }
            ]
          }
        ]
      }
    });
    
    if (overlappingBookings.length > 0) {
      return res.status(400).send({
        message: "This vehicle is already booked for the selected dates."
      });
    }
    
    // Create a booking
    const booking = {
      firstName,
      lastName,
      vehicleId,
      startDate: new Date(startDate),
      endDate: new Date(endDate)
    };
    
    const data = await Booking.create(booking);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the booking."
    });
  }
};