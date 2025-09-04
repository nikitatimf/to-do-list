let tasksCount = 0;
let tasksReadyCount = 0;
let totalCountTask = 0;

const formInput = document.querySelector(".form_input");
const formBtn = document.querySelector(".form_btn");
formBtn.addEventListener('click', formBtnHandler);


createProgress();


/* Task buttons */
function readyClickHandler(taskAll) {
    return () => {
        taskAll.remove();
        tasksReadyCount++;
        tasksCount--;
        createProgress();
    }
}

function deleteClickHandler(taskAll) {
    return () => {
        taskAll.remove();
        tasksCount--;
        createProgress();
    }
}


let a = 1; // --------------------------
function correctClickHandler(taskAll, task) {
    return () => {
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'task_edit';
        const oldTitle = task.querySelector('.task_text');
        input.placeholder = oldTitle.textContent;

        task.prepend(input);

        oldTitle.style.display = 'none';
        const btnImg = task.querySelector('.buttons');
        btnImg.style.display = 'none';

        const confirmBtn = document.createElement('button');
        confirmBtn.className = 'button_ready';
        confirmBtn.id = 'button_ready';
        const confirmImg = document.createElement('img');
        confirmImg.className = 'button_img';
        confirmImg.src = "./images/button_ready.png";
        confirmBtn.append(confirmImg);
        task.append(confirmBtn);
        confirmBtn.addEventListener('click', confirmClickHandler(task, input));

        const subTask = document.createElement('div');
        subTask.className = 'task task-short';
        subTask.textContent = a++; // ---------------

        const subTaskBtn = document.createElement('button');
        subTaskBtn.className = 'button_plus';
        subTaskBtn.addEventListener('click', clickPlusHandler(taskAll, task, subTaskBtn))

        const subTaskImg = document.createElement('img');
        subTaskImg.className = 'button_img';
        subTaskImg.src = "./images/plus.png";

        subTaskBtn.append(subTaskImg);
        subTask.append(subTaskBtn);

        task.insertAdjacentElement('afterend', subTask)
        taskAll.append(subTask);
        
        
    }
}

function confirmClickHandler(task, input) {
    return () => {
        const oldTitle = task.querySelector('.task_text');
        if (input.value) {
            oldTitle.textContent = input.value;
        }

        oldTitle.style.display = 'block';
        input.remove()

        const btnImg = task.querySelector('.buttons');
        btnImg.style.display = 'block';

        const confirmBtn = document.querySelector('#button_ready');
        confirmBtn.remove();
    }
}

function clickPlusHandler(taskAll, task, oldSubTaskBtn) {
    return () => {
        const subTask = document.createElement('div');
        subTask.className = 'task task-short';

        const subTaskBtn = document.createElement('button');
        subTaskBtn.className = 'button_plus';
        subTaskBtn.addEventListener('click', clickPlusHandler)

        const subTaskImg = document.createElement('img');
        subTaskImg.className = 'button_img';
        subTaskImg.src = "./images/plus.png";

        subTaskBtn.append(subTaskImg);
        subTask.append(subTaskBtn);

        // task.insertAdjacentElement('beforeend', subTask)
        taskAll.append(subTask);
        oldSubTaskBtn.style.display = 'none';
    }
}


/* Task progress */
function createProgress() {
    const oldProgress = document.querySelector('.progress');
    if (oldProgress) {
        oldProgress.remove();
    }
    const progress = document.createElement('div');
    progress.className = 'progress';

    for (let i = 0; i < 2; i++) {
        const progressWnd = document.createElement('div');
        progressWnd.className = 'progress_window';

        const title = document.createElement('p');
        title.className = 'progress_title';
        title.textContent = 
            i === 0 ? 
            `Выполнено задач : ${tasksReadyCount}` :
            `Текущие задачи : ${tasksCount}`;

        progressWnd.append(title);
        progress.append(progressWnd);
        const container = document.querySelector('[id="progress_container"]');
        container.prepend(progress);
    }
}


/* Add task */
function formBtnHandler() {
    if (formInput.value) {
        createTask(formInput.value);
        formInput.value = '';
        tasksCount++;
        totalCountTask++;
        createProgress();
    }
}

function createTask(taskName) {
    const taskList = document.querySelector(".tasks");

    const taskAll = document.createElement('div');
    taskAll.className = 'taskAll';

    const task = document.createElement('div');
    task.className = 'task';
    const title = document.createElement('p');
    title.className = "task_text";
    title.textContent = taskName;
    const taskImgs = document.createElement('div');
    taskImgs.className = "buttons";
    taskImgs.innerHTML = `
        <button class="button_delete" id="delete${totalCountTask}">
            <img class="button_img" src="./images/button_delete.png" alt="">
        </button>
        <button class="button_correct" id="correct${totalCountTask}">
            <img class="button_img" src="./images/button_correst.png" alt="">
        </button>
        <button class="button_ready" id="ready${totalCountTask}">
            <img class="button_img" src="./images/button_ready.png" alt="">
        </button>`;

    const readyBtn = taskImgs.querySelector(`#ready${totalCountTask}`);
    readyBtn.addEventListener('click', readyClickHandler(taskAll));

    const deleteBtn = taskImgs.querySelector(`#delete${totalCountTask}`);
    deleteBtn.addEventListener('click', deleteClickHandler(taskAll));
    
    const changeBtn = taskImgs.querySelector(`#correct${totalCountTask}`);
    changeBtn.addEventListener('click', correctClickHandler(taskAll, task));

    task.append(title);
    task.append(taskImgs);
    taskAll.append(task);
    taskList.append(taskAll);
}

