const API_URL = "https://jsonplaceholder.typicode.com/posts";

const loadusers= document.querySelector("#load-users");
const statusText= document.querySelector("#status");
const list= document.querySelector("#users-list");
const form= document.querySelector("#note-form");
const filterinput= document.querySelector("#filter-input");

let users=[];

async function fetchUsers() {
    button.disabled = true;
    status.textContent = "Loading users...";
    usersContainer.textContent = "";

    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch users.");
        }

        users = await response.json();

        displayUsers(users);

        status.textContent = "Users loaded successfully!";
    } catch (error) {
        status.textContent = "Error loading users. Please try again.";
        console.error(error);
    } finally {
        button.disabled = false;
    }
}

function displayUsers(usersToDisplay) {
    usersContainer.textContent = "";

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

        usersContainer.appendChild(userCard);
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