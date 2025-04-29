import { DataTypes, Model } from 'sequelize';

class User extends Model {
  static initModel(sequelize) {
    User.init({
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      mobile: DataTypes.STRING,
      password: DataTypes.STRING,
    }, { sequelize, modelName: 'User' });
  }
}

export default User;