const express = require('express')
require('dotenv').config();
const app = express()
//const bodyParser = require('body-parser'); Esta línea ya no es necesaria (antigua versión del código)
const request = require('request');


const apiKey = process.env.API_KEY

app.use(express.static('public'));//con esta línea se publican los estilos css en el navegador
app.use(express.urlencoded({ extended: true }));//sin esta línea no se interpreta el action en form
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
    // OLD CODE
    //res.send('Hello World!')
    //second old - res.render('index');
    res.render('index', {weather: null, error: null});
  })



app.post('/', function (req, res) {
    let city = req.body.city;//city es el name del input
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

  request(url, function (err, response, body) {
      if(err){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weather = JSON.parse(body)
        if(weather.main == undefined){
          res.render('index', {weather: null, error: 'Error, please try again'});
        } else {
          let weatherText = `It's ${Math.round((weather.main.temp - 32)* 5/9)} degrees in ${weather.name}!`;
          res.render('index', {weather: weatherText, error: null});
        }
      }
    });
  })

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
