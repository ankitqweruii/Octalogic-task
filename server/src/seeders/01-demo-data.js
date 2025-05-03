'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Seed vehicle types
    const vehicleTypes = await queryInterface.bulkInsert('vehicleTypes', [
      {
        name: 'Hatchback',
        wheels: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'SUV',
        wheels: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sedan',
        wheels: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Cruiser',
        wheels: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: true });

    // Get the IDs of the seeded vehicle types
    const vehicleTypeIds = {
      hatchback: 1,
      suv: 2,
      sedan: 3,
      cruiser: 4
    };

    // Seed vehicles
    await queryInterface.bulkInsert('vehicles', [
      // Hatchbacks
      {
        model: 'Swift',
        brand: 'Maruti',
        year: 2022,
        vehicleTypeId: vehicleTypeIds.hatchback,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        model: 'i20',
        brand: 'Hyundai',
        year: 2021,
        vehicleTypeId: vehicleTypeIds.hatchback,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        model: 'Polo',
        brand: 'Volkswagen',
        year: 2020,
        vehicleTypeId: vehicleTypeIds.hatchback,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // SUVs
      {
        model: 'Creta',
        brand: 'Hyundai',
        year: 2022,
        vehicleTypeId: vehicleTypeIds.suv,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        model: 'Brezza',
        brand: 'Maruti',
        year: 2021,
        vehicleTypeId: vehicleTypeIds.suv,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        model: 'Scorpio',
        brand: 'Mahindra',
        year: 2023,
        vehicleTypeId: vehicleTypeIds.suv,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Sedans
      {
        model: 'City',
        brand: 'Honda',
        year: 2022,
        vehicleTypeId: vehicleTypeIds.sedan,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        model: 'Verna',
        brand: 'Hyundai',
        year: 2021,
        vehicleTypeId: vehicleTypeIds.sedan,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        model: 'Ciaz',
        brand: 'Maruti',
        year: 2020,
        vehicleTypeId: vehicleTypeIds.sedan,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Cruisers
      {
        model: 'Classic 350',
        brand: 'Royal Enfield',
        year: 2022,
        vehicleTypeId: vehicleTypeIds.cruiser,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        model: 'Meteor',
        brand: 'Royal Enfield',
        year: 2021,
        vehicleTypeId: vehicleTypeIds.cruiser,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        model: 'Pulsar',
        brand: 'Bajaj',
        year: 2020,
        vehicleTypeId: vehicleTypeIds.cruiser,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove seeded data in reverse order
    await queryInterface.bulkDelete('vehicles', null, {});
    await queryInterface.bulkDelete('vehicleTypes', null, {});
  }
};
