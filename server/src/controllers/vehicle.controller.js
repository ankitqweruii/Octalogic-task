const db = require("../models");
const Vehicle = db.vehicles;

exports.findByType = async (req, res) => {
  try {
    const typeId = req.query.typeId;
    
    if (!typeId) {
      return res.status(400).send({
        message: "Vehicle type ID is required!"
      });
    }
    
    const vehicles = await Vehicle.findAll({
      where: { vehicleTypeId: typeId }
    });
    
    res.send(vehicles);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving vehicles."
    });
  }
};
