const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/index');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4,
}).then(() => {
    console.log('Подсоединение к Базе данных')
}).catch(() => {
    console.log('Ошибка');
});

// app.use((req, res, next) => {
//   req.user = {
//     _id: ''
//   };
//   next();
// });

app.use(routes);

app.listen(PORT, () => {
  console.log(`Сервер запущен ${PORT}`);
});

// app.get('/', (req, res) => {
//   res.send('helo1')
// })
// app.listen (PORT, () => {
// console.log("Сервер 3000")
// })
