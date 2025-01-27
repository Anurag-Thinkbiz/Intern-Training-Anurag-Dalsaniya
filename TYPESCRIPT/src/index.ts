const getLocalstorage = <T>(key: string): T | null =>
  JSON.parse(localStorage.getItem(key) || "null");

const setLocatstorage = <T>(key: string, value: T): void => {
  const newValue: string = JSON.stringify(value);
  localStorage.setItem(key, newValue);
};

let allTasks: Dumy[] = getLocalstorage("Task") || [];

const form = document.getElementById("form") as HTMLFormElement | null;
const sorting = document.getElementById("sorting") as HTMLSelectElement | null;
const cardContainer = document.getElementsByClassName(
  "main-card"
)[0] as HTMLDivElement | null;
const clearAll = document.getElementsByClassName(
  "clearall-btn"
)[0] as HTMLButtonElement | null;
const editIcon = document.getElementsByClassName(
  "icon"
) as HTMLCollectionOf<HTMLElement>;
let modal = document.getElementById("myModal") as HTMLDivElement | null;
let btn = document.querySelector(
  ".add-task-button"
) as HTMLButtonElement | null;
let span = document.querySelector(".close") as HTMLButtonElement | null;
let closeBtn = document.querySelector(".close-btn") as HTMLButtonElement | null;
getLocalstorage("Task");
ToggleClearAllBtn();
(function () {
  getLocalstorage("Task");
  ToggleClearAllBtn();
  showAllTasks(allTasks);
})();
showAllTasks(allTasks);
type Dumy = {
  id: string;
  task: string;
  description: string;
  starttime: string;
  endtime: string;
  date: string;
  importanceLevel: "High" | "Medium" | "Low" | string;
  isCompleted: boolean;
  isMissed: boolean;
};

function addTask(e: Event, check: string): void {
  ToggleClearAllBtn();
  const subBtn = document.getElementsByClassName(
    "submit-btn"
  )[0] as HTMLButtonElement;
  subBtn.style.display = check !== "Edit" ? "block" : "none";

  try {
    let newTask: Dumy = {
      id: "",
      task: "",
      isCompleted: false,
      isMissed: false,
      description: "",
      starttime: "",
      endtime: "",
      date: "",
      importanceLevel: "Medium",
    };

    const id = generateId();
    newTask.id = id;

    const target = e.target as HTMLFormElement;

    for (let i = 0; i < target.length; i++) {
      const element = target[i] as HTMLInputElement;

      switch (element.name) {
        case "date":
          if (!element.value) throw new Error("Enter date");
          newTask.date = element.value;
          break;
        case "Task":
          if (!element.value) throw new Error("Enter Task");
          newTask.task = element.value;
          break;
        case "importance":
          if (element.checked && element.value == "Low")
            newTask.importanceLevel = "Low";
          if (element.checked && element.value == "High")
            newTask.importanceLevel = "High";
          else element.value = "Medium";
          break;
        case "starttime":
          newTask.starttime = element.value;
          break;
        case "endtime":
          newTask.endtime = element.value;
          break;
        case "description":
          if (!element.value) throw new Error("Enter Description");
          newTask.description = element.value;
          break;
        default:
          break;
      }
    }

    if (
      getTimeInMinutes(newTask.endtime) - getTimeInMinutes(newTask.starttime) <=
      0
    ) {
      throw new Error("Please select valid time");
    }

    const curDate: string = new Date().toISOString().split("T")[0];

    if (newTask.date < curDate) throw new Error("You cannot add previous day");
    if (curDate >= newTask.date && newTask.starttime <= getCurrentTimeStr()) {
      throw new Error("You cannot start Task after time");
    }
    if (
      checkConcurrency(
        newTask.starttime,
        newTask.endtime,
        newTask.date,
        newTask.id
      )
    ) {
      throw new Error("Task Already exists");
    }

    clearAllValueFromForm();

    allTasks.push(newTask);
    setLocatstorage("Task", allTasks);
    showAllTasks(allTasks);
    hideModal();

    if (clearAll) clearAll.style.display = "block";
  } catch (error) {
    if (error instanceof Error) {
      const errorEle = document.getElementById("error") as HTMLElement;
      errorEle.innerText = error.message;
      setTimeout(() => (errorEle.innerText = ""), 3000);
    }
  }
}

const generateId = (): string => {
  const allChar: string =
    "abcdefghijklmnopqrtsuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  let id: string = "";
  for (let i = 0; i < 5; i++) {
    id += allChar[Math.floor(Math.random() * allChar.length)];
  }
  return id;
};

function getValueByInputField(id: string, value: string): void {
  const inputElement = document.getElementById(id) as HTMLInputElement | null;
  if (inputElement) {
    inputElement.value = value;
  }
}
function clearAllValueFromForm(): void {
  getValueByInputField("Task", "");
  getValueByInputField("starttime", " ");
  getValueByInputField("endtime", " ");
  getValueByInputField("date", " ");
  getValueByInputField("description", " ");
}

function hideModal(): void {
  if (modal) modal.style.display = "none";
  if (form) form.style.display = "block";
}

function checkConcurrency(
  starttime: string,
  endtime: string,
  date: string,
  id: string
): boolean {
  for (const task of allTasks) {
    if (task.id === id) continue;
    if (task.date !== date) return false;
    if (task.starttime <= starttime && starttime < task.endtime) return true;
    else if (endtime > task.starttime && endtime <= task.endtime) return true;
    else if (starttime <= task.starttime && endtime >= task.endtime)
      return true;
  }
  return false;
}
let TempFormData: Event;
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    TempFormData = e;
    if (e.submitter) addTask(e, e.submitter.innerText);
  });
}

document
  .getElementsByClassName("edit-submit-btn")[0]
  .addEventListener("click", (e: Event) => {
    if (e instanceof MouseEvent) {
      const event = e.currentTarget as HTMLElement;
      if (e instanceof SubmitEvent && e.submitter) {
        addTask(TempFormData, e.submitter.innerText);
      }
    }
  });

function getTimeinHourMinFormat(startTime: string, endTime: string): string {
  const [startHour, startMin] = startTime.split(":").map(Number);
  const [endHour, endMin] = endTime.split(":").map(Number);
  let duration = endHour * 60 + endMin - (startHour * 60 + startMin);
  const durationHours = Math.floor(duration / 60);
  const durationMinutes = duration % 60;
  return `${durationHours}h-${durationMinutes}m`;
}
function ToggleClearAllBtn(): void {
  if (clearAll) {
    if (allTasks.length <= 0) clearAll.style.display = "none";
    else clearAll.style.display = "block";
  }
}

function getTimeInMinutes(time: string): number {
  const [hour, min] = time.split(":").map((e) => Number(e));
  return hour * 60 + min;
}

document
  .getElementsByClassName("add-task-button")[0]
  .addEventListener("click", () => {
    const taskForm = document.getElementById("form") as HTMLFormElement;
    taskForm.classList.toggle("hidden");
  });

if (btn) {
  btn.onclick = function openform() {
    if (modal) modal.style.display = "block";
  };
}
if (span) {
  span.onclick = function () {
    clearAllValueFromForm();
    const elemntSuBBtn = document.getElementsByClassName(
      "submit-btn"
    )[0] as HTMLElement;
    elemntSuBBtn.style.display = "block";
    const elementEditBtn = document.getElementsByClassName(
      "edit-submit-btn"
    )[0] as HTMLElement;
    elementEditBtn.style.display = "none";
    const addTaskTitle = document.getElementsByClassName(
      "add-task-title"
    )[0] as HTMLElement;
    addTaskTitle.textContent = "Add Task";
    hideModal();
  };
}

function editTask(e:MouseEvent): void {
  // console.log('edit');

  const element = e.currentTarget as HTMLElement;
  const [id1, ID] = element.id.split("-") as [string, string];

  const modal = document.querySelector(".modal") as HTMLElement;
  const form = document.querySelector(".form") as HTMLElement;
  const tempObj = getTaskFromStorage(ID);
  const eleID = ID;

  if (modal) modal.style.display = "block";
  if (form) form.style.display = "block";

  const date = document.getElementById("date") as HTMLInputElement;
  const starttime = document.getElementById("starttime") as HTMLInputElement;
  const endtime = document.getElementById("endtime") as HTMLInputElement;
  const task = document.getElementById("Task") as HTMLInputElement;
  const description = document.getElementById(
    "description"
  ) as HTMLInputElement;
  const low = document.getElementById("low") as HTMLInputElement;
  const medium = document.getElementById("medium") as HTMLInputElement;
  const high = document.getElementById("high") as HTMLInputElement;

  document.getElementsByClassName("add-task-title")[0].textContent =
    "Edit Task";
  date.value = tempObj[0].date;
  starttime.value = tempObj[0].starttime;
  endtime.value = tempObj[0].endtime;
  task.value = tempObj[0].task;
  description.value = tempObj[0].description;

  if (tempObj[0].importanceLevel === "Low") low.checked = true;
  else if (tempObj[0].importanceLevel === "Medium") medium.checked = true;
  else high.checked = true;

  const editButton = document.getElementsByClassName(
    "edit-submit-btn"
  )[0] as HTMLElement;
  const subBtn = document.getElementsByClassName(
    "submit-btn"
  )[0] as HTMLButtonElement;

  editButton.style.display = "block";
  subBtn.style.display = "none";

  editButton.addEventListener("click", function newEdit() {
    try {
      const index = getIndexFromID(eleID);
      const tempObject: Task = {
        task: task.value,
        description: description.value,
        starttime: starttime.value,
        endtime: endtime.value,
        date: date.value,
        importanceLevel: "Medium",
        id: eleID,
        isCompleted: false,
        isMissed: false,
      };

      if (low.checked) {
        getImportanceLevelValue("low", tempObject);
      } else if (high.checked) {
        getImportanceLevelValue("high", tempObject);
      } else {
        getImportanceLevelValue("medium", tempObject);
      }

      const curDate = new Date().toISOString().split("T")[0];

      if (
        curDate <= tempObject.date &&
        tempObject.starttime <= getCurrentTimeStr()
      ) {
        throw new Error("You cannot start Task after time");
      }

      if (!tempObject.task.trim()) throw new Error("Enter Task");
      if (!tempObject.description.trim()) throw new Error("Enter description");
      if (!tempObject.date.trim()) throw new Error("Enter valid date");

      if (tempObject.date < curDate)
        throw new Error("You cannot change previous day");

      if (
        getTimeInMinutes(tempObject.endtime) -
          getTimeInMinutes(tempObject.starttime) <=
        0
      ) {
        throw new Error("Please select valid time");
      }

      if (
        checkConcurrency(
          tempObject.starttime,
          tempObject.endtime,
          tempObject.date,
          tempObject.id
        )
      ) {
        throw new Error("Task Already exists");
      }
      tempObject.isCompleted = false;
      tempObject.isMissed = false;

      allTasks[index] = tempObject;

      setLocatstorage("Task", allTasks);
      showAllTasks(allTasks);

      hideModal();

      medium.checked = true;
      clearAllValueFromForm();

      document.querySelector(".add-task-title")!.textContent = "Add Task";
      document.querySelector(".edit-submit-btn")!.classList.add("hidden");
      document.querySelector(".submit-btn")!.classList.remove("hidden");

      editButton.removeEventListener("click", newEdit);
    } catch (error) {
      document.querySelector(".edit-submit-btn")!.classList.remove("hidden");
      document.querySelector(".submit-btn")!.classList.add("hidden");
      const errorElement = document.getElementById("error")!;
      errorElement.innerText = (error as Error).message;

      setTimeout(() => {
        errorElement.innerText = "";
      }, 3000);
    }
  });
}
document.getElementById('edit-')
function showAllTasks(data: Dumy[]): void {
  if (cardContainer) cardContainer.innerHTML = " ";
  for (let i = 0; i < data?.length; i++) {
    let duration = getTimeinHourMinFormat(data[i].starttime, data[i].endtime);
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `
    <div class="card" style="background:${changeBackground(
      data[i].importanceLevel,
      data[i].endtime
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
    : `<button onclick="editTask(event)" id="edit-${data[i].id}" style="
    background: none; border:none"><svg
fill="none"
height="24"
stroke="currentColor"
stroke-linecap="round"
stroke-linejoin="round"
stroke-width="2"
viewBox="0 0 24 24"
width="24"
xmlns="http://www.w3.org/2000/svg"
>
<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
</svg></button>`
}
<button id="delete-${data[i].id}"
  onclick="deleteTask(event)"  style="
    background: none; border:none"><svg
  fill="none"
  height="24"
  stroke="currentColor"
  stroke-linecap="round"
  stroke-linejoin="round"
  stroke-width="2"
  viewBox="0 0 24 24"
  width="24"
  xmlns="http://www.w3.org/2000/svg"
  
>
  <path d="M6 18L18 6M6 6l12 12" stroke="red" stroke-width="2" />
</svg></button>
${
  data[i].isCompleted
    ? ""
    : `<button id="complete-${data[i].id}"
      onclick="completeTask(event)" style="
    background: none; border:none">
    <svg
      fill="none"
      height="24"
      stroke="green"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      
    >
      <path d="M5 13l4 4L19 7" stroke="green" stroke-width="2" />
    </svg></button>`
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
    if (cardContainer) cardContainer.appendChild(newDiv);
  }
}
function getImportanceLevelValue(priority: string, tempObject: any) {
  const element = document.getElementById(priority) as HTMLInputElement;
  tempObject.importanceLevel = element.value;
  element.checked = false;
}
interface Task {
  task: string;
  description: string;
  starttime: string;
  endtime: string;
  date: string;
  importanceLevel: "Low" | "Medium" | "High";
  id: string;
  isCompleted: boolean;
  isMissed: boolean;
}

if (clearAll) {
  clearAll.addEventListener("click", () => {
    localStorage.removeItem("Task");
    allTasks = [];
    showAllTasks(allTasks);
    clearAll.style.display = "none";
  });
}
const priorityMap: Record<string, number> = {
  High: 1,
  Medium: 2,
  Low: 3,
};
function getCurrentTimeStr(): string {
  const currentTime: Date = new Date();
  const currentTimeStr: string =
    currentTime.getHours().toString().padStart(2, "0") +
    ":" +
    currentTime.getMinutes().toString().padStart(2, "0");
  return currentTimeStr;
}

function changeBackground(priority: string, endTask: string): string {
  if (endTask < getCurrentTimeStr()) return "red";
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
}

function getTaskFromStorage(id: string): Dumy[] {
  return allTasks.filter((ele: Dumy) => ele.id === id);
}

function getIndexFromID(id: string): number {
  return allTasks.findIndex((ele) => ele.id === id);
}

sorting?.addEventListener("change", function filterChange(): void {
  const filterValue: string = sorting.value;
  const tempTask: Dumy[] = allTasks;

  switch (filterValue) {
    case "Priority":
      tempTask.sort(
        (ele1, ele2) =>
          priorityMap[ele1.importanceLevel] - priorityMap[ele2.importanceLevel]
      );
      showAllTasks(tempTask);
      break;

    case "Day":
      "day";
      tempTask.sort(
        (ele1, ele2) =>
          new Date(ele1.date).getTime() - new Date(ele2.date).getTime()
      );
      showAllTasks(tempTask);
      break;

    case "Normal":
      showAllTasks(tempTask);
      break;

    default:
      showAllTasks(allTasks);
  }
});

function deleteTask(e: Event): void {
  const target = e.currentTarget as HTMLElement;
  const [id1, ID]: string[] = target.id.split("-").map(String);
  const index = getIndexFromID(ID);
  allTasks.splice(index, 1);
  setLocatstorage("Task", allTasks);
  showAllTasks(allTasks);
  if (allTasks.length <= 0 && clearAll) clearAll.style.display = "none";
}

function completeTask(e: Event): void {
  const target = e.currentTarget as HTMLElement;
  const [id1, ID]: string[] = target.id.split("-").map(String);
  const ele: number = getIndexFromID(ID);
  const tempObj: Dumy = allTasks[ele];
  tempObj.isCompleted = true;
  if (tempObj.isCompleted) {
    const eleTitle = document.getElementById(`task-name1-${ID}`) as HTMLElement;
    eleTitle.style.textDecoration = "line-through";
    const completeIcon = document.getElementById(
      `complete-${ID}`
    ) as HTMLElement;
    completeIcon.style.display = "none";
    const editIcon = document.getElementById(`edit-${ID}`) as HTMLElement;
    editIcon.style.display = "none";
  }
  allTasks[ele] = tempObj;
  setLocatstorage("Task", allTasks);
}
