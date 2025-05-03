const express = require("express");
const cors = require("cors");
const seedDatabase = require("./src/seed");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./src/models");

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