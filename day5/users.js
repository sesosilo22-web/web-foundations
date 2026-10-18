
const API_URL = "https://jsonplaceholder.typicode.com/users";

const button = document.querySelector("#load-users");
const statusText = document.querySelector("#status");
const  list  = document.querySelector("#users-list");
const filterInput = document.querySelector("#filter-input");

let users = [];

async function fetchUsers() {
    button.disabled = true;
    statusText.textContent = "Loading users...";
    list.textContent ="";

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`Status ${response.status}`);
        }

        users = await response.json();

        displayUsers(users);
        statusText.textContent = `Loaded ${users.length} users.`;

    } catch (error) {
        statusText.textContent = "Error loading users. Please try again.";
        console.error(error);

    } finally {
        button.disabled = false;
    }
}

function displayUsers(usersToDisplay) {
         list.textContent = "";

    usersToDisplay.forEach((user) => {
        const userCard = document.createElement("div");

        const name = document.createElement("h2");
        name.textContent = user.name;

        const email = document.createElement("p");
        email.textContent = `Email: ${user.email}`;

        const city = document.createElement("p");
        city.textContent = `City: ${user.address.city}`;

        const company = document.createElement("p");
        company.textContent = `Company: ${user.company.name}`;

        userCard.appendChild(name);
        userCard.appendChild(email);
        userCard.appendChild(city);
        userCard.appendChild(company);

        list.appendChild(userCard);
    });
}

filterInput.addEventListener("input", () => {
    const searchText = filterInput.value.toLowerCase();

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchText)
    );

    displayUsers(filteredUsers);
});

button.addEventListener("click", fetchUsers);
