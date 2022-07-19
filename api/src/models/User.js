const { DataType } = req("sequelize");

module.export = (sequelize) => {
  sequelize.define("user", {
    id: {
      type: DataType.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataType.UUIDV4,
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
    },
    surname: {
      type: DataType.STRING,
      allowNull: false,
    },
    phone: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataType.TEXT,
      allowNull: true,
    },
    email: {
      type: DataType.STRING,
      allowNull: false,
    },
    permissions: {
      type: DataType.BOOLEAN,
      defaultValue: false
    },
  });
};
