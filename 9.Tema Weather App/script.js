let response = {};
//initializarea butoanelor
function initialize(){
  getWeatherNow();
  getWeatherForecast();
}

//functia butonului weather now
function getWeatherNow(){
  let getWeatherNowButton = document.querySelector("#get-weather-now");
  getWeatherNowButton.addEventListener("click",function(){
    let valWeatherNow = document.querySelector("#cityInput");
    if(valWeatherNow.value !== ""){
      ajax("https://api.openweathermap.org/data/2.5/weather?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=",valWeatherNow.value)
    } else {
      alert("Please enter a city name")
    }
  })
}
//functia butonului weather forecast
function getWeatherForecast(){
  let getWeatherForecastButton = document.querySelector("#get-weather-forecast");
  let weatherForecastContainer = document.querySelector("#weather-forecast");
  getWeatherForecastButton.addEventListener("click",function(){
    let valWeatherForecast = document.querySelector("#cityInput");
    if(valWeatherForecast.value !== ""){
      ajax("https://api.openweathermap.org/data/2.5/forecast?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=",valWeatherForecast.value)
      weatherForecastContainer.style.display = "block";
    } else {
      alert("Please enter a city name")
    }
  })
}
//functie ajax care primeste 2 parametrii
function ajax(url,city){
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4){
      if(this.status == 200) {
        response = JSON.parse(this.responseText);
        draw();
      } else if (this.status == 404) {
        alert("Please verify the name of the city")
      } else {
        alert("Request failed")
      }
    }
  };
  xhttp.open("GET", `${url}${city}`, true);
  xhttp.send();
}

function draw(){
  let weatherNowContainer = document.querySelector("#weather-now");
  let weatherForecastContainer = document.querySelector("#weather-forecast");

  if(!response.list){ //daca response nu are lista, desenez weatherNow altfel desenez weatherForecast
    weatherNowContainer.innerHTML = `
      <div class="col-xs-12 col-md-6">
        <h2>${response.name}, ${response.sys.country}</h2>
        <img src="http://openweathermap.org/img/w/${response.weather[0].icon}.png">
        <p>Description: ${response.weather[0].description}</p>
        <p>Humidity: ${response.main.humidity} %</p>
        <p>Pressure: ${response.main.pressure} hPa</p>
        <p>Current Temp: ${response.main.temp} &#8451</p>
        <p>Min Temp: ${response.main.temp_min} &#8451</p>
        <p>Max Temp: ${response.main.temp_max} &#8451</p>
      </div>
      <div class="col-xs-12 col-md-6">
        <iframe width="100%" height="100%" frameborder="0" style="border:0"
          src="https://maps.google.com/maps?hl=en&amp;q=${response.name}+()&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed"
        </iframe>
      </div>
    `

  } else {
//adaug numele orasului + tara
    let forecastCity = document.querySelector("#forecast-city");
    forecastCity.innerHTML = `${response.city.name}, ${response.city.country}`;
//resetez continutul casutelor de zi
    var dayElements = document.querySelectorAll(".day");
    dayElements.forEach(function(day){
      day.innerHTML = "";
    });

    let dayIndex = 0;
    let dateTime = response.list[0].dt_txt.split(" ");
    let day = dateTime[0];
//adaug prima data in prima casuta a zilei
    dayElements[dayIndex].innerHTML += `
    <h3 class="forecast-date">${dateTime[0]}</h3>
    `
//creez spatii goale in div day pentru a alinia casutele de forecast orar
    for(let i = 0; i < parseInt(dateTime[1])/3; i++){
      dayElements[dayIndex].innerHTML = dayElements[dayIndex].innerHTML + `
        <div class="hour-content d-flex flex-column align-center"></div>
      `
    }

//desenez continutul forecastului
    for(let i = 0; i < response.list.length; i++){
      let dateTime = response.list[i].dt_txt.split(" ");
      let date = dateTime[0];
      let time = dateTime[1];
//daca se schimba data, schimb containerul pentru zi si adaug data + incrementez indexul pentru zi
      if(day !== date){
        dayIndex++
        day = date;
        dayElements[dayIndex].innerHTML += `
        <h3 class="forecast-date">${date}</h3>
        `
      }

      dayElements[dayIndex].innerHTML += `
        <div class="hour-content d-flex flex-column align-center">
          <img src="http://openweathermap.org/img/w/${response.list[i].weather[0].icon}.png">
          <p>Time: ${time}</p>
          <p>Current Temp: ${response.list[i].main.temp} &#8451</p>
          <p>Description: ${response.list[i].weather[0].description}</p>
        </div>
      `

    }
  }
}

initialize();
