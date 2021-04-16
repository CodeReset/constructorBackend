import sequelize from '../stuff/db';
import { DataTypes } from 'sequelize';

const Application = sequelize.define('application', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  template: { type: DataTypes.STRING },
  theme: { type: DataTypes.STRING },
  name: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
  structure: { type: DataTypes.JSONB }
});

const Template = sequelize.define('template', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  name: { type: DataTypes.STRING },
  images: { type: DataTypes.ARRAY(DataTypes.STRING) },
  components: { type: DataTypes.ARRAY(DataTypes.JSONB) },
  pages: { type: DataTypes.ARRAY(DataTypes.JSONB) },
  // themes: { type: DataTypes.ARRAY },
  type: { type: DataTypes.STRING }
});

const Theme = sequelize.define('theme', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  name: { type: DataTypes.STRING },
  images: { type: DataTypes.ARRAY(DataTypes.STRING) },
  description: { type: DataTypes.STRING },
  temlate: { type: DataTypes.STRING },
  colors: { type: DataTypes.ARRAY(DataTypes.STRING) }
});

const User = sequelize.define('user', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  appId: { type: DataTypes.UUID },
  email: { type: DataTypes.STRING },
  type: { type: DataTypes.STRING },
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
  name: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING },
  img: { type: DataTypes.STRING }
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
  options: { type: DataTypes.JSONB }
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
  products: { type: DataTypes.ARRAY(DataTypes.JSONB) },
  totalPrice: { type: DataTypes.INTEGER }
});

export { Order, Product, Category, User, Application, Template, Theme };
export default { Order, Product, Category, User, Application, Template, Theme };
