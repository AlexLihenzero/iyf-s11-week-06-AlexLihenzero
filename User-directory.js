// DOM Elements
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const container = document.getElementById("users-container");

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