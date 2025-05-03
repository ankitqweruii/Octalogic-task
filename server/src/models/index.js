const { Sequelize } = require('sequelize');
const config = require('../config/db.config');

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.vehicleTypes = require('./vehicleType.model.js')(sequelize, Sequelize);
db.vehicles = require('./vehicle.model.js')(sequelize, Sequelize);
db.bookings = require('./booking.model.js')(sequelize, Sequelize);

// Relations
db.vehicleTypes.hasMany(db.vehicles, { as: "vehicles" });
db.vehicles.belongsTo(db.vehicleTypes, {
  foreignKey: "vehicleTypeId",
  as: "vehicleType",
});

db.vehicles.hasMany(db.bookings, { as: "bookings" });
db.bookings.belongsTo(db.vehicles, {
  foreignKey: "vehicleId",
  as: "vehicle",
});

module.exports = db;