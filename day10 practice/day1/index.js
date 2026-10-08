console .log("Hello World from javascript!");

let bank_balance = 1000;
let amount_to_withdraw = 500;
const sesona_limit = 200;

const can_sesona_withdraw = (amount) => {
    if (amount <= bank_balance && amount > sesona_limit) {
        return "continue";
    }
    else if (amount <= sesona_limit || amount == bank_balance) {
        return "you cannot continue withdrawing";
 } 
    
else{ 
        return "invalid input";
    }
};

console.log(`Hello Sesona, ${can_sesona_withdraw(500)}`);

const firstName = "Amina";
const greeting = "Hello, " + firstName + "!";        
const betterGreeting = `Hello, ${firstName}!`;       
 
console.log(betterGreeting);          
console.log(firstName.length);        
console.log(firstName.toUpperCase()); 
console.log("  hi  ".trim())

console.log(10 + 3);  // 13  addition
console.log(10 - 3);  // 7   subtraction
console.log(10 * 3);  // 30  multiplication
console.log(10 / 4);  // 2.5 division
console.log(10 % 3);  // 1   remainder ("modulo")
console.log("5" + 2); // "52" ⚠ a string + number joins them as text!
console.log(Number("5") + 2); // 7   converts the string "5" to a number before adding

const notes = ["Revise HTML", "Practise CSS", "Learn JS"];
 
console.log(notes[0]);      // "Revise HTML"  (first item is index 0)
console.log(notes[2]);      // "Learn JS"
console.log(notes.length);  // 3
 
notes.push("Push to GitHub");  // add to the end
console.log(notes.length);     // 4
 
notes.pop();                   // remove the last item
console.log(notes.includes("Practise CSS"));

const note = {
  id: 1,
  text: "Revise HTML forms",
  done: false,
};
 
console.log(note.text);   // "Revise HTML forms" (dot notation)
note.done = true;         // change a value
note.priority = "high";   // add a new key
console.log(note);

const noteList = [
  { id: 1, text: "Revise HTML forms", done: false },
  { id: 2, text: "Practise Flexbox", done: true },
];
console.log(noteList[1].text);  // "Practise Flexbox"