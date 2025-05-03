const express = require("express");
const cors = require("cors");
const seedDatabase = require("./src/seed");

const app = express();

// Use CORS
app.use(cors());

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Database connection
const db = require("./src/models");

// In development, you might want to reset the database:
if (process.env.NODE_ENV === 'development') {
  db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
    seedDatabase();
  });
} else {
  db.sequelize.sync().then(() => {
    console.log("Synced db.");
  });
}

// Simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the vehicle rental application." });
});

// Routes
require("./src/routes/vehicleType.routes")(app);
require("./src/routes/vehicle.routes")(app);
require("./src/routes/booking.routes")(app);

// Set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});