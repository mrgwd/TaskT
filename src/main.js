//
const plusTask = document.querySelector(".plus-task");
const protoTask = document.querySelector(".proto-task");
const tasks = document.querySelector(".tasks");
const currentTask = document.getElementById("current-task");
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function addTask() {
  if (currentTask.value.length !== 0 && currentTask.value.trim() !== "") {
    let newTask = protoTask.cloneNode(true);
    newTask.firstElementChild.children[1].innerHTML = currentTask.value.trim();
    currentTask.value = "";
    newTask.classList.remove("hidden");
    tasks.append(newTask);
    setTimeout(function () {
      newTask.classList.replace("opacity-0", "opacity-100");
    }, 200);
  }
}
currentTask.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});
plusTask.addEventListener("click", addTask);

currentTask.addEventListener("blur", upbins);
currentTask.addEventListener("blur", taskDone);

function upbins() {
  let bins = document.querySelectorAll(".bin");
  bins.forEach((bin) => {
    bin.addEventListener("click", function () {
      bin.parentElement.style.opacity = 0;
      setTimeout(function () {
        bin.parentElement.remove();
      }, 400);
    });
  });
}

function taskDone() {
  let tasksDone = document.querySelectorAll(".checker");
  tasksDone.forEach((task) => {
    task.addEventListener("click", () => {
      task.classList.toggle("clicked");
      task.parentElement.classList.toggle("text-teal-800");
      task.parentElement.classList.toggle("text-gray-500");
      if (task.classList.contains("clicked")) {
        task.firstElementChild.innerText = "done";
        task.lastElementChild.innerHTML = `<del>${task.lastElementChild.innerText}</del>`;
        document.querySelector("audio").play();
      } else {
        task.firstElementChild.innerText = "radio_button_unchecked";
        task.lastElementChild.innerHTML =
          task.lastElementChild.firstElementChild.innerText;
      }
    });
  });
}

document.getElementById("month").innerText = months[new Date().getMonth()];
document.getElementById("day-name").innerText = days[new Date().getDay()];
document.getElementById("day-number").innerText = new Date().getDate();
