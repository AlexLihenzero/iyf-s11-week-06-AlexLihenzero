
// ===================================
// API Key
// ===================================

const API_KEY = "4bbee2c162c2df54d33a1312dbcac613";

console.log("Weather Dashboard Loaded!");

let currentUnit = "C";
let currentWeatherData = null;

async function getWeather(city) {

    try {

        loading.classList.remove("hidden");
        errorDiv.classList.add("hidden");
        weatherCard.innerHTML = "";

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

currentWeatherData = data;

displayWeather(data);

    } catch (error) {

        errorDiv.textContent = error.message;
        errorDiv.classList.remove("hidden");

    } finally {

        loading.classList.add("hidden");

    }

}


function displayWeather(data) {

    const icon = data.weather[0].icon;

    weatherCard.innerHTML = `

        <h2>${data.name}</h2>

        <img 
            src="https://openweathermap.org/img/wn/${icon}@4x.png"
            alt="Weather icon"
        >

        <h3>${convertTemperature(data.main.temp)}</h3>

        <p>
            ${data.weather[0].description}
        </p>

        <p>
            💧 Humidity: ${data.main.humidity}%
        </p>

        <p>
            💨 Wind: ${data.wind.speed} m/s
        </p>

    `;

}

// ===================================
// DOM Elements
// ===================================

const cityInput = document.getElementById("city-input");

const searchBtn = document.getElementById("search-btn");

const loading = document.getElementById("loading");

const errorDiv = document.getElementById("error");

const weatherCard = document.getElementById("weather-card");

const unitBtn = document.getElementById("unit-btn");

// Test the elements

console.log(cityInput);
console.log(searchBtn);
console.log(loading);
console.log(errorDiv);
console.log(weatherCard);

searchBtn.addEventListener("click", function () {

    const city = cityInput.value.trim();

    if (city === "") {
        return;
    }

    getWeather(city);

});

// ===================================
// Search using Enter key
// ===================================

cityInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {

        const city = cityInput.value.trim();

        if (city === "") {
            return;
        }

        getWeather(city);

    }

});

function convertTemperature(tempC) {

    if (currentUnit === "C") {

        return `${tempC} °C`;

    } else {

        const fahrenheit = (tempC * 9/5) + 32;

        return `${fahrenheit.toFixed(1)} °F`;

    }

}

unitBtn.addEventListener("click", function() {

    if (!currentWeatherData) {
        return;
    }

    if (currentUnit === "C") {

        currentUnit = "F";

    } else {

        currentUnit = "C";

    }

    displayWeather(currentWeatherData);

});