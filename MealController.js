const MealModel = require('./MealModel');
//связываем с моделью меню

// GET
//async - т.к. происходит запрос в базу данных, а значит это асинхронное д-й (происходит не сию секунду)
module.exports.getMeal = async (req, res) => {
    const myMeal = await MealModel.find();
    // ищем в нашей модели все рецепты
    res.send(myMeal); // отображаем все рецепты
};

//POST
module.exports.saveMeals = async (req, res) => {
    const { title } = req.body; // записываем названия, которые меняем, title из Схемы
    MealModel.create({ title }) //создаем новое название, которое добавим в меню
    .then((data) => { // data - это то, что вернет промис - MealModel.create({ title }) "промис как только сделаешься, тогда (then) отправь ответ"
        console.log('Meal added')
        res.send(data)
    })
};

//EDIT=PUT
module.exports.editMeal = async (req, res) => {
    const { _id, title} = req.body; // указываем id - т.к. по нему осуществляется поиск, и { title } - его мы меняем в теле запроса

    MealModel.findByIdAndUpdate(_id, {title})
    .then(() => {
        console.log('Meal edited')
        res.send('Edited a meal')
    })
}

//DELETE
module.exports.deleteMeal = async (req, res) => {
    const { _id } = req.body;
    //1 - в переменную item записываю объект найденный в MealModel по id. 
    //Т.к. записываем через await, пока ответ не запишется, программа ничего не делает, только ждет результата поиска
    // const item = await MealModel.findById(_id);

    //заьем заново ищем объект и удаляем его, затем (then) отправляем ответ, указывая id удаленного объекта и его ИМЯ
    // MealModel.findByIdAndDelete(_id)
    // .then(() => res.send(`Item with id - ${_id} name - ${item.title} is deleted`));

    //2
    MealModel.findByIdAndDelete(_id)
    .then((data) => {
        console.log('Item edited')
        res.send(`Item ${data.title} with id ${data._id} is deleted`)
    });
    //в data - результат выполнения промиса. В нашем случае- объект, который мы искали по id и удаляли
}