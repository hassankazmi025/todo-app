const todoInput = document.querySelector(".todo-input");
const addBtn = document.querySelector(".add-btn");
const todoList = document.querySelector(".todo-list");

const todos = JSON.parse(localStorage.getItem("todos")) || [];
let editTodo = null;

todos.forEach((todo) => renderTodo(todo));
addBtn.addEventListener("click", () => {
  const todoText = todoInput.value.trim();
  if (todoText === "") return;

  //update existing todo

  if (editTodo) {
    editTodo.todo.text = todoText;
    editTodo.element.querySelector(".listText").textContent = todoText;
    saveList();
    editTodo = null;
    addBtn.textContent = "Add";
  } else {
    const newTodo = { text: todoText, completed: false };
    todos.push(newTodo);
    saveList();
    renderTodo(newTodo);
  }

  todoInput.value = "";
});

function renderTodo(todo) {
  const li = document.createElement("li");

  li.innerHTML = `<div class="task">
                <input type="checkbox" ${todo.completed ? "checked" : ""}>
                <span class="listText">${todo.text}</span>
              </div>
    
              <div class="actions">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
              </div>`;
  const checkbox = li.querySelector("input");
  const span = li.querySelector(".listText");

  checkbox.addEventListener("change", () => {
    todo.completed = checkbox.checked;
    console.log(todo.completed);
    saveList();
  });
  todoList.appendChild(li);

  //for edit
  const editBtn = li.querySelector(".edit-btn");
  editBtn.addEventListener("click", () => {
    editTodo = {
      todo: todo,
      element: li,
    };
    todoInput.value = todo.text;
    todoInput.focus();
    addBtn.textContent = "update";
    saveList();
  });

  //for delete
  const deleteBtn = li.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", () => {
    li.remove();
    const index = todos.indexOf(todo);
    todos.splice(index, 1);
    saveList();
  });
}

function saveList() {
  localStorage.setItem("todos", JSON.stringify(todos));
}
