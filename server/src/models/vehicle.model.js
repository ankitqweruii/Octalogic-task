module.exports = (sequelize, Sequelize) => {
    const Vehicle = sequelize.define("vehicle", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      model: {
        type: Sequelize.STRING,
        allowNull: false
      },
      brand: {
        type: Sequelize.STRING,
        allowNull: false
      },
      year: {
        type: Sequelize.INTEGER
      },
      vehicleTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'vehicleTypes',
          key: 'id'
        }
      }
    });
    
    return Vehicle;
  };
  