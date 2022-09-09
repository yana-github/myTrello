import { createEl } from "./helpers.js";
import { getDate } from "./helpers.js";
import { randomInteger } from "./helpers.js";

const root = document.querySelector("#root");
const API = "https://jsonplaceholder.typicode.com/users";

let users = [];
let allTasks = [];

function setStorage(key, arr) {
  localStorage.setItem(key, JSON.stringify(arr));
}

function getStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

//получение юзеров из АПИ

async function getUsersApi() {
  const response = await fetch(API);
  if (response.ok) {
    let data = await response.json();
    users = data;

    /*       console.log(users); */
    setStorage("usersAPI", users);
  } else {
    console.log(response.status, response.statusText);
  }
}

getUsersApi();

//отправка задач в Сторадж

//получение задач из Сторадж

/* let todos = [];

function getName() {
  return JSON.parse(localStorage.getItem("todos")) ?? [];
}

function setName() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

document.addEventListener("DOMContentLoaded", () => {
  todos = getName();
  render(todos);
}); */

//добавить основные элементы
let container = createEl("div", "container");
let header = createEl("div", "header");
let h1 = createEl("h1", "header__title", "MyTrello");
let clock = createEl("div", "header__clock");
clock.id = "minSec";

let board = createEl("section", "board");
let boardRow = createEl("div", "board__row row");

let boardTodo = createEl("div", "board__item col-4 col-md-6 col-sm-12");
let boardTodoHeader = createEl("div", "board-header todo-header");
let boardTodoH2 = createEl("h2", "board-header__title", "Todo");
let boardTodoCount = createEl("span", "board-header__count", "0");
let boardTodoList = createEl("ul", "board-list");
let addBtn = createEl("button", "board-btn add-btn", "Add todo");

let boardProgress = createEl("div", "board__item col-4 col-md-6 col-sm-12");
let boardProgressHeader = createEl("div", "board-header progress-header");
let boardProgressH2 = createEl("h2", "board-header__title", "In Progress");
let boardProgressCount = createEl("span", "board-header__count", "0");
let boardProgressList = createEl("ul", "board-list");

let boardDone = createEl("div", "board__item col-4 col-md-6 col-sm-12");
let boardDoneHeader = createEl("div", "board-header done-header");
let boardDoneH2 = createEl("h2", "board-header__title", "Done");
let boardDoneCount = createEl("span", "board-header__count", "0");
let boardDoneList = createEl("ul", "board-list");
let deleteAllBtn = createEl("button", "board-btn delete-btn", "Delete All");

//часы

window.onload = function () {
  setInterval(function () {
    let date = new Date(),
      hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
      min =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    document.getElementById("minSec").innerHTML = hour + ":" + min;
  }, 1000);
};

//положить юзеров в селект

function addOption(oListbox, text, value) {
  users.forEach((i) => {
    let text = i.username;
    let value = i.username;
    let oOption = document.createElement("option");
    oOption.append(document.createTextNode(text));
    oOption.setAttribute("value", value);

    oListbox.append(oOption);
  });
}

//добавление новой карточки по кнопке Add

function addNewCard() {
  let newCard = createEl("div", "new-card__form");
  let newCardTitle = createEl(
    "input",
    "new-card__input-title",
    "",
    "",
    "Title"
  );
  let newCardDesc = createEl(
    "textarea",
    "new-card__input-desc",
    "",
    "",
    "Description"
  );
  let newCardNav = createEl("div", "new-card__navigation");
  let newCardSelect = createEl(
    "select",
    "new-card__select",
    "",
    "",
    "Select User"
  );

  addOption(newCardSelect);

  let newCardBtnNo = createEl("button", "new-card__btn", "Cancel");
  newCardBtnNo.addEventListener("click", () => {
    newCard.style.display = "none";
  });

  let newCardBtnYes = createEl("button", "new-card__btn", "Confirm");
  newCardBtnYes.addEventListener("click", () => {
    let newTask = {
      id: randomInteger(1, 500),
      date: getDate(),
      user: newCardSelect.value,
      title: newCardTitle.value,
      description: newCardDesc.value,
      isProgress: false,
      isDone: false,
    };
    allTasks.push(newTask);
    setStorage("AllTasks", allTasks);
    newCardTitle.value = "";
    newCardDesc.value = "";
/*     render(allTasks); */
  });


newCardNav.append(newCardSelect, newCardBtnNo, newCardBtnYes);
newCard.append(newCardTitle, newCardDesc, newCardNav);
root.append(newCard);
};

addBtn.addEventListener("click", addNewCard);

//вложенность DOM элементов
root.append(container);
container.append(header, board);
header.append(h1, clock);
board.append(boardRow);
boardRow.append(boardTodo, boardProgress, boardDone);
boardTodo.append(boardTodoHeader, boardTodoList, addBtn);
boardTodoHeader.append(boardTodoH2, boardTodoCount);
boardProgress.append(boardProgressHeader, boardProgressList);
boardProgressHeader.append(boardProgressH2, boardProgressCount);
boardDone.append(boardDoneHeader, boardDoneList, deleteAllBtn);
boardDoneHeader.append(boardDoneH2, boardDoneCount);