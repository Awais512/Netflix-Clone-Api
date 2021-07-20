const mongoose = require('mongoose');

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log('Mongodb Connected');
  } catch (error) {
    console.log('Something went wrong', error);
  }
};

module.exports = connectDb;
