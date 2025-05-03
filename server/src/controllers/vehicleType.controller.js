const db = require("../models");
const VehicleType = db.vehicleTypes;

exports.findAll = async (req, res) => {
  try {
    const wheels = req.query.wheels;
    let condition = wheels ? { wheels: wheels } : null;
    
    const vehicleTypes = await VehicleType.findAll({ where: condition });
    res.send(vehicleTypes);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving vehicle types."
    });
  }
};