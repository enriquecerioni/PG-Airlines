const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("order", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
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
