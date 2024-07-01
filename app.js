// DOM Elements
const todo_input = document.getElementById("todo_input");
const todo_add_btn = document.getElementById("todo_add_btn");
const todo_list = document.getElementById("todo_list");

// Event listener for the Add button
todo_add_btn.addEventListener("click", async () => {
    const taskText = todo_input.value.trim();
    if (taskText !== "") {
        // Add the task to Firestore and get the document ID
        const docRef = await AddTodosCollection(taskText);

        // Create the list item element
        const li = document.createElement("li");
        li.setAttribute("data-id", docRef.id);

        const taskSpan = document.createElement("span");
        taskSpan.textContent = taskText;

        const editBtn = document.createElement("button");
        editBtn.classList.add("edit-btn");
        editBtn.textContent = "Edit";
        editBtn.onclick = () => EditLi(taskSpan);

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.textContent = "Del";
        deleteBtn.onclick = () => DelLi(li, docRef.id);

        li.appendChild(taskSpan);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        todo_list.appendChild(li);

        // Clear the input field
        todo_input.value = "";
    } else {
        alert("Please enter a task");
    }
});

// Function to delete a task
function DelLi(taskElement, docId) {
    taskElement.remove();
    DeleteTodoCollection(docId);
}

// Function to edit a task
function EditLi(taskSpan) {
    const newTaskText = prompt("Edit your task:", taskSpan.textContent);
    if (newTaskText !== null) {
        taskSpan.textContent = newTaskText;
        UpdateTodoCollection(taskSpan.parentElement.getAttribute("data-id"), newTaskText);
    }
}

// Firebase configuration and initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getFirestore, collection, addDoc, deleteDoc, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCGwl5HScUb9X5XctgOlzTaz0IVAuPZ4K0",
    authDomain: "todo-app-c9799.firebaseapp.com",
    projectId: "todo-app-c9799",
    storageBucket: "todo-app-c9799.appspot.com",
    messagingSenderId: "594306693833",
    appId: "1:594306693833:web:a7cd6bc6f0f3cb4dd56b18",
    measurementId: "G-RY3K49DRRZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
let todoCollections = collection(db, "Todos");

// Function to add a task to Firestore
async function AddTodosCollection(taskText) {
    try {
        const docRef = await addDoc(todoCollections, {
            todo: taskText,
        });
        console.log("Document written with ID: ", docRef.id);
        return docRef;
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

// Function to delete a task from Firestore
async function DeleteTodoCollection(docId) {
    try {
        await deleteDoc(doc(db, "Todos", docId));
        console.log("Document successfully deleted!");
    } catch (e) {
        console.error("Error deleting document: ", e);
    }
}

// Function to update a task in Firestore
async function UpdateTodoCollection(docId, newTaskText) {
    try {
        const taskDoc = doc(db, "Todos", docId);
        await updateDoc(taskDoc, {
            todo: newTaskText,
        });
        console.log("Document successfully updated!");
    } catch (e) {
        console.error("Error updating document: ", e);
    }
}
