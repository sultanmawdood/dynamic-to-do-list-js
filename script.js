document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false = ذخیره مجدد در LS لازم نیست
    }


    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            
            const text = li.firstChild.textContent;
            tasks.push(text);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    
    function addTask(taskText = null, save = true) {
        
        if (!taskText) {
            taskText = taskInput.value.trim();
        }

        if (taskText !== "") {
            const li = document.createElement('li');
            li.textContent = taskText;

            const removeBtn = document.createElement('button');
            removeBtn.textContent = "Remove";
            removeBtn.classList.add("remove-btn");

            removeBtn.addEventListener('click', function () {
                taskList.removeChild(li);
                saveTasks();
            });

            li.appendChild(removeBtn);
            taskList.appendChild(li);

            if (save) {
                saveTasks(); 
            }

            taskInput.value = "";
        } else if (save) {
            alert("Please enter a task!");
        }
    }

  
    addButton.addEventListener('click', () => addTask());

 
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    
    loadTasks();
});
