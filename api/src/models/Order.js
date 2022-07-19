const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("order", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userId:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    //stocks = tickets
    stocks: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
