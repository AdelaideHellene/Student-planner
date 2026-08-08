// ==========================
// SUBJECT ELEMENTS
// ==========================

const subjectInput =
    document.getElementById("subjectInput");

const addSubjectButton =
    document.getElementById("addSubjectButton");

const subjectList =
    document.getElementById("subjectList");

const subjectDropdown =
    document.getElementById("subjectDropdown");


// ==========================
// STUDY SESSION ELEMENTS
// ==========================

const topicInput =
    document.getElementById("topicInput");

const sessionDate =
    document.getElementById("sessionDate");

const sessionTime =
    document.getElementById("sessionTime");

const addSessionButton =
    document.getElementById("addSessionButton");

const sessionList =
    document.getElementById("sessionList");


// ==========================
// LOAD SAVED DATA
// ==========================

let subjects =
    JSON.parse(
        localStorage.getItem("subjects")
    ) || [];


let sessions =
    JSON.parse(
        localStorage.getItem("studySessions")
    ) || [];


// ==========================
// DISPLAY SAVED SUBJECTS
// ==========================

displaySubjects();


// ==========================
// DISPLAY SAVED SESSIONS
// ==========================

displaySessions();


// ==========================
// ADD SUBJECT
// ==========================

addSubjectButton.addEventListener(
    "click",
    function() {

        const subjectName =
            subjectInput.value.trim();


        // Don't allow empty subjects

        if (subjectName === "") {

            return;

        }


        // Don't allow duplicate subjects

        const subjectExists =
            subjects.some(
                function(subject) {

                    return subject.toLowerCase() ===
                           subjectName.toLowerCase();

                }
            );


        if (subjectExists) {

            return;

        }


        // Add subject

        subjects.push(subjectName);


        saveSubjects();

        displaySubjects();


        // Clear input

        subjectInput.value = "";

    }
);


// ==========================
// ENTER KEY - SUBJECT
// ==========================

subjectInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            event.preventDefault();

            addSubjectButton.click();

        }

    }
);


// ==========================
// DISPLAY SUBJECTS
// ==========================

function displaySubjects() {

    // Clear current list

    subjectList.innerHTML = "";


    // Clear dropdown

    subjectDropdown.innerHTML = `
        <option value="" selected disabled>
            Select Subject
        </option>
    `;


    subjects.forEach(
        function(subject) {

            // ==========================
            // SUBJECT LIST ITEM
            // ==========================

            const listItem =
                document.createElement("li");


            const subjectText =
                document.createElement("span");

            subjectText.textContent =
                subject;


            // Delete button

            const deleteButton =
                document.createElement("button");

            deleteButton.textContent =
                "Delete";


            deleteButton.addEventListener(
                "click",
                function() {

                    const subjectIndex =
                        subjects.indexOf(
                            subject
                        );


                    if (
                        subjectIndex !== -1
                    ) {

                        subjects.splice(
                            subjectIndex,
                            1
                        );

                    }


                    saveSubjects();

                    displaySubjects();

                }
            );


            // Add elements

            listItem.appendChild(
                subjectText
            );

            listItem.appendChild(
                deleteButton
            );


            subjectList.appendChild(
                listItem
            );


            // ==========================
            // DROPDOWN OPTION
            // ==========================

            const option =
                document.createElement("option");


            option.value =
                subject;

            option.textContent =
                subject;


            subjectDropdown.appendChild(
                option
            );

        }
    );

}


// ==========================
// SAVE SUBJECTS
// ==========================

function saveSubjects() {

    localStorage.setItem(
        "subjects",
        JSON.stringify(
            subjects
        )
    );

}


// ==========================
// ADD STUDY SESSION
// ==========================

addSessionButton.addEventListener(
    "click",
    function() {

        const subject =
            subjectDropdown.value;

        const topic =
            topicInput.value.trim();

        const date =
            sessionDate.value;

        const time =
            sessionTime.value;


        // Check required fields

        if (
            subject === "" ||
            topic === "" ||
            date === "" ||
            time === ""
        ) {

            return;

        }


        // Create session

        const newSession = {

            subject: subject,

            topic: topic,

            date: date,

            time: time

        };


        sessions.push(
            newSession
        );


        saveSessions();

        displaySessions();


        // Clear inputs

        subjectDropdown.value = "";

        topicInput.value = "";

        sessionDate.value = "";

        sessionTime.value = "";

    }
);


// ==========================
// DISPLAY SESSIONS
// ==========================

function displaySessions() {

    sessionList.innerHTML = "";


    // Sort sessions by date and time

    sessions.sort(
        function(a, b) {

            const firstSession =
                new Date(
                    `${a.date}T${a.time}`
                );


            const secondSession =
                new Date(
                    `${b.date}T${b.time}`
                );


            return (
                firstSession -
                secondSession
            );

        }
    );


    sessions.forEach(
        function(session) {

            createSession(
                session
            );

        }
    );

}


function createSession(session) {

    const listItem =
        document.createElement("li");


    // ==========================
    // SESSION INFORMATION
    // ==========================

    const sessionInfo =
        document.createElement("div");

    sessionInfo.classList.add(
        "session-info"
    );


    // Subject

    const subject =
        document.createElement("strong");

    subject.textContent =
        session.subject;


    // Topic

    const topic =
        document.createElement("span");

    topic.textContent =
        session.topic;


    // Date and time

    const dateTime =
        document.createElement("small");

    dateTime.textContent =
        `📅 ${formatDate(session.date)}
        • ⏰ ${formatTime(session.time)}`;


    // ==========================
    // SESSION STATUS
    // ==========================

    const status =
        document.createElement("small");

    status.classList.add(
        "session-status"
    );


    const today =
        new Date();

    today.setHours(
        0,
        0,
        0,
        0
    );


    const sessionDay =
        new Date(session.date);

    sessionDay.setHours(
        0,
        0,
        0,
        0
    );


    const difference =
        sessionDay - today;


    const daysRemaining =
        Math.ceil(
            difference /
            (1000 * 60 * 60 * 24)
        );


    if (daysRemaining < 0) {

        status.textContent =
            "⚪ Past";

        status.classList.add(
            "past"
        );

    }

    else if (daysRemaining === 0) {

        status.textContent =
            "🔴 Today";

        status.classList.add(
            "today"
        );

    }

    else if (daysRemaining === 1) {

        status.textContent =
            "🟡 Tomorrow";

        status.classList.add(
            "tomorrow"
        );

    }

    else {

        status.textContent =
            "🟢 Upcoming";

        status.classList.add(
            "upcoming"
        );

    }


    // Add information

    sessionInfo.appendChild(
        subject
    );

    sessionInfo.appendChild(
        topic
    );

    sessionInfo.appendChild(
        dateTime
    );

    sessionInfo.appendChild(
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

            const sessionIndex =
                sessions.indexOf(
                    session
                );


            if (
                sessionIndex !== -1
            ) {

                sessions.splice(
                    sessionIndex,
                    1
                );

            }


            saveSessions();

            displaySessions();

        }
    );


    // ==========================
    // ADD ELEMENTS
    // ==========================

    listItem.appendChild(
        sessionInfo
    );

    listItem.appendChild(
        deleteButton
    );


    sessionList.appendChild(
        listItem
    );

}


// ==========================
// SAVE SESSIONS
// ==========================

function saveSessions() {

    localStorage.setItem(
        "studySessions",
        JSON.stringify(
            sessions
        )
    );

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
// FORMAT TIME
// ==========================

function formatTime(time) {

    const [hours, minutes] =
        time.split(":");


    const date =
        new Date();


    date.setHours(
        hours,
        minutes
    );


    return date.toLocaleTimeString(
        "en-US",
        {
            hour: "numeric",
            minute: "2-digit"
        }
    );

}