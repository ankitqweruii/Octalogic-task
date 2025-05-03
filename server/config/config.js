module.exports = {
  development: {
    username: "root",
    password: "1234",
    database: "vehicle_rental",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: null,
    database: "vehicle_rental_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: "root",
    password: null,
    database: "vehicle_rental_production",
    host: "127.0.0.1",
    dialect: "mysql"
  }
};