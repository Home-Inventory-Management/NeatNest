import { DataTypes, Model } from 'sequelize';

class Category extends Model {
  static initModel(sequelize) {
    Category.init({
      name: DataTypes.STRING,
    }, { sequelize, modelName: 'Category' });
  }
}

export default Category;