const calendar = document.querySelector(".calendar");
const slotHeight = 60;
const events = [
  {
    title: "Scrum meeting",
    start: "09:30",
    end: "11:00",
    color: "rgba(0, 123, 255, 0.8)",
  },
  {
    title: "Chill",
    start: "10:30",
    end: "12:00",
    color: "rgba(255, 193, 7, 0.8)",
  },
  {
    title: "Scrum",
    start: "01:00",
    end: "02:00",
    color: "rgba(40, 167, 69, 0.8)",
  },
  {
    title: "1:1",
    start: "01:045",
    end: "02:10",
    color: "rgba(108, 117, 125, 0.8)",
  },
  {
    title: "Client Call",
    start: "03:00",
    end: "04:00",
    color: "rgba(220, 53, 69, 0.8)",
  },
  {
    title: "Project Review",
    start: "03:30",
    end: "05:00",
    color: "rgba(108, 117, 125, 0.8)",
  },
  {
    title: "Conflict",
    start: "03:50",
    end: "05:45",
    color: "rgba(255, 193, 7, 0.8)",
  },
  {
    title: "Focus time",
    start: "06:00",
    end: "09:00",
    color: "rgba(255, 99, 132, 0.8)",
  },
];

function buildTimeSlot() {
  for (let idx = 0; idx < 13; idx++) {
    const timeSlot = document.createElement("div");
    timeSlot.className = "slot";

    const time = document.createElement("div");
    time.className = "time";

    time.innerText = `${idx}:00`;
    timeSlot.appendChild(time);
    calendar.appendChild(timeSlot);
  }
}

function timeToMinutes(time) {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
}

function renderEvents(events) {
  events.sort((a, b) => timeToMinutes(a.start) - timeToMinutes(b.start));

  let lastEnd = 0;
  let overlapCount = 0;

  events.forEach((event) => {
    const eventStartInMinutes = timeToMinutes(event.start);
    const eventEndInMinutes = timeToMinutes(event.end);

    const eventDiv = document.createElement("div");
    eventDiv.className = "event";

    eventDiv.style.backgroundColor = event.color;

    eventDiv.style.top = `${(eventStartInMinutes * slotHeight) / 60}px`;
    eventDiv.style.height = `${
      ((eventEndInMinutes - eventStartInMinutes) * slotHeight) / 60
    }px`;

    if (eventStartInMinutes < lastEnd) {
      //Increase the left width for overlpiing events
      overlapCount++;
    } else {
      overlapCount = 1;
    }

    const offsetLeft = 60 + (overlapCount - 1) * 40;
    eventDiv.style.left = `${offsetLeft}px`;

    eventDiv.innerText = event.title;
    calendar.appendChild(eventDiv);

    lastEnd = eventEndInMinutes;
  });
}

function init() {
  buildTimeSlot();
  renderEvents(events);
}
init();
