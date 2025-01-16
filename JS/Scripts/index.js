const getLocalstorage = (key) => JSON.parse(localStorage.getItem(key));

const setLocatstorage = (key, value) => {
  const newValue = JSON.stringify(value);
  localStorage.setItem(key, newValue);
};

let allTasks = getLocalstorage("Task") || [];

const generateId = () => {
  const allChar =
    "abcdefghijklmnopqrtsuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  let id = "";
  for (let i = 0; i < 5; i++) {
    id += allChar[Math.floor(Math.random() * allChar.length)];
  }
  return id;
};

function checkConcurrency(starttime, endtime, date, id) {
  console.log("con");
  console.log(id);

  for (const task of allTasks) {
    if (
      task.starttime <= starttime &&
      starttime < task.endtime &&
      task.date === date
    ) {
      console.log("first end");

      return task.id !== id && true;
    } else if (
      endtime > task.startTime &&
      endtime <= task.endTime &&
      task.date === date
    ) {
      console.log("second");

      return true;
    } else if (
      starttime <= task.startTime &&
      endtime >= task.endTime &&
      task.date === date
    ) {
      console.log("third");
      return true;
    }
  }
  return false;
}
function getTimeinHourMinFormat(startTime, endTime) {
  const [startHour, startMin] = startTime.split(":").map(Number);
  const [endHour, endMin] = endTime.split(":").map(Number);

  const start_Time = startHour * 60 + startMin;
  const end_Time = endHour * 60 + endMin;

  let duration = end_Time - start_Time;

  const durationHours = Math.floor(duration / 60);
  const durationMinutes = duration % 60;

  return `${durationHours}h-${durationMinutes}m`;
}
function addTask(e) {
  if (allTasks.length <= 0) {
    document.getElementsByClassName("clearall-btn")[0].style.display = "none";
  }else{
    document.getElementsByClassName("clearall-btn")[0].style.display = "block";
  }
  try {
    let newTask = {};
    const id = generateId();
    newTask.id = id;
    for (let i = 0; i < e.target.length; i++) {
      if (e.target[i].name === "date") {
        if (
          e.target[i].value == undefined ||
          e.target[i].value == null ||
          e.target[i].value == "" ||
          e.target[i].value == " "
        )
          throw Error("Enter Task");
        newTask.date = e.target[i].value;
      } else if (e.target[i].name === "Task") {
        if (
          e.target[i].value == undefined ||
          e.target[i].value == null ||
          e.target[i].value == "" ||
          e.target[i].value == " "
        )
          throw Error("Enter Task");
        newTask.task = e.target[i].value;
      } else if (e.target[i].name === "importance")
        if (e.target[i].checked) {
          console.log(e.target[i].checked);

          newTask.importanceLevel = e.target[i].value;
        } else {
          newTask.importanceLevel = "Medium";
        }
      else if (e.target[i].name === "starttime")
        newTask.starttime = e.target[i].value;
      else if (e.target[i].name === "endtime")
        newTask.endtime = e.target[i].value;
      else if (e.target[i].name === "description")
        newTask.description = e.target[i].value;
    }
    if (
      getTimeInMinutes(newTask.endtime) - getTimeInMinutes(newTask.starttime) <=
      0
    ) {
      throw Error("Please select valid time");
    }

    const curtime = new Date();
    const currentTimeStr =
      curtime.getHours().toString().padStart(2, "0") +
      ":" +
      curtime.getMinutes().toString().padStart(2, "0");
    if (newTask.starttime <= currentTimeStr)
      throw Error("You can start Task after time");

    let curDate = new Date().toISOString().split("T")[0];
    if (newTask.date < curDate) throw Error("You cannot add previos day");
    if (checkConcurrency(newTask.starttime, newTask.endtime, newTask.date)) {
      throw Error("Task Already exists");
    }

    newTask.isCompleted = false;
    newTask.isMissed = false;
    document.getElementById("Task").value = "";
    document.getElementById("starttime").value = "00:00";
    document.getElementById("endtime").value = "00:00";
    document.getElementById("date").value = "yyyy-MM-dd";
    document.getElementById("description").value = "";
    console.log(newTask);

    allTasks.push(newTask);
    setLocatstorage("Task", allTasks);
    showAllTasks(allTasks);
  } catch (error) {
    document.getElementById("error").innerText = error.message;
    setTimeout(() => (document.getElementById("error").innerText = " "), 3000);
  }
}
document
  .getElementsByClassName("add-task-button")[0]
  .addEventListener("click", () => {
    const taskForm = document.getElementById("form");
    taskForm.style.display =
      taskForm.style.display === "none" || taskForm.style.display === ""
        ? "block"
        : "none";
  });

const changeBackground = (priority, endTask) => {
  const curtime = new Date();
  const currentTimeStr =
    curtime.getHours().toString().padStart(2, "0") +
    ":" +
    curtime.getMinutes().toString().padStart(2, "0");
  if (endTask < currentTimeStr) return "red";
  else {
    switch (priority) {
      case "High":
        return "#A3D8FF";

      case "Medium":
        return "#64B5F6";

      default:
        return "#1976D2";
    }
  }
};

let form, cardContainer, clearAll, editIcon, sorting;
(function () {
  form = document.getElementById("form");
  sorting = document.getElementById("sorting");
  cardContainer = document.getElementsByClassName("main-card")[0];
  clearAll = document.getElementsByClassName("clearall-btn")[0];
  editIcon = document.getElementsByClassName("icon");
  getLocalstorage("Task");
  if (allTasks.length <= 0) {
    document.getElementsByClassName("clearall-btn")[0].style.display = "none";
  }else{
    document.getElementsByClassName("clearall-btn")[0].style.display = "block";
  }
  showAllTasks(allTasks);
})();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTask(e);
});

function showAllTasks(data) {
  cardContainer.innerHTML = " ";
  // console.log(data?.length);

  for (let i = 0; i < data?.length; i++) {
    let duration = getTimeinHourMinFormat(data[i].starttime, data[i].endtime);
    const newDiv = document.createElement("div");
    // newDiv.classList.add("card");
    newDiv.innerHTML = `
          <div class="card" style="background:${changeBackground(
            data[i].importanceLevel,
            data[i].endTime
          )};">
  <div class="icon-task-container">
    <div
  class="task-name1"
  id="task-name1-${data[i].id}"
  title="${data[i].task}"
  style="${data[i].isCompleted ? "text-decoration: line-through;" : ""}"
>
  ${data[i].task}
</div>
    <div class="icons">
      ${
        data[i].isCompleted
          ? " "
          : `<svg
      fill="none"
      height="24"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      id="edit-${data[i].id}"
      onclick="editTask(event)"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>`
      }

  
      <svg
        fill="none"
        height="24"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
        id="delete-${data[i].id}"
        onclick="deleteTask(event)"
      >
        <path d="M6 18L18 6M6 6l12 12" stroke="red" stroke-width="2" />
      </svg>
      ${
        data[i].isCompleted
          ? ""
          : `<svg
            fill="none"
            height="24"
            stroke="green"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
            id="complete-${data[i].id}"
            onclick="completeTask(event)"
          >
            <path d="M5 13l4 4L19 7" stroke="green" stroke-width="2" />
          </svg>`
      }
      </div>
    </div>
          <p class="description">${data[i].description}</p>
      <div class="task-date"> Date: ${data[i].date}</div>
      <div class="task-time"> Start: ${data[i].starttime}</div>
      <div class="task-time">End: ${data[i].endtime}</div>
      <div class="task-duration">Duration: ${duration}</div>
    </div>
        `;
    cardContainer.appendChild(newDiv);
  }
}

clearAll.addEventListener("click", () => {
  localStorage.removeItem("Task");
  document.getElementById("Task").value = "";
  document.getElementById("starttime").value = "00:00";
  document.getElementById("endtime").value = "00:00";
  document.getElementById("date").value = "1970-01-01";
  allTasks = [];
  showAllTasks(allTasks);
});

const getTaskFromStorage = (id) => {
  return allTasks.filter((ele) => ele.id === id);
};

const getIndexFromID = (id) => {
  return allTasks.findIndex((ele) => ele.id === id);
};

function editTask(e) {
  const [id1, ID] = e.currentTarget.id.split("-");
  const tempObj = getTaskFromStorage(ID);
  console.log(ID);
  const eleID = ID;

  document.getElementById("date").value = tempObj[0].date;
  document.getElementById("starttime").value = tempObj[0].starttime;
  document.getElementById("endtime").value = tempObj[0].endtime;
  document.getElementById("Task").value = tempObj[0].task;
  document.getElementById("description").value = tempObj[0].description;

  if (tempObj[0].importanceLevel === "Low")
    document.getElementById("low").checked = true;
  else if (tempObj[0].importanceLevel === "Medium")
    document.getElementById("medium").checked = true;
  else document.getElementById("high").checked = true;

  const editButton = document.getElementsByClassName("edit-submit-btn")[0];
  editButton.disabled = false;
  const submitButton = document.getElementsByClassName("submit-btn")[0];
  submitButton.disabled = true;
  if (submitButton.disabled || editButton.disabled) {
    submitButton.style.background = "#222";
    submitButton.style.color = "#333";
  }

  editButton.addEventListener("click", function newEdit() {
    try {
      const index = getIndexFromID(eleID);
      console.log(index + "edit first");
      const tempObject = {
        task: document.getElementById("Task").value,
        description: document.getElementById("description").value,
        starttime: document.getElementById("starttime").value,
        endtime: document.getElementById("endtime").value,
        date: document.getElementById("date").value,
        importanceLevel: "",
        id: eleID,
      };
      if (document.getElementById("low").checked) {
        tempObject.importanceLevel = document.getElementById("low").value;
        document.getElementById("low").checked = false;
      } else if (document.getElementById("high").checked) {
        tempObject.importanceLevel = document.getElementById("high").value;
        document.getElementById("high").checked = false;
      } else {
        tempObject.importanceLevel = document.getElementById("medium").value;
        document.getElementById("medium").checked = false;
      }
      document.getElementsByClassName("submit-btn")[0].disabled = false;
      document.getElementsByClassName("edit-submit-btn")[0].disabled = true;

      let curDate = new Date().toISOString().split("T")[0];
      if (submitButton.disabled === false || editButton.disabled === false) {
        submitButton.style.background = "#000";
        submitButton.style.color = "#fff";
      }
      const curtime = new Date();
      const currentTimeStr =
        curtime.getHours().toString().padStart(2, "0") +
        ":" +
        curtime.getMinutes().toString().padStart(2, "0");
      if (tempObject.starttime <= currentTimeStr)
        throw Error("You cannot start Task after time");

      if (
        tempObject.task == undefined ||
        tempObject.task == null ||
        tempObject.task == "" ||
        tempObject.task == " "
      )
        throw Error("Enter Task");
      if (
        tempObject.description == undefined ||
        tempObject.description == null ||
        tempObject.description == "" ||
        tempObject.description == " "
      )
        throw Error("Enter description");
      if (
        tempObject.date == undefined ||
        tempObject.date == null ||
        tempObject.date == "" ||
        tempObject.date == " "
      )
        throw Error("Enter valid date");

      if (tempObject.date < curDate)
        throw Error("You cannot change previos day");

      if (
        getTimeInMinutes(tempObject.endtime) -
          getTimeInMinutes(tempObject.starttime) <=
        0
      ) {
        throw Error("Please select valid time");
      }

      if (
        checkConcurrency(
          tempObject.starttime,
          tempObject.endtime,
          tempObject.date,
          tempObject.id
        )
      ) {
        throw Error("Task Already exists");
      }
      allTasks[index] = tempObject;
      document.getElementById("Task").value = "";
      document.getElementById("description").value = "";
      document.getElementById("starttime").value = "00:00";
      document.getElementById("endtime").value = "00:00";
      document.getElementById("date").value = "yyyy-MM-dd";

      setLocatstorage("Task", allTasks);
      showAllTasks(allTasks);
      editButton.removeEventListener("click", newEdit);
    } catch (error) {
      document.getElementById("error").innerText = error.message;
      setTimeout(() => (document.getElementById("error").innerText = ""), 3000);
    }
  });
}

const priorityMap = {
  High: 1,
  Medium: 2,
  Low: 3,
};
function getTimeInMinutes(time) {
  const [hour, min] = time.split(":");
  return hour * 60 + min;
}
sorting.addEventListener("change", function filterChange() {
  const filterValue = sorting.value;
  const tempTask = allTasks;
  console.log(filterValue);

  switch (filterValue) {
    case "Priority":
      tempTask.sort(
        (ele1, ele2) =>
          priorityMap[ele1.importanceLevel] - priorityMap[ele2.importanceLevel]
      );
      showAllTasks(tempTask);
      break;

    case "Day":
      console.log("day");
      tempTask.sort((ele1, ele2) => new Date(ele1.date) - new Date(ele2.date));
      // console.log(tempTask);
      showAllTasks(tempTask);
      break;

    case "Normal":
      showAllTasks(tempTask);
      break;

    default:
      showAllTasks(allTasks);
  }
});

function deleteTask(e) {
  const [id1, ID] = e.currentTarget.id.split("-");
  const index = getIndexFromID(ID);
  allTasks.splice(index, 1);
  setLocatstorage("Task", allTasks);
  showAllTasks(allTasks);

  document.getElementById("Task").value = "";
  document.getElementById("description").value = "";
  document.getElementById("starttime").value = "00:00";
  document.getElementById("endtime").value = "00:00";
  document.getElementById("date").value = "yyyy-MM-dd";

  const submitButton = (document.getElementsByClassName(
    "submit-btn"
  )[0].disabled = false);
  const editButton = (document.getElementsByClassName(
    "edit-submit-btn"
  )[0].disabled = true);

  if (submitButton.disabled === false || editButton.disabled === false) {
    submitButton.style.background = "#000";
    submitButton.style.color = "#fff";
  }
  if (allTasks.length <= 0) {
    document.getElementsByClassName("clearall-btn")[0].style.display = "none";
  }
}
function completeTask(e) {
  const [id1, ID] = e.currentTarget.id.split("-");
  const ele = getIndexFromID(ID);

  const tempObj = allTasks[ele];

  tempObj.isCompleted = true;

  console.log(ID);

  if (tempObj.isCompleted) {
    document.getElementById(`task-name1-${ID}`).style.textDecoration =
      "line-through";
    document.getElementById(`complete-${ID}`).style.display = "none";
    document.getElementById(`edit-${ID}`).style.display = "none";
  }

  allTasks[ele] = tempObj;
  setLocatstorage("Task", allTasks);
}
