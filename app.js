//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list'); 
var todoID = JSON.parse(localStorage.getItem('todos'))!= null? JSON.parse(localStorage.getItem('todos')).length : 0 ; // Setting todo ID to last id in todo list otherwise zero

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos('all'));
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck); 

// implement filters
// filter_pending.addEventListener('click', console.log('hi'))


//Functions
function addTodo(event){
    //To prevent the form from submitting
    event.preventDefault();

    // create TODO OBJ
    var todoObj = {
        id: ++todoID,
        name: todoInput.value,
        status: 'pending'
    }

    //Adding Todo To Local Storage
    saveLocalTodos(todoObj);
    getTodos('all')

    //To clear Todo Input Value
    todoInput.value = "";

}

function deleteCheck(e) {
    const item = e.target;
    const todo = item.parentElement;
    
    //To delete a todo 
    if(item.classList[0] === 'trash-btn'){
        //Adding an animation for the deletion
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });  
    }

    //To complete a todo
    if(item.classList[0] === 'completed-btn'){
        todo.classList.toggle("completed");
        var id = item.getAttribute('id');  // get todo list id 
        id -= 1; //subtract 1 since array index starts from zero
        toggleStatus(id);
    }
}

function saveLocalTodos(todo){
    //Checking if there are todo lists saved already
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = []; 
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(filter){
    let todos = filterTodo(filter);
    todoList.innerHTML = '' //empty todo list

    todos.forEach(function(todo){
        //Creating a todo DIV 
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        //Add completed class if TODO is completed
        todo.status == 'complete'? todoDiv.classList.add('completed') : null; //Same as if statement below👇👇
        // if(todo.status == 'complete')
        // {
        //     todoDiv.classList.add('completed');
        // }

        //Creating the LI << refer to html code
        const newTodo = document.createElement('li');

        newTodo.innerText = todo.name; //Display todo name in li
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        
        //Completed Button (CheckMark)
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class = "fas fa-check"> </i>';
        completedButton.classList.add("completed-btn");
        completedButton.setAttribute('id', todo.id) // assign TODO id to button
        todoDiv.appendChild(completedButton);

        //Delete Button (Trash)
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class = "fas fa-trash"> </i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        //Appending to List (html)
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
     //Checking if there are todo lists saved already
     let todos;
     if(localStorage.getItem('todos') === null){
         todos = []; 
     }
     else {
         todos = JSON.parse(localStorage.getItem('todos'));
     }
     const todoIndex = todo.children[0].innerText;
     todos.splice(todos.indexOf(todoIndex), 1);
     localStorage.setItem('todos', JSON.stringify(todos));
}

// Toggle Todo Status
function toggleStatus(id)
{
    //Checking if there are todo lists saved already
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = []; 
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    var todo = todos[id];

    todo.status = todo.status == 'pending'? 'complete': 'pending'; // Just like if else statement below
    // if(todo.status == 'pending')
    // {
    //     todo.status = 'complete'
    // }else{
    //     todo.status = 'pending'
    // }

    localStorage.setItem('todos', JSON.stringify(todos));
}

function filterTodo(filter)
{
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = []; 
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    let completes =[];
    let pendings = [];

    // sort todos
    todos.forEach(function(todo){
        if(todo.status == 'pending')
        {
            pendings.push(todo)
        }else{
            completes.push(todo)
        }
    });

    // Return Filtered TODO
    if(filter == 'all')
    {
        return todos;
    }else if(filter == 'pending')
    {
        return pendings;
    }else{
        return completes;
    }
}
