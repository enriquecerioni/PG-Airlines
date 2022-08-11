const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "sale",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      idFlight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      airlineId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      amount: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
