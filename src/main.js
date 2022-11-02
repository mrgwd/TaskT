const plus = document.getElementById("plus");
const currentTask = document.getElementById("current-task");
const tasks = document.getElementById("tasks");
const protoTask = document.querySelector(".proto-task");
let bins = document.querySelectorAll(".bin");
let edit = document.querySelectorAll(".edit");
let tasksDone = document.querySelectorAll(".checker");
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

for (let task in Object.keys(localStorage)) {
  let existsTask = protoTask.cloneNode(false);
  existsTask.innerHTML = localStorage.getItem(Object.keys(localStorage)[task]);
  existsTask.classList.remove("hidden", "opacity-0");
  tasks.append(existsTask);
  bins = document.querySelectorAll(".bin");
  edit = document.querySelectorAll(".edit");
  tasksDone = document.querySelectorAll(".checker");
}

let addTask = () => {
  let newTask = protoTask.cloneNode(true);
  currentTask.value.length !== 0 && currentTask.value.trim() !== ""
    ? (([
        newTask.firstElementChild.lastElementChild.innerHTML,
        currentTask.value,
      ] = [currentTask.value.trim(), ""]),
      newTask.classList.remove("hidden"),
      window.localStorage.setItem(
        newTask.firstElementChild.lastElementChild.innerHTML,
        newTask.innerHTML
      ),
      tasks.append(newTask),
      setTimeout(() => {
        newTask.classList.replace("opacity-0", "opacity-100");
      }, 300))
    : 0;
};
let deleteTask = () => {
  bins.forEach((bin) => {
    bin.addEventListener("click", function () {
      localStorage.removeItem(
        bin.parentElement.previousElementSibling.lastElementChild.innerText
      );
      bin.parentElement.parentElement.style.opacity = 0;
      setTimeout(() => {
        bin.parentElement.parentElement.remove();
      }, 400);
      bins = document.querySelectorAll(".bin");
      tasksDone = document.querySelectorAll(".checker");
    });
  });
};

let editTask = () => {
  edit.forEach((p) => {
    p.addEventListener("click", () => {
      let popup = document.createElement("div");
      popup.innerHTML = `
                        <div class="absolute z-20 top-0 left-0 transition duration-300 h-screen w-screen opacity-0">
                          <div class="h-screen w-screen bg-black opacity-25"></div>
                          <div class="z-30 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/4 w-5/6 md:w-3/5 bg-white rounded-2xl opacity-100">
                            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <div class="flex flex-col items-center md:flex-row">
                              <input class="bg-transparent outline-none w-56 text-2xl text-teal-800 border-b-2" type="text" name="editedTask" id="">
                              <button type="button" class="transition duration-300 border-2 border-teal-800 hover:border-transparent bg-transparent hover:bg-teal-800 text-teal-800 hover:text-white focus:outline-none mt-4 md:mt-0 md:ml-4 font-medium rounded-full text-md px-5 py-1 sm:py-1.5 text-center dark:bg-green-600 dark:hover:bg-green-700">Save</button>
                            </div>
                            </div>
                          </div>
                        </div>
`;
      let oldLSKey =
        p.parentElement.previousElementSibling.lastElementChild.innerText;
      popup.firstElementChild.firstElementChild.addEventListener(
        "click",
        () => {
          popup.remove();
        }
      );
      popup.firstElementChild.lastElementChild.lastElementChild.firstElementChild.lastElementChild.addEventListener(
        "click",
        () => {
          p.parentElement.previousElementSibling.lastElementChild.innerText =
            popup.firstElementChild.lastElementChild.lastElementChild.firstElementChild.firstElementChild.value;
          popup.remove();
          window.localStorage.removeItem(oldLSKey);
          window.localStorage.setItem(
            p.parentElement.previousElementSibling.lastElementChild.innerText,
            p.parentElement.parentElement.innerHTML
          );
        }
      );
      popup.firstElementChild.lastElementChild.lastElementChild.firstElementChild.firstElementChild.addEventListener(
        "keyup",
        function (e) {
          e.key === "Enter"
            ? ((p.parentElement.previousElementSibling.lastElementChild.innerText =
                popup.firstElementChild.lastElementChild.lastElementChild.firstElementChild.firstElementChild.value),
              popup.remove(),
              window.localStorage.removeItem(oldLSKey),
              window.localStorage.setItem(
                p.parentElement.previousElementSibling.lastElementChild
                  .innerText,
                p.parentElement.parentElement.innerHTML
              ))
            : 0;
        }
      );
      popup.firstElementChild.lastElementChild.lastElementChild.firstElementChild.firstElementChild.value =
        p.parentElement.previousElementSibling.lastElementChild.innerText;
      document.body.append(popup);
      setTimeout(() => {
        popup.firstElementChild.classList.replace("opacity-0", "opacity-100");
      }, 300);
    });
  });
};

let ifTaskIsDone = () => {
  tasksDone.forEach((task) => {
    task.addEventListener("click", () => {
      task.toggleAttribute("taskIsDone");
      task.classList.toggle("text-teal-800");
      task.classList.toggle("text-gray-500");
      task.nextElementSibling.classList.toggle("text-teal-800");
      task.nextElementSibling.classList.toggle("text-gray-500");
      if (task.hasAttribute("taskIsDone")) {
        task.firstElementChild.innerText = "done";
        task.lastElementChild.innerHTML = `<del>${task.lastElementChild.innerText}</del>`;
        window.localStorage.setItem(
          task.lastElementChild.firstElementChild.innerHTML,
          task.parentElement.innerHTML
        );
        document.querySelector("audio").play();
      } else {
        task.firstElementChild.innerText = "radio_button_unchecked";
        task.lastElementChild.innerHTML =
          task.lastElementChild.firstElementChild.innerText;
        window.localStorage.setItem(
          task.lastElementChild.innerHTML,
          task.parentElement.innerHTML
        );
      }
    });
  });
};

currentTask.addEventListener("keyup", function (e) {
  e.key === "Enter" ? addTask() : 0;
  bins = document.querySelectorAll(".bin");
  edit = document.querySelectorAll(".edit");
  tasksDone = document.querySelectorAll(".checker");
  ifTaskIsDone();
  deleteTask();
  editTask();
});

plus.addEventListener("click", () => {
  addTask();
  bins = document.querySelectorAll(".bin");
  edit = document.querySelectorAll(".edit");
  tasksDone = document.querySelectorAll(".checker");
  ifTaskIsDone();
  deleteTask();
  editTask();
});
ifTaskIsDone();
deleteTask();
editTask();

document.getElementById("month").innerText = months[new Date().getMonth()];
document.getElementById("day-name").innerText = days[new Date().getDay()];
document.getElementById("day-number").innerText = new Date().getDate();
