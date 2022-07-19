const { DataType } = req("sequelize");

module.export = (sequelize) => {
  sequelize.define("flight", {
    id: {
      type: DataType.INTEGER,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataType.UUIDV4,
    },
    origin: {
      type: DataType.STRING,
      allowNull: false,
    },
    destination: {
      type: DataType.STRING,
      allowNull: false,
    },
    duration_estimated: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    tickets: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    departure_date: {
      type: DataType.DATEONLY,
      allowNull: false,
      defaultValue: DataType.NOW
    },
    arrival_date: {
      type: DataType.DATEONLY,
      allowNull: false,
    },
  });
};
