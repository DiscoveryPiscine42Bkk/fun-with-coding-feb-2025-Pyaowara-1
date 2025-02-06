const list = document.getElementById("ft_list");
let TODO = [];
let nextId = 0;

function createTodo(text, id) {
    const element = document.createElement('div');
    element.classList.add('todo');
    element.innerHTML = `<p>${text}</p><button onclick="remove(${id})">Delete</button>`;
    return element;
}

function update() {
    list.innerHTML = '';
    for (let index = 0; index < TODO.length; index++) {
        const item = TODO[index];
        list.appendChild(createTodo(item.text, item.id));
    }
    document.cookie = "todos=" + JSON.stringify(TODO) + ";path=/";
    // console.log(TODO)
}

function newTodo() {
    let name = prompt("Name the todo.");
    if (name.length > 0) {
        TODO.unshift({ id: nextId++, text: name });
        update();
    }
}

function remove(id) {
    let yes = confirm('Are you sure to remove?');
    if (yes) {
        TODO = TODO.filter((item) => item.id !== id);
        update();
    }
}

window.onload = function () {
    const cookies = document.cookie.split(';');
    let todoCookie = null;
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'todos') {
            todoCookie = value;
            break;
        }
    }
    if (todoCookie) {
        TODO = JSON.parse(todoCookie);
        nextId = TODO.length > 0 ? Math.max(...TODO.map(item => item.id)) + 1 : 0;
        update();
    }

};