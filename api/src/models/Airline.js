const { DataType } = req("sequelize");

module.export = (sequelize) => {
  sequelize.define("airline", {
    id: {
      type: DataType.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataType.UUIDV4,
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
      unique: true,
    },
    headquarters: {
      type: DataType.STRING,
      allowNull: true,
    },
    image: {
      type: DataType.TEXT,
      allowNull: true,
    },
  });
};
