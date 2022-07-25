// Вам нужно модернизировать ваш TODO используя новые знания о DOM. Построение интерфейса -
//  произвольное, но помните о формах и элементах форм. Визуальное состояние вашего списка
//  заметок должно соответствовать состоянию данных и наоборот.

// В домашнем задании обязательно необходимо использовать приложенную структуру проекта.
const todoBox = document.createElement('div');
const todo = {};

Object.defineProperty(todo, 'list', {
    value: [],
    writable: false,
    configurable: false,
});

Object.defineProperty(todo, 'addTask', {
    value: function (task) {
        if (!this.list.some(item => item.title === task.title)) {
            this.list.push(task);
            return true;
        }
    },
    writable: false,
    configurable: false,
});

Object.defineProperty(todo, 'removeTask', {
    value: function (task) {
        let res = false;
        this.list.forEach((item, index) => {
            if (item.title === task.title) {
                const amount = 1;
                this.list.splice(index, amount);
                res = true;
            }
        });
        return res;
    },
    writable: false,
    configurable: false,
});

Object.defineProperty(todo, 'editTask', {
    value: function (task) {
        let res = false;
        this.list.forEach((item, index) => {
            if (item.title === task.title) {
                this.list[index] = task;
                res = true;
            }
        });
        return res;
    },
    writable: false,
    configurable: false,
});

Object.defineProperty(todo, 'info', {
    value: function () {
        const all = this.list.length;
        const completed = this.list.filter(item => item.completed).length;
        return {
            all,
            completed,
            performing: all - completed,
        };
    },
    writable: false,
    configurable: false,
});

todo.addTask({ title: 'task1', text: 'text1', completed: false });
todo.addTask({ title: 'task2', text: 'text2', completed: false });
todo.addTask({ title: 'task3', text: 'text3', completed: false });

function updateInfo() {
    const info = todo.info();
    const all = document.querySelector('#all');
    const completed = document.querySelector('#completed');
    const performing = document.querySelector('#performing');
    all.innerText = 'all: ' + info.all;
    completed.innerText = 'completed: ' + info.completed;
    performing.innerText = 'performing: ' + info.performing;
}

function saveTask(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const task = {
        title: form.querySelector('.title').innerText,
        text: form.querySelector('.text').value,
        completed: form.querySelector('.completed').checked,
    };
    if (todo.editTask(task)) {
        updateInfo();
    }
}

function removeTask(task, todoItem) {
    if (todo.removeTask(task)) {
        todoBox.removeChild(todoItem);
        updateInfo();
    }
}

function renderItem(item) {
    const todoItem = document.createElement('form');
    todoItem.setAttribute('action', '#');
    todoItem.addEventListener('submit', saveTask);

    const table = document.createElement('table');
    table.setAttribute('width', '100%');
    const row = document.createElement('tr');

    const ceil1 = document.createElement('td');
    ceil1.setAttribute('width', '10%');
    const title = document.createElement('span');
    title.classList.add('title');
    title.innerText = item.title;
    ceil1.appendChild(title);

    const ceil2 = document.createElement('td');
    ceil2.setAttribute('width', '20%');
    const text = document.createElement('input');
    text.setAttribute('required', '');
    text.classList.add('text');
    text.value = item.text;
    ceil2.appendChild(text);

    const ceil3 = document.createElement('td');
    ceil3.setAttribute('width', '5%');
    const completed = document.createElement('input');
    completed.classList.add('completed');
    completed.type = 'checkbox';
    completed.checked = item.completed;
    ceil3.appendChild(completed);

    const ceil4 = document.createElement('td');
    ceil4.setAttribute('width', '20%');
    const save = document.createElement('button');
    save.type = 'submit';
    save.innerText = 'Save task';
    ceil4.appendChild(save);

    const ceil5 = document.createElement('td');
    ceil5.setAttribute('width', '20%');
    const remove = document.createElement('button');
    remove.addEventListener('click', removeTask.bind(null, item, todoItem));
    remove.type = 'button';
    remove.innerText = 'Remove task';
    ceil5.appendChild(remove);

    const ceil6 = document.createElement('td');

    row.appendChild(ceil1);
    row.appendChild(ceil2);
    row.appendChild(ceil3);
    row.appendChild(ceil4);
    row.appendChild(ceil5);
    row.appendChild(ceil6);
    table.appendChild(row);
    todoItem.appendChild(table);

    return todoItem;
}

function createTask(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const task = {
        title: form.querySelector('.title').value,
        text: form.querySelector('.text').value,
        completed: false,
    };
    if (todo.addTask(task)) {
        todoBox.appendChild(renderItem(task));
        updateInfo();
    }
}

function renderCreate() {
    const todoItem = document.createElement('form');
    todoItem.setAttribute('action', '#');
    todoItem.addEventListener('submit', createTask);

    const table = document.createElement('table');
    table.setAttribute('width', '100%');
    table.setAttribute('height', '100px');
    const row = document.createElement('tr');

    const ceil1 = document.createElement('td');
    ceil1.setAttribute('width', '20%');
    const title = document.createElement('input');
    title.setAttribute('required', '');
    title.setAttribute('maxlength', '10');
    title.classList.add('title');
    ceil1.appendChild(title);

    const ceil2 = document.createElement('td');
    ceil2.setAttribute('width', '20%');
    const text = document.createElement('input');
    text.setAttribute('required', '');
    text.classList.add('text');
    ceil2.appendChild(text);

    const ceil3 = document.createElement('td');
    ceil3.setAttribute('width', '20%');
    const add = document.createElement('button');
    add.type = 'submit';
    add.innerText = 'Add task';
    ceil3.appendChild(add);

    const ceil4 = document.createElement('td');

    row.appendChild(ceil1);
    row.appendChild(ceil2);
    row.appendChild(ceil3);
    row.appendChild(ceil4);
    table.appendChild(row);
    todoItem.appendChild(table);

    return todoItem;
}

todo.list.map(item => {
    todoBox.appendChild(renderItem(item));
});

function renderInfo() {
    const infoBox = document.createElement('div');

    const all = document.createElement('div');
    all.id = 'all';

    const completed = document.createElement('div');
    completed.id = 'completed';

    const performing = document.createElement('div');
    performing.id = 'performing';

    infoBox.appendChild(all);
    infoBox.appendChild(completed);
    infoBox.appendChild(performing);

    return infoBox;
}

document.body.prepend(todoBox);
document.body.prepend(renderCreate());
document.body.prepend(renderInfo());
updateInfo();
