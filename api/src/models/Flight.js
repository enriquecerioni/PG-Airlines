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
    durationEstimated: {
      type: DataTypes.STRING,
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
    departureHour: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    arrivalHour: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    departureDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    arrivalDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    logo:{
      type:DataTypes.TEXT,
      allowNull:false
    }
  },{
    timestamps: false,
  });
};
