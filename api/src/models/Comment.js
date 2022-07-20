const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("comment", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement:true,
    },
    flightId:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },{
    timestamps: false,
  });
};
