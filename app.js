//jshint esversion:6
require('dotenv').config();
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.render("home");
});

app.post("/", function(req, res) {

  const query = req.body.cityName;
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + units + "&appid=" + process.env.API_KEY;

  https.get(url, function(response) {
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const descriptionn = weatherData.weather[0].description;
      const coor1 = weatherData.coord.lon;
      const coor2 = weatherData.coord.lat;
      const city = weatherData.name;
      const country = weatherData.sys.country;
      const wind = weatherData.wind.speed;
      const icon = weatherData.weather[0].icon;
      const image = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      if (weatherData) {
        res.render("weather", {
          temp: temp,
          descriptionn: descriptionn,
          image: image,
          coor1: coor1,
          coor2: coor2,
          city: city,
          country: country,
          wind: wind
        });
      } else {
        res.render("home");
      }
    });
  });

});
app.get("/zipcode", function(req, res) {
  res.render("zipcode");
});

app.post("/zipcode", function(req, res) {

  const query = req.body.zipcode;
  const query_1 = req.body.country_code;
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?zip=" + query + "," + query_1 + "&units=" + units + "&appid=" + process.env.API_KEY;

  https.get(url, function(response) {
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const descriptionn = weatherData.weather[0].description;
      const coor1 = weatherData.coord.lon;
      const coor2 = weatherData.coord.lat;
      const city = weatherData.name;
      const country = weatherData.sys.country;
      const wind = weatherData.wind.speed;
      const icon = weatherData.weather[0].icon;
      const image = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      if (weatherData) {
        res.render("weather", {
          temp: temp,
          descriptionn: descriptionn,
          image: image,
          coor1: coor1,
          coor2: coor2,
          city: city,
          country: country,
          wind: wind
        });
      } else {
        res.render("home");
      }
    });
  });

});
app.get("/coord", function(req, res) {
  res.render("coord");
});

app.post("/coord", function(req, res) {

  const query = req.body.lon;
  const query_1 = req.body.lat;
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + query_1 + "&appid=" + process.env.API_KEY + "&lon=" + query;

  https.get(url, function(response) {
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const descriptionn = weatherData.weather[0].description;
      const coor1 = weatherData.coord.lon;
      const coor2 = weatherData.coord.lat;
      const city = weatherData.name;
      const country = weatherData.sys.country;
      const wind = weatherData.wind.speed;
      const icon = weatherData.weather[0].icon;
      const image = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      if (weatherData) {
        res.render("weather", {
          temp: temp,
          descriptionn: descriptionn,
          image: image,
          coor1: coor1,
          coor2: coor2,
          city: city,
          country: country,
          wind: wind

        });
      } else {
        res.render("home");
      }
    });
  });

});

app.listen(process.env.PORT||3000, function() {
  console.log("server started listening on port 3000");
});
