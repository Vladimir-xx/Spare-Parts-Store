//create modull express====================
let express = require('express');

//clone modull from in express
let app = express();

//Static folder public
app.use(express.static('public'));

//pug_getting_started
app.set('view engine', 'pug');

//Подключаем Модуль MySql ==================
let mysql = require('mysql');
//настраиваем модуль mysql
let con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'shop'
})


app.listen(3000, function () {
    console.log('node express work on 3000');
});

app.get('/', function (req, res) {

    con.query(
        'SELECT * FROM goods',
        function (error,result) {
            if(error) throw error;
            let goods = {};
            for(let i = 0; i<result.length; i++){
                goods[result[i]['id']] = result[i];
            }

            res.render('main',{
                foo: 'hello',
                goods: JSON.parse(JSON.stringify(goods))
            });
        }
    );
});
