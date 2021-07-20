const express = require('express');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDb = require('./db');
dotenv.config();

//Bringin Routes Files
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/movieRoutes');
const listRoutes = require('./routes/listRoutes');

//Connecting to Database
connectDb();

//Middlewares
app.use(express.json());
if (process.env.NODE_ENV !== 'prod') {
  app.use(morgan('dev'));
}

//Mounting Routes Middlewares
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/movies', movieRoutes);
app.use('/api/v1/lists', listRoutes);

//Connecting to Server
app.listen(process.env.PORT, () =>
  console.log(`Server is running on Port: ${process.env.PORT}`)
);
