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
      type: DataTypes.JSON,    //ARRAY(DataTypes.JSON)
      allowNull: false,
    },
    idpurchase: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    creationdate: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // userId:{
    //     type: DataTypes.INTEGER,
    //     allowNull:false
    //    },
  },{
    timestamps: false,
  });
};

    // userId:{
    //   type: DataTypes.INTEGER,
    //   allowNull:false
    // },
