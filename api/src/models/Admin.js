const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("admin", {
        superAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false 
        },
        userId:{
            type:DataTypes.INTEGER,
            allowNull:false
          },
    });
  };