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

// Display weather in current city

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

  city.innerHTML = response.data.name;
  weather.innerHTML = response.data.weather[0].main;
  currentTemp.innerHTML = Math.round(response.data.main.temp);
  minTemp.innerHTML = Math.round(response.data.main.temp_min);
  maxTemp.innerHTML = Math.round(response.data.main.temp_max);
  clouds.innerHTML = `Cloudiness: ${response.data.clouds.all}%`;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
}

function searchCity(city) {
  let units = "metric";
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let form = document.querySelector("#search");
form.addEventListener("submit", search);

// Weather in current location

function showPosition(position) {
  let units = "metric";
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#location-button");
button.addEventListener("click", getCurrentPosition);

// Celsius vs Farenheit
// Not yet adjusted for current/entered location!

function convertToF(event) {
  event.preventDefault();
  let unit = document.querySelector("#temp-unit");
  let temperatureElement = document.querySelector("#temp-display");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
  unit.innerHTML = "°F";

  let minElement = document.querySelector("#min");
  let maxElement = document.querySelector("#max");
  let min = minElement.innerHTML;
  let max = maxElement.innerHTML;
  min = Number(min);
  max = Number(max);
  minElement.innerHTML = Math.round((min * 9) / 5 + 32);
  maxElement.innerHTML = Math.round((max * 9) / 5 + 32);
}

function convertToC(event) {
  event.preventDefault();
  let unit = document.querySelector("#temp-unit");
  let temperatureElement = document.querySelector("#temp-display");
  temperatureElement.innerHTML = 7;
  unit.innerHTML = "°C";

  let min = document.querySelector("#min");
  let max = document.querySelector("#max");
  min.innerHTML = 3;
  max.innerHTML = 10;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToF);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToC);
