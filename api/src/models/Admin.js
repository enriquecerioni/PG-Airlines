const { DataType } = req("sequelize");

module.export = (sequelize) => {
    sequelize.define("admin", {
        superAdmin: {
            type: DataType.BOOLEAN,
            defaultValue: false 
        }
    });
  };