import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-288de-default-rtdb.europe-west1.firebasedatabase.app/"
}


const app = initializeApp(appSettings)
const database = getDatabase(app)
const itemsINDB = ref(database, "items")


const itemsEl = document.getElementById("items")

onValue(itemsINDB, function(snapshot) {
    let itemsArray = Object.values(snapshot.val())
    
    clearItemsListEl()
    

    for (let i = 0; i < itemsArray.length; i++) {
        let currentItem = itemsArray[i]
    
        appendItemtoItemsListEl(currentItem)
    }
})

function clearItemsListEl() {
    itemsEl.innerHTML = ""
}

function appendItemtoItemsListEl(itemValue) {
    itemsEl.innerHTML += `<li>${itemValue}</li>`
}

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")

const addToCartSound = new Audio("sound.mp3"); 
const errorSound = new Audio("error.mp3");

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value.trim(); 
    if (inputValue === "") {
        return; // Ignore empty inputs
    }

    // Check if  item already exists in the list
    const existingItems = Object.values(itemsEl.children).map(item => item.textContent);
    if (existingItems.includes(inputValue)) {
        errorSound.play(); 
        alert("Item already exists in the list!"); //error message
        return;
    }

    // If item is not already in list, add it to the database and update
    push(itemsINDB, inputValue);
    inputFieldEl.value = ""; // Clear the input field

    // sound effect
    addToCartSound.play();
});

