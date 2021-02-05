import sequelize from '../stuff/db';
import { DataTypes } from 'sequelize';

const Application = sequelize.define('application', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  name: { type: DataTypes.STRING }
});

const User = sequelize.define('user', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  appId: { type: DataTypes.UUID },
  email: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
  name: { type: DataTypes.STRING },
  options: { type: DataTypes.JSONB }
});

const Category = sequelize.define('category', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  appId: { type: DataTypes.UUID },
  name: { type: DataTypes.STRING }
});

const Product = sequelize.define('product', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  appId: { type: DataTypes.UUID },
  categoryId: { type: DataTypes.UUID },
  name: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
  price: { type: DataTypes.INTEGER },
  img: { type: DataTypes.STRING },
  options: { type: DataTypes.JSONB },
  count: { type: DataTypes.INTEGER, defaultValue: 0 }
});

const Order = sequelize.define('order', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  appId: { type: DataTypes.UUID },
  clientId: { type: DataTypes.UUID },
  status: { type: DataTypes.STRING },
  time: { type: DataTypes.STRING }
});

export { Order, Product, Category, User, Application };
export default { Order, Product, Category, User, Application };
