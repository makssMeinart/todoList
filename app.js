const userInput = document.querySelector("#user-input")
const userButton = document.querySelector("#user-confirm")
const todoList = document.querySelector("#todo-list")
const todoSelect = document.querySelector("#user-filter")

// We need to count how many tasks we have made
let taskCount = 0;

// Need to check when window loads
document.addEventListener("DOMContentLoaded", addFromLocal)
// Add click event on userButton, and activate CreateElement Func
userButton.addEventListener("click", createElem)
// Check the delete and check btns
todoList.addEventListener("click", deleteCheck)
// Here we need to listen for the select to change
todoSelect.addEventListener("click", todoFilter)

// Creat sequence of elements
function createElem(event) {
  // Prevent form from submitting
  event.preventDefault()

  // Check if userInput is not empty and then allow it to create new item
  // Or we have 9 or less tasks 
  if(userInput.value != "" && taskCount <= 5) {
  // Create Div
    const todoDiv = document.createElement("div")
  todoDiv.classList.add("todo")
    // Create Li 
  let todoLi = document.createElement("li")
  // Change Li innerText
  todoLi.innerText = userInput.value
  // Append new Li to todoDiv
  todoDiv.append(todoLi)
  // Start Local Storage Func
  saveLocalItems(userInput.value)
  // Create checkBtn, put icon in it and append it to the todoDiv
  let checkBtn = document.createElement("button")
  checkBtn.classList.add("user-check")
  checkBtn.innerHTML = `<i class="fas fa-check-square"></i>` 
  todoDiv.append(checkBtn)
  // Create checkBtn, put icon in it and append it to the todoDiv
  let deleteBtn = document.createElement("button")
  deleteBtn.classList.add("user-delete")
  deleteBtn.innerHTML = `<i class="fas fa-trash"></i>`
  // Add uncompleted class to each new div
  todoDiv.classList.add("uncompleted")
  todoDiv.append(deleteBtn)

  // Add final div to the HTML part
  todoList.append(todoDiv)
  // Clear the input 
  userInput.value = ""
  // Add to task count
  taskCount++
  }

}


function deleteCheck(e) {
  const item = e.target; 

  if(item.classList.contains("user-check")) {
    let parentItem = item.parentElement
    parentItem.classList.add("checked")
    // Delete the uncompleted class
    parentItem.classList.remove("uncompleted")
  }
  if(item.classList.contains("user-delete")) {
    let parentItem = item.parentElement
    parentItem.classList.add("fall")
    // Need to do a little delay before removing the item so the animation has time to play
    parentItem.style.animation = "fall 1.2s" 
    setTimeout(() => {
    parentItem.remove()
    },1150)
    removeFromLocal(parentItem)
    // Decrease count of Todo Items
    taskCount--
  }
} 


// Filter
function todoFilter(e) {
  const todoListItem = todoList.children
  for(let key of todoListItem) {
    switch(e.target.value) {
      case "all":
        key.style.display = "flex";
        break
      case "completed":
        if(key.classList.contains("checked")) {
          key.style.display = "flex";
        }
        else {
          key.style.display = "none";
        }
        break
      case "uncompleted":
        if(key.classList.contains("uncompleted")) {
          key.style.display = "flex";
        }
        else {
          key.style.display = "none";
        }
    }
  }
}

// Local Storage
function saveLocalItems(item) {
  let todos
  // If we don't have todos in locastorage make new array
  if(localStorage.getItem("todos") === null) {
    todos = []
  }
  // Else parse the content
  else {
    todos = JSON.parse(localStorage.getItem("todos"))
  }
  todos.push(item)
  localStorage.setItem("todos", JSON.stringify(todos))
}

function addFromLocal() {
  let todos
  // If we don't have todos in locastorage make new array
  if(localStorage.getItem("todos") === null) {
    todos = []
  }
  // Else parse the content
  else {
    todos = JSON.parse(localStorage.getItem("todos"))
  }
  todos.forEach(todo => {

    if(todo != "" && taskCount <= 5) {
      // Create Div
      const todoDiv = document.createElement("div")
      todoDiv.classList.add("todo")
        // Create Li 
      let todoLi = document.createElement("li")
      // Change Li innerText
      todoLi.innerText = todo
      // Append new Li to todoDiv
      todoDiv.append(todoLi)
      // Create checkBtn, put icon in it and append it to the todoDiv
      let checkBtn = document.createElement("button")
      checkBtn.classList.add("user-check")
      checkBtn.innerHTML = `<i class="fas fa-check-square"></i>` 
      todoDiv.append(checkBtn)
      // Create checkBtn, put icon in it and append it to the todoDiv
      let deleteBtn = document.createElement("button")
      deleteBtn.classList.add("user-delete")
      deleteBtn.innerHTML = `<i class="fas fa-trash"></i>`
      // Add uncompleted class to each new div
      todoDiv.classList.add("uncompleted")
      todoDiv.append(deleteBtn)
    
      // Add final div to the HTML part
      todoList.append(todoDiv)
      // Clear the input 
      userInput.value = ""
      // Add to task count
      taskCount++
    }
    
  })
}

// Remove todo from local
function removeFromLocal(item) {
  let todos
  // If we don't have todos in locastorage make new array
  if(localStorage.getItem("todos") === null) {
    todos = []
  }
  // Else parse the content
  else {
    todos = JSON.parse(localStorage.getItem("todos"))
  }
  const liInnerText = item.firstChild.innerText
  todos.splice(todos.indexOf(liInnerText,1))
  localStorage.setItem("todos", JSON.stringify(todos))
}