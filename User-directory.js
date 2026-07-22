// DOM Elements
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const container = document.getElementById("users-container");
const sortAZ = document.getElementById("sort-az");

const sortZA = document.getElementById("sort-za");

const cityFilter = document.getElementById("city-filter");
// ===================================
// Load Users
// ===================================

function displayUsers(users) {

    container.innerHTML = users.map(user => `

        <div class="user-card">

            <h2>${user.name}</h2>

            <p>📧 ${user.email}</p>

            <p>🏢 ${user.company.name}</p>

            <p>📍 ${user.address.city}</p>

        </div>

    `).join("");

}

function displayUsers(users) {

    container.innerHTML = users.map(user => `

        <div class="user-card">

            <h2>${user.name}</h2>

            <p>📧 ${user.email}</p>

            <p>🏢 ${user.company.name}</p>

            <p>📍 ${user.address.city}</p>

        </div>

    `).join("");

}

function createCityOptions(users) {

    const cities = users.map(user => user.address.city);

    const uniqueCities = [...new Set(cities)];

    uniqueCities.forEach(city => {

        const option = document.createElement("option");

        option.value = city;

        option.textContent = city;

        cityFilter.appendChild(option);

    });

}

async function loadUsers() {

    try {
        showLoading();

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {

            throw new Error("Failed to fetch users");

        }

        const users = await response.json();

        allUsers = users;

        createCityOptions(users);

        loading.classList.add("hidden");

        displayUsers(users);

    

    } catch (error) {

        showError(error.message);
   

    }finally {

    loading.classList.add("hidden");

}

}

loadUsers();

function showLoading() {

    loading.classList.remove("hidden");
    container.innerHTML = "";

}

function showError(message) {

    errorDiv.textContent = `Error: ${message}`;
    errorDiv.classList.remove("hidden");

}
let allUsers = [];

const searchInput = document.getElementById("search");

searchInput.addEventListener("input", function(event) {

    const query = event.target.value.toLowerCase();

    const filteredUsers = allUsers.filter(function(user) {

        return (
            user.name.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query)
        );

    });

    displayUsers(filteredUsers);

});

sortAZ.addEventListener("click", function() {

    const sortedUsers = [...allUsers].sort(function(a, b) {

        return a.name.localeCompare(b.name);

    });

    displayUsers(sortedUsers);

});


sortZA.addEventListener("click", function() {

    const sortedUsers = [...allUsers].sort(function(a, b) {

        return b.name.localeCompare(a.name);

    });

    displayUsers(sortedUsers);

});

cityFilter.addEventListener("change", function(event) {

    const selectedCity = event.target.value;


    if (selectedCity === "all") {

        displayUsers(allUsers);

        return;

    }


    const filteredUsers = allUsers.filter(function(user) {

        return user.address.city === selectedCity;

    });


    displayUsers(filteredUsers);

});