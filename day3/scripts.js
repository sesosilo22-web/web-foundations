let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];

function searchNotes(word) {
    return notes.filter(note =>
        note.text.toLowerCase().includes(word.toLowerCase())
    );
}

function longestNote() {
    if (notes.length === 0) {
        return null;
    }

    return notes.reduce((longest, note) => {
        if (note.text.length > longest.text.length) {
            return note;
        }
        return longest;
    });
}

function countByCategory() {
    const counts = {};

    notes.forEach(note => {
        if (!counts[note.category]) {
            counts[note.category] = 0;
        }

        counts[note.category]++;
    });

    return counts;
}

function getSummary() {
    const counts = countByCategory();
    const noteWord = notes.length === 1 ? "note" : "notes";

    return `${notes.length} ${noteWord}: ${counts.personal || 0} personal, ${counts.work || 0} work, ${counts.study || 0} study.`;
}

function isDuplicate(text) {
    const cleanedText = text.trim().toLowerCase();

    return notes.some(note =>
        note.text.trim().toLowerCase() === cleanedText
    );
}

function addNote(text, category) {
    const cleanedText = text.trim();
    const validCategories = ["personal", "work", "study"];

    if (cleanedText.length < 1 || cleanedText.length > 200) {
        console.log("Note must be between 1 and 200 characters.");
        return false;
    }

    if (isDuplicate(cleanedText)) {
        console.log("Note is a duplicate.");
        return false;
    }

    if (!validCategories.includes(category)) {
        console.log("Category must be personal, work or study.");
        return false;
    }

    const newId = notes.length + 1;

    notes.push({
        id: newId,
        text: cleanedText,
        category: category
    });

    return true;
}


console.log(searchNotes("milk")); 

console.log(searchNotes("pizza")); 


console.log(longestNote()); 

let savedNotes = notes;
notes = [];

console.log(longestNote()); 

notes = savedNotes;


console.log(countByCategory()); 

console.log(countByCategory().travel); 


console.log(getSummary()); 

let originalNotes = notes;
notes = [{ id: 6, text: "Study JavaScript", category: "study" }];

console.log(getSummary()); 

notes = originalNotes;


console.log(isDuplicate("Buy milk and bread")); 

console.log(isDuplicate("  BUY MILK AND BREAD  ")); 


console.log(addNote("Go to the gym", "personal")); 

console.log(addNote("Buy milk and bread", "personal")); 

console.log(addNote("", "study")); 

console.log(addNote("Go shopping", "home")); 

