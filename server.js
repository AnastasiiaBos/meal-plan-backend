const express = require('express');
const app = express();
const routes = require('./MealRoutes'); //импортируем файл с маршрутами
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config(); // для соединения с mongoDB

mongoose.set('strictQuery', false);

const PORT = 4000 || process.env.port;
//порт может быть 4000 либо тот что в файле .env
//если указать порт 6000, то будет ошибка - небезопасный порт (ERR_UNSAFE_PORT)

app.use(express.json());
app.use(cors());

mongoose
.connect(process.env.MONGODB_LINK) // MONGODB_LINK - из файла .env
.then(() => console.log(`We were connected to Mongo`))
.catch(err => console.log(err))

// app.use('/meal_planner', routes) // по url: http://localhost:4000/meal_planner - видим то, что написано в запросе get
app.use(routes) // по url: http://localhost:4000 - видим то, что написано в запросе get

app.listen(PORT, () => {
    console.log(`I'm listening PORT ${PORT}`)
})