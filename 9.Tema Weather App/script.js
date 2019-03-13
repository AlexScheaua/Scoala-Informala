let response = {};

function initialize(){
  getWeatherNow();
  getWeatherForecast();
}


function getWeatherNow(){
  let getWeatherNowButton = document.querySelector("#get-weather-now");
  getWeatherNowButton.addEventListener("click",function(){
    let valWeatherNow = document.querySelector("#cityInput");
    ajax("https://api.openweathermap.org/data/2.5/weather?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=",valWeatherNow.value)
  })
}

function getWeatherForecast(){
  let getWeatherForecastButton = document.querySelector("#get-weather-forecast");
  getWeatherForecastButton.addEventListener("click",function(){
    let valWeatherForecast = document.querySelector("#cityInput");
    ajax("https://api.openweathermap.org/data/2.5/forecast?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=",valWeatherForecast.value)
  })
}

function ajax(url,city){
  let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.responseText);
            draw();
       }
    };
    xhttp.open("GET", `${url}${city}`, true);
    xhttp.send();
}

function draw(){
  let weatherNowContainer = document.querySelector("#weather-now");
  let weatherForecastContainer = document.querySelector("#weather-forecast");

  if(!response.list){
    weatherNowContainer.innerHTML = `
      <h2>${response.name}</h2>
      <p>Description: ${response.weather[0].description}</p>
      <p>Humidity: ${response.main.humidity}</p>
      <p>Pressure: ${response.main.pressure}</p>
      <p>Current Temp: ${response.main.temp}</p>
      <p>Min Temp: ${response.main.temp_min}</p>
      <p>Max Temp: ${response.main.temp_max}</p>
    `
  } else {

  }
}

initialize();
