
// ===================================
// API Key
// ===================================

const API_KEY = "4bbee2c162c2df54d33a1312dbcac613";

console.log("Weather Dashboard Loaded!");

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

        console.log(data);

        displayWeather(data);

    } catch (error) {

        errorDiv.textContent = error.message;
        errorDiv.classList.remove("hidden");

    } finally {

        loading.classList.add("hidden");

    }

}


function displayWeather(data) {

    weatherCard.innerHTML = `

        <h2>${data.name}</h2>

        <p>🌡 Temperature: ${data.main.temp} °C</p>

        <p>☁ Weather: ${data.weather[0].description}</p>

        <p>💧 Humidity: ${data.main.humidity}%</p>

        <p>💨 Wind: ${data.wind.speed} m/s</p>

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