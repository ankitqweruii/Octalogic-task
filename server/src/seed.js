const db = require("./models");

const seedDatabase = async () => {
  try {
    // Sync database
    await db.sequelize.sync({ force: true });
    console.log("Database synchronized!");
    
    // Create vehicle types
    const vehicleTypes = await db.vehicleTypes.bulkCreate([
      { name: "Hatchback", wheels: 4 },
      { name: "SUV", wheels: 4 },
      { name: "Sedan", wheels: 4 },
      { name: "Cruiser", wheels: 2 }
    ]);
    
    console.log("Vehicle types seeded!");
    
    // Create vehicles
    const vehicles = await db.vehicles.bulkCreate([
      { model: "Swift", brand: "Maruti", year: 2022, vehicleTypeId: 1 },
      { model: "i20", brand: "Hyundai", year: 2021, vehicleTypeId: 1 },
      { model: "Polo", brand: "Volkswagen", year: 2020, vehicleTypeId: 1 },
      { model: "Creta", brand: "Hyundai", year: 2022, vehicleTypeId: 2 },
      { model: "Brezza", brand: "Maruti", year: 2021, vehicleTypeId: 2 },
      { model: "Scorpio", brand: "Mahindra", year: 2023, vehicleTypeId: 2 },
      { model: "City", brand: "Honda", year: 2022, vehicleTypeId: 3 },
      { model: "Verna", brand: "Hyundai", year: 2021, vehicleTypeId: 3 },
      { model: "Ciaz", brand: "Maruti", year: 2020, vehicleTypeId: 3 },
      { model: "Classic 350", brand: "Royal Enfield", year: 2022, vehicleTypeId: 4 },
      { model: "Meteor", brand: "Royal Enfield", year: 2021, vehicleTypeId: 4 },
      { model: "Pulsar", brand: "Bajaj", year: 2020, vehicleTypeId: 4 }
    ]);
    
    console.log("Vehicles seeded!");
    
    console.log("Database seeding completed successfully!");
  } catch (err) {
    console.error("Error seeding database:", err);
  }
};

// Export the seed function
module.exports = seedDatabase;