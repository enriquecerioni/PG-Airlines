const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("comment", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
