// Display current date and time

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let currentDate = now.getDate();
let currentDay = days[now.getDay()];
let currentMonth = months[now.getMonth()];
let currentHour = now.getHours();
let currentMinute = now.getMinutes();

if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
if (currentMinute < 10) {
  currentMinute = `0${currentMinute}`;
}

let today = document.querySelector("#current-date");
today.innerHTML = `${currentDay}, ${currentMonth} ${currentDate}, ${currentHour}:${currentMinute}`;

// Forecast

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML += `<div class="col" id="forecast">
          <div class="card">
            <div class="card-body"><strong>${formatDay(
              forecastDay.dt
            )}</strong></div>
            <img 
              class="week-img"
              <img src="img/${forecastDay.weather[0].icon}.png"
            />
            <div class="week-temp"> 
              <span id="max">${Math.round(forecastDay.temp.max)}°</span> /
              <span id="min">${Math.round(forecastDay.temp.min)}°</span>
            </div>
          </div>
        </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// Display weather in current city + log coordinates

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "1abad5c198be1cab987a15b09610f472";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  let city = document.querySelector("h1");
  let weather = document.querySelector("#weather");
  let currentTemp = document.querySelector("#temp-display");
  let minTemp = document.querySelector("#min");
  let maxTemp = document.querySelector("#max");
  let clouds = document.querySelector("#clouds");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let icon = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;
  celsiusTemperatureMin = response.data.main.temp_min;
  celsiusTemperatureMax = response.data.main.temp_max;
  windSpeed = response.data.wind.speed;

  let unit = document.querySelector("#temp-unit");
  unit.innerHTML = "°C";
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  city.innerHTML = response.data.name;
  weather.innerHTML = response.data.weather[0].main;
  currentTemp.innerHTML = Math.round(response.data.main.temp);
  minTemp.innerHTML = Math.round(response.data.main.temp_min);
  maxTemp.innerHTML = Math.round(response.data.main.temp_max);
  clouds.innerHTML = `Cloudiness: ${response.data.clouds.all}%`;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  icon.setAttribute("src", `img/${response.data.weather[0].icon}.png`);
  icon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "1abad5c198be1cab987a15b09610f472";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#search");
form.addEventListener("submit", handleSubmit);

// Weather in current location

function showPosition(position) {
  let units = "metric";
  let apiKey = "1abad5c198be1cab987a15b09610f472";
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#location-button");
button.addEventListener("click", getCurrentPosition);

// Celsius vs Farenheit

function convertToF(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let unit = document.querySelector("#temp-unit");
  unit.innerHTML = "°F";

  let temperatureElement = document.querySelector("#temp-display");
  let farenheit = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(farenheit);

  let minElement = document.querySelector("#min");
  let maxElement = document.querySelector("#max");
  let farenheitMin = (celsiusTemperatureMin * 9) / 5 + 32;
  let farenheitMax = (celsiusTemperatureMax * 9) / 5 + 32;
  minElement.innerHTML = Math.round(farenheitMin);
  maxElement.innerHTML = Math.round(farenheitMax);

  let windElement = document.querySelector("#wind");
  let wind = windSpeed / 1.609344;
  windElement.innerHTML = `Wind: ${Math.round(wind)} mph`;
}

function convertToC(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  let unit = document.querySelector("#temp-unit");
  unit.innerHTML = "°C";

  let temperatureElement = document.querySelector("#temp-display");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

  let minElement = document.querySelector("#min");
  let maxElement = document.querySelector("#max");
  minElement.innerHTML = Math.round(celsiusTemperatureMin);
  maxElement.innerHTML = Math.round(celsiusTemperatureMax);

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Wind: ${Math.round(windSpeed)} km/h`;
}

let celsiusTemperature = null;
let farenheitTemperature = null;
let windSpeed = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToF);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToC);

search("Amsterdam");
