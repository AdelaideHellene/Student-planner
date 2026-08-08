// ==========================
// USER NAME
// ==========================

const userName =
    document.getElementById("userName");

userName.textContent =
    localStorage.getItem("studentName");


// ==========================
// TASK ELEMENTS
// ==========================

const taskInput =
    document.getElementById("taskInput");

const addTaskButton =
    document.getElementById("addTaskButton");

const taskList =
    document.getElementById("taskList");


// ==========================
// PROGRESS ELEMENTS
// ==========================

const progressPercentage =
    document.getElementById("progressPercentage");

const progressFill =
    document.getElementById("progressFill");

const progressText =
    document.getElementById("progressText");


// ==========================
// DEADLINE ELEMENTS
// ==========================

const deadlineInput =
    document.getElementById("deadlineInput");

const deadlineDate =
    document.getElementById("deadlineDate");

const addDeadlineButton =
    document.getElementById("addDeadlineButton");

const deadlineList =
    document.getElementById("deadlineList");


// ==========================
// LOAD SAVED DATA
// ==========================

let tasks =
    JSON.parse(localStorage.getItem("tasks")) || [];

let deadlines =
    JSON.parse(localStorage.getItem("deadlines")) || [];


// ==========================
// DISPLAY SAVED TASKS
// ==========================

tasks.forEach(function(task) {

    createTask(task);

});


// ==========================
// DISPLAY SAVED DEADLINES
// ==========================

displayDeadlines();


// ==========================
// ADD TASK
// ==========================

addTaskButton.addEventListener("click", function() {

    const taskText =
        taskInput.value.trim();


    if (taskText === "") {

        return;

    }


    const newTask = {

        text: taskText,

        completed: false

    };


    tasks.push(newTask);


    saveTasks();

    createTask(newTask);


    taskInput.value = "";


    updateProgress();

});


// ==========================
// CREATE TASK
// ==========================

function createTask(task) {

    const listItem =
        document.createElement("li");


    // Checkbox

    const checkbox =
        document.createElement("input");

    checkbox.type = "checkbox";

    checkbox.classList.add(
        "task-checkbox"
    );

    checkbox.checked =
        task.completed;


    // Task text

    const taskLabel =
        document.createElement("span");

    taskLabel.textContent =
        task.text;


    // Completed state

    if (task.completed) {

        listItem.classList.add(
            "completed"
        );

    }


    // Checkbox event

    checkbox.addEventListener(
        "change",
        function() {

            task.completed =
                checkbox.checked;


            listItem.classList.toggle(
                "completed",
                checkbox.checked
            );


            saveTasks();

            updateProgress();

        }
    );


    // Delete button

    const deleteButton =
        document.createElement("button");

    deleteButton.textContent =
        "Delete";


    deleteButton.addEventListener(
        "click",
        function(event) {

            event.stopPropagation();


            const taskIndex =
                tasks.indexOf(task);


            if (taskIndex !== -1) {

                tasks.splice(
                    taskIndex,
                    1
                );

            }


            saveTasks();

            listItem.remove();

            updateProgress();

        }
    );


    // Add elements

    listItem.appendChild(
        checkbox
    );

    listItem.appendChild(
        taskLabel
    );

    listItem.appendChild(
        deleteButton
    );


    taskList.appendChild(
        listItem
    );

}


// ==========================
// SAVE TASKS
// ==========================

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}


// ==========================
// UPDATE PROGRESS
// ==========================

function updateProgress() {

    const totalTasks =
        tasks.length;


    const completedTasks =
        tasks.filter(
            function(task) {

                return task.completed;

            }
        ).length;


    let percentage = 0;


    if (totalTasks > 0) {

        percentage =
            Math.round(
                (completedTasks /
                totalTasks) * 100
            );

    }


    progressPercentage.textContent =
        percentage + "%";


    progressFill.style.width =
        percentage + "%";


    progressText.textContent =
        `${completedTasks} / ${totalTasks} Tasks Completed`;

}


// ==========================
// ADD DEADLINE
// ==========================

addDeadlineButton.addEventListener(
    "click",
    function() {

        const deadlineText =
            deadlineInput.value.trim();

        const date =
            deadlineDate.value;


        if (
            deadlineText === "" ||
            date === ""
        ) {

            return;

        }


        const newDeadline = {

            text: deadlineText,

            date: date

        };


        deadlines.push(
            newDeadline
        );


        saveDeadlines();

        displayDeadlines();


        deadlineInput.value = "";

        deadlineDate.value = "";

    }
);


// ==========================
// CREATE DEADLINE
// ==========================

function createDeadline(deadline) {

    const listItem =
        document.createElement("li");


    const deadlineText =
        document.createElement("span");


    // Deadline subject

    const subject =
        deadline.text ||
        deadline.subject ||
        "Unnamed deadline";


    // Subject + date

    deadlineText.innerHTML = `
        <strong>${subject}</strong>
        <small>📅 ${formatDate(deadline.date)}</small>
    `;


    // ==========================
    // DEADLINE STATUS
    // ==========================

    const status =
        document.createElement("small");

    status.classList.add(
        "deadline-status"
    );


    const today =
        new Date();

    today.setHours(
        0, 0, 0, 0
    );


    const deadlineDay =
        new Date(deadline.date);

    deadlineDay.setHours(
        0, 0, 0, 0
    );


    const difference =
        deadlineDay - today;


    const daysRemaining =
        Math.ceil(
            difference /
            (1000 * 60 * 60 * 24)
        );


    if (daysRemaining < 0) {

        status.textContent =
            "🔴 Overdue";

        status.classList.add(
            "overdue"
        );

    }

    else if (daysRemaining <= 3) {

        status.textContent =
            "🟡 Due soon";

        status.classList.add(
            "due-soon"
        );

    }

    else {

        status.textContent =
            "🟢 Upcoming";

        status.classList.add(
            "upcoming"
        );

    }


    // Add status

    deadlineText.appendChild(
        status
    );


    // ==========================
    // DELETE BUTTON
    // ==========================

    const deleteButton =
        document.createElement("button");

    deleteButton.textContent =
        "Delete";


    deleteButton.addEventListener(
        "click",
        function() {

            const deadlineIndex =
                deadlines.indexOf(
                    deadline
                );


            if (
                deadlineIndex !== -1
            ) {

                deadlines.splice(
                    deadlineIndex,
                    1
                );

            }


            saveDeadlines();

            displayDeadlines();

        }
    );


    // ==========================
    // ADD ELEMENTS
    // ==========================

    listItem.appendChild(
        deadlineText
    );

    listItem.appendChild(
        deleteButton
    );


    deadlineList.appendChild(
        listItem
    );

}


// ==========================
// SAVE DEADLINES
// ==========================

function saveDeadlines() {

    localStorage.setItem(
        "deadlines",
        JSON.stringify(
            deadlines
        )
    );

}


// ==========================
// DISPLAY DEADLINES
// ==========================

function displayDeadlines() {

    deadlineList.innerHTML = "";


    // Sort nearest deadline first

    deadlines.sort(function(a, b) {

        return new Date(a.date) -
               new Date(b.date);

    });


    // Display sorted deadlines

    deadlines.forEach(function(deadline) {

        createDeadline(deadline);

    });

}


// ==========================
// FORMAT DATE
// ==========================

function formatDate(date) {

    const dateObject =
        new Date(date);


    return dateObject.toLocaleDateString(
        "en-GB",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );

}


// ==========================
// INITIAL PROGRESS
// ==========================

updateProgress();



// ==========================
// QUICK ACTIONS
// ==========================

const quickAdd =
    document.getElementById("quick-add");

const quickDeadline =
    document.getElementById("quick-deadline");

const quickProgress =
    document.getElementById("quick-progress");


// ==========================
// ADD TASK
// ==========================

quickAdd.addEventListener("click", function() {

    taskInput.focus();

});


// ==========================
// CHECK DEADLINES
// ==========================

quickDeadline.addEventListener("click", function() {

    deadlineList.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

});


// ==========================
// VIEW PROGRESS
// ==========================

quickProgress.addEventListener("click", function() {

    progressPercentage.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

});

// ==========================
// ENTER KEY - TASK
// ==========================

taskInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            event.preventDefault();

            addTaskButton.click();

        }

    }
);


// ==========================
// ENTER KEY - DEADLINE
// ==========================

deadlineInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            event.preventDefault();

            addDeadlineButton.click();

        }

    }
);