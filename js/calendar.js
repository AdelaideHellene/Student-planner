// ==========================
// CALENDAR ELEMENTS
// ==========================

const calendarDays =
document.getElementById("calendarDays");

const monthYear =
document.getElementById("monthYear");

const previousMonth =
document.getElementById("previousMonth");

const nextMonth =
document.getElementById("nextMonth");

const selectedDate =
document.getElementById("selectedDate");

const selectedEvents =
document.getElementById("selectedEvents");


// ==========================
// LOAD SAVED DATA
// ==========================

const deadlines =
JSON.parse(
    localStorage.getItem("deadlines")
) || [];


const sessions =
JSON.parse(
    localStorage.getItem("studySessions")
) || [];


// ==========================
// CURRENT CALENDAR DATE
// ==========================

let currentDate = new Date();


// ==========================
// DISPLAY CALENDAR
// ==========================

function displayCalendar() {

    calendarDays.innerHTML = "";


    const year =
        currentDate.getFullYear();


    const month =
        currentDate.getMonth();


    // Month name

    monthYear.textContent =
        currentDate.toLocaleDateString(
            "en-US",
            {
                month: "long",
                year: "numeric"
            }
        );


    // First day of month

    const firstDay =
        new Date(
            year,
            month,
            1
        );


    // Last day of month

    const lastDay =
        new Date(
            year,
            month + 1,
            0
        );


    const numberOfDays =
        lastDay.getDate();


    // Convert Sunday = 0
    // to Monday = 0

    let startingDay =
        firstDay.getDay();


    if (startingDay === 0) {

        startingDay = 6;

    }

    else {

        startingDay--;

    }


    // ==========================
    // EMPTY DAYS
    // ==========================

    for (
        let i = 0;
        i < startingDay;
        i++
    ) {

        const emptyDay =
            document.createElement("div");


        emptyDay.classList.add(
            "calendar-day",
            "empty"
        );


        calendarDays.appendChild(
            emptyDay
        );

    }


    // ==========================
    // CREATE DAYS
    // ==========================

    for (
        let day = 1;
        day <= numberOfDays;
        day++
    ) {

        createCalendarDay(
            year,
            month,
            day
        );

    }

}


// ==========================
// CREATE CALENDAR DAY
// ==========================

function createCalendarDay(
    year,
    month,
    day
) {

    const dayElement =
        document.createElement("div");


    dayElement.classList.add(
        "calendar-day"
    );


    // ==========================
    // DAY DATE
    // ==========================

    const date =
        new Date(
            year,
            month,
            day
        );


    const dateString =
        getDateString(date);


    dayElement.dataset.date =
        dateString;


    // ==========================
    // DAY NUMBER
    // ==========================

    const dayNumber =
        document.createElement("span");


    dayNumber.classList.add(
        "day-number"
    );


    dayNumber.textContent =
        day;


    dayElement.appendChild(
        dayNumber
    );


    // ==========================
    // CHECK TODAY
    // ==========================

    const today =
        new Date();


    const todayString =
        getDateString(today);


    if (
        dateString ===
        todayString
    ) {

        dayElement.classList.add(
            "today"
        );

    }


    // ==========================
    // EVENT INDICATORS
    // ==========================

    const eventIndicators =
        document.createElement("div");


    eventIndicators.classList.add(
        "event-indicators"
    );


    // Deadlines

    const dayDeadlines =
        deadlines.filter(
            function(deadline) {

                return deadline.date ===
                    dateString;

            }
        );


    dayDeadlines.forEach(
        function(deadline) {

            const indicator =
                document.createElement("div");


            indicator.classList.add(
                "event-indicator",
                "deadline"
            );


            indicator.textContent =
                "📌 " +
                (
                    deadline.text ||
                    deadline.subject ||
                    "Deadline"
                );


            eventIndicators.appendChild(
                indicator
            );

        }
    );


    // Study sessions

    const daySessions =
        sessions.filter(
            function(session) {

                return session.date ===
                    dateString;

            }
        );


    daySessions.forEach(
        function(session) {

            const indicator =
                document.createElement("div");


            indicator.classList.add(
                "event-indicator",
                "session"
            );


            indicator.textContent =
                "📚 " +
                session.subject;


            eventIndicators.appendChild(
                indicator
            );

        }
    );


    dayElement.appendChild(
        eventIndicators
    );


    // ==========================
    // CLICK DAY
    // ==========================

    dayElement.addEventListener(
        "click",
        function() {

            displaySelectedDay(
                date
            );

        }
    );


    calendarDays.appendChild(
        dayElement
    );

}


// ==========================
// DISPLAY SELECTED DAY
// ==========================

function displaySelectedDay(date) {

    const dateString =
        getDateString(date);


    selectedDate.textContent =
        date.toLocaleDateString(
            "en-US",
            {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );


    selectedEvents.innerHTML = "";


    // ==========================
    // GET EVENTS
    // ==========================

    const dayDeadlines =
        deadlines.filter(
            function(deadline) {

                return deadline.date ===
                    dateString;

            }
        );


    const daySessions =
        sessions.filter(
            function(session) {

                return session.date ===
                    dateString;

            }
        );


    // ==========================
    // NO EVENTS
    // ==========================

    if (
        dayDeadlines.length === 0 &&
        daySessions.length === 0
    ) {

        const message =
            document.createElement("p");


        message.classList.add(
            "no-events"
        );


        message.textContent =
            "No events planned for this day.";


        selectedEvents.appendChild(
            message
        );


        return;

    }


    // ==========================
    // DISPLAY DEADLINES
    // ==========================

    dayDeadlines.forEach(
        function(deadline) {

            const event =
                document.createElement("div");


            event.classList.add(
                "calendar-event",
                "deadline-event"
            );


            const eventInfo =
                document.createElement("div");


            eventInfo.classList.add(
                "calendar-event-info"
            );


            const title =
                document.createElement("strong");


            title.textContent =
                "📌 " +
                (
                    deadline.text ||
                    deadline.subject ||
                    "Deadline"
                );


            const type =
                document.createElement("span");


            type.textContent =
                "Deadline";


            eventInfo.appendChild(
                title
            );

            eventInfo.appendChild(
                type
            );


            event.appendChild(
                eventInfo
            );


            selectedEvents.appendChild(
                event
            );

        }
    );


    // ==========================
    // DISPLAY STUDY SESSIONS
    // ==========================

    daySessions.forEach(
        function(session) {

            const event =
                document.createElement("div");


            event.classList.add(
                "calendar-event",
                "session-event"
            );


            const eventInfo =
                document.createElement("div");


            eventInfo.classList.add(
                "calendar-event-info"
            );


            const title =
                document.createElement("strong");


            title.textContent =
                "📚 " +
                session.subject;


            const topic =
                document.createElement("span");


            topic.textContent =
                session.topic;


            const time =
                document.createElement("small");


            time.textContent =
                "⏰ " +
                formatTime(
                    session.time
                );


            eventInfo.appendChild(
                title
            );

            eventInfo.appendChild(
                topic
            );

            eventInfo.appendChild(
                time
            );


            event.appendChild(
                eventInfo
            );


            selectedEvents.appendChild(
                event
            );

        }
    );

}


// ==========================
// DATE STRING
// ==========================

function getDateString(date) {

    const year =
        date.getFullYear();


    const month =
        String(
            date.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const day =
        String(
            date.getDate()
        ).padStart(
            2,
            "0"
        );


    return `${year}-${month}-${day}`;

}


// ==========================
// FORMAT TIME
// ==========================

function formatTime(time) {

    if (!time) {

        return "";

    }


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


// ==========================
// PREVIOUS MONTH
// ==========================

previousMonth.addEventListener(
    "click",
    function() {

        currentDate.setMonth(
            currentDate.getMonth() - 1
        );


        displayCalendar();


        selectedDate.textContent =
            "Select a day";


        selectedEvents.innerHTML = `
            <p class="no-events">
                Select a day to view your events.
            </p>
        `;

    }
);


// ==========================
// NEXT MONTH
// ==========================

nextMonth.addEventListener(
    "click",
    function() {

        currentDate.setMonth(
            currentDate.getMonth() + 1
        );


        displayCalendar();


        selectedDate.textContent =
            "Select a day";


        selectedEvents.innerHTML = `
            <p class="no-events">
                Select a day to view your events.
            </p>
        `;

    }
);


// ==========================
// INITIAL DISPLAY
// ==========================

displayCalendar();