const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    uid:{
      type:DataTypes.STRING,
      allowNull:true,
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    permissions: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  },{
    timestamps: false,
  });
};

    // surname: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
