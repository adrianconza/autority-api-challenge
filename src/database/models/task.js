import { DataTypes, Model } from 'sequelize';

export default function (sequelize) {
  class Task extends Model {}

  Task.init({
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT(),
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    isComplete: {
      type: DataTypes.BOOLEAN(),
      allowNull: false,
    },
  }, {
    modelName: 'task',
    tableName: 'todos',
    sequelize,
  });

  return Task;
}
