const charcount = document.querySelector("#char-count");
const wordcount = document.querySelector("#word-count");
const clearbtn = document.querySelector("#clear-btn");
const themetoggle = document.querySelector("#theme-toggle");
const notetext = document.querySelector("#note-text");

const STORAGE_KEY = "drafts";
const THEME_KEY = "theme";


function updateCounts() {
    const text = notetext.value;

    const characters = text.length;

    const words = text.trim() === ""
        ? 0
        : text.trim().split(/\s+/).length;

    charcount.textContent = `${characters} / 200 characters`;
    wordcount.textContent = `${words} words`;

    if (characters > 200) {
        charcount.classList.add("over");
        charcount.classList.remove("warning");
    } else if (characters >= 180) {
        charcount.classList.add("warning");
        charcount.classList.remove("over");
    } else {
        charcount.classList.remove("warning", "over");
    }
}


notetext.addEventListener("input", () => {
    updateCounts();

    const text = notetext.value;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(text));
});


clearbtn.addEventListener("click", () => {
    notetext.value = "";

    localStorage.removeItem(STORAGE_KEY);

    updateCounts();
});


notetext.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        notetext.value = "";

        localStorage.removeItem(STORAGE_KEY);

        updateCounts();
    }
});


themetoggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themetoggle.textContent = "Light mode";
        localStorage.setItem(THEME_KEY, "dark");
    } else {
        themetoggle.textContent = "Dark mode";
        localStorage.setItem(THEME_KEY, "light");
    }
});


const savedDraft = localStorage.getItem(STORAGE_KEY);

if (savedDraft) {
    notetext.value = JSON.parse(savedDraft);
}


const savedTheme = localStorage.getItem(THEME_KEY);

if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themetoggle.textContent = "Light mode";
} else {
    themetoggle.textContent = "Dark mode";
}


updateCounts();
