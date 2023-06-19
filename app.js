const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/index');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://0.0.0.0/mestodb', { useNewUrlParser: true, })

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '6490567f51848659b68100b4',
  };

  next();
});

app.use(routes);

app.listen(PORT, () => {
  console.log(`Сервер запущен ${PORT}`);
});
