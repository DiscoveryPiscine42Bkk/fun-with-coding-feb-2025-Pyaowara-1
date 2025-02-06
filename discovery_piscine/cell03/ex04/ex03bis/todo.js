const list = $("#ft_list");
let TODO = [];
let nextId = 0;

function createTodo(text, id) {
    return $('<div>').addClass('todo')
        .append($('<p>').text(text))
        .append($('<button>').text('Delete').click(() => remove(id)));
}

function update() {
    list.empty();
    for (let item of TODO)
        list.append(createTodo(item.text, item.id));
    document.cookie = "todos=" + JSON.stringify(TODO) + ";path=/";
}

function newTodo() {
    let name = prompt("Name the todo.");
    if (name && name.length > 0) {
        TODO.unshift({ id: nextId++, text: name });
        update();
    }
}

function remove(id) {
    if (confirm('Are you sure to remove?')) {
        TODO = TODO.filter(item => item.id !== id);
        update();
    }
}

$(document).ready(function () {
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
        console.log(TODO.map(item => item.id));
        update();
    }
}
);