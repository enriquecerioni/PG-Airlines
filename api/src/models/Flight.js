const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("flight", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    airlineId:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    origin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration_estimated: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tickets: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    departure_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    arrival_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  });
};
