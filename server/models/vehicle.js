'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vehicle extends Model {
   
    static associate(models) {
      // define association here
    }
  }
  Vehicle.init({
    model: DataTypes.STRING,
    brand: DataTypes.STRING,
    year:DataTypes.INTEGER,
    vehicleTypeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Vehicle',
  });
  return Vehicle;
};