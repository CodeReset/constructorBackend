import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import router from './routes';

// DB
import sequelize from './stuff/db';
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json({ extended: true }));
app.use(morgan('dev'));

// Router
app.use('/api', router);

//Public files
app.use('/static', express.static('public'));

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Connected to db');
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
