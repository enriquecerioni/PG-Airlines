const { DataType } = req("sequelize");

module.export = (sequelize) => {
  sequelize.define("order", {
    id: {
      type: DataType.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataType.UUIDV4,
    },
    price: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    //stocks = tickets
    stocks: {
      type: DataType.INTEGER,
      allowNull: false,
    },
  });
};
