// javascript Object
const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');
const todoItemsList = document.querySelector('.todo-items');

// ternary Operator
let todos = [];
todoForm.addEventListener('submit', function(event) {
  // reload page
  event.preventDefault();
  addTodo(todoInput.value);
});

// functions
// filter function
// symbol ==&===
// ForEach Loop
function addTodo(item) {
  if (item !== '') {
    // Javascript Object
    const todo = {
      id: Date.now(),
      name: item,
      completed: false
    };

    // masukan ke array
    todos.push(todo);
    // ke lokal storage
    addToLocalStorage(todos);
    todoInput.value = '';
  }
}

// buat render todos ke screen
function renderTodos(todos) {
  todoItemsList.innerHTML = '';
  todos.forEach(function(item) {
    // check item completed
    const checked = item.completed ? 'checked': null;
    
    const li = document.createElement('li');
    // li ke class item
    li.setAttribute('class', 'item');
    // li data key dan item.id
    li.setAttribute('data-key', item.id);
    

    if (item.completed === true) {
      li.classList.add('checked');
    }

    li.innerHTML = `
      <input type="checkbox" class="checkbox" ${checked}>
      ${item.name}
      <button class="delete-button">X</button>
    `;
    // pindahkan li ke lu
    todoItemsList.append(li);
  });

}

// function untuk nambah ke lokal storage
function addToLocalStorage(todos) {
  // rubah array ke string
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos(todos);
}

// function untuk mengambil dari lokal storage
function getFromLocalStorage() {
  const reference = localStorage.getItem('todos');
  if (reference) {
    todos = JSON.parse(reference);
    renderTodos(todos);
  }
}


function toggle(id) {
  todos.forEach(function(item) {
    if (item.id == id) {
      item.completed = !item.completed;
    }
  });

  addToLocalStorage(todos);
}

// hapus todo dari todos array, lalu update ke lokal storage dan render list ke screen
function deleteTodo(id) {
  todos = todos.filter(function(item) {
    return item.id != id;
  });
  addToLocalStorage(todos);
}


getFromLocalStorage();

// checkbox
// symbol ==&===
todoItemsList.addEventListener('click', function(event) {
  if (event.target.type === 'checkbox') {
    toggle(event.target.parentElement.getAttribute('data-key'));
  }

  // delete button
  if (event.target.classList.contains('delete-button')) {
    deleteTodo(event.target.parentElement.getAttribute('data-key'));
  }
});