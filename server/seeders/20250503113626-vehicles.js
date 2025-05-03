'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('vehicles', [
      { model: 'Swift', brand: 'Maruti', year: 2022, vehicleTypeId: 1, createdAt: new Date(), updatedAt: new Date() },
      { model: 'i20', brand: 'Hyundai', year: 2021, vehicleTypeId: 1, createdAt: new Date(), updatedAt: new Date() },
      { model: 'Polo', brand: 'Volkswagen', year: 2020, vehicleTypeId: 1, createdAt: new Date(), updatedAt: new Date() },
      { model: 'Creta', brand: 'Hyundai', year: 2022, vehicleTypeId: 2, createdAt: new Date(), updatedAt: new Date() },
      { model: 'Brezza', brand: 'Maruti', year: 2021, vehicleTypeId: 2, createdAt: new Date(), updatedAt: new Date() },
      { model: 'Scorpio', brand: 'Mahindra', year: 2023, vehicleTypeId: 2, createdAt: new Date(), updatedAt: new Date() },
      { model: 'City', brand: 'Honda', year: 2022, vehicleTypeId: 3, createdAt: new Date(), updatedAt: new Date() },
      { model: 'Verna', brand: 'Hyundai', year: 2021, vehicleTypeId: 3, createdAt: new Date(), updatedAt: new Date() },
      { model: 'Ciaz', brand: 'Maruti', year: 2020, vehicleTypeId: 3, createdAt: new Date(), updatedAt: new Date() },
      { model: 'Classic 350', brand: 'Royal Enfield', year: 2022, vehicleTypeId: 4, createdAt: new Date(), updatedAt: new Date() },
      { model: 'Meteor', brand: 'Royal Enfield', year: 2021, vehicleTypeId: 4, createdAt: new Date(), updatedAt: new Date() },
      { model: 'Pulsar', brand: 'Bajaj', year: 2020, vehicleTypeId: 4, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('vehicles', null, {});
  }
};
