const { DataType } = req("sequelize");

module.export = (sequelize) => {
  sequelize.define("comment", {
    id: {
      type: DataType.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataType.UUIDV4,
    },
    comment: {
      type: DataType.STRIGN,
      allowNull: false,
    },
  });
};
