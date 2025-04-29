import { DataTypes, Model } from 'sequelize';

class Inventory extends Model {
  static initModel(sequelize) {
    Inventory.init({
      name: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      expireDate: DataTypes.DATE,
    }, { sequelize, modelName: 'Inventory' });
  }
}

export default Inventory;