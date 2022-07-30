const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("order", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    //stocks = tickets
    stocks: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: false,
    },
  },{
    timestamps: false,
  });
};

    // userId:{
    //   type: DataTypes.INTEGER,
    //   allowNull:false
    // },
