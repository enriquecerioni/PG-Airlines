const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("cart", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false
      },
    total_price: {
      type: DataTypes.STRING,
      defaultValue: "0",
    }
  },{
    timestamps: false,
  });
};


