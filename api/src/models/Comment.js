const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("comment", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement:true,
    },
    airlineId:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    moreInfo: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true
    }
  },{
    timestamps: false,
  });
};