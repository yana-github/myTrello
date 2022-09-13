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

//отрисовка при перезагрузке страницы

document.addEventListener("DOMContentLoaded", () => {
  allTasks = getStorage("AllTasks");
  render(
    allTasks.filter((el) => el.status === "toDo"),
    boardTodoList
  );
  render(
    allTasks.filter((el) => el.status === "isProgress"),
    boardProgressList
  );
  render(
    allTasks.filter((el) => el.status === "isDone"),
    boardDoneList
  );
  scoreCount();
});

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

//добавить новую карточку, забрать данные в ЛС

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
    if (!newCardTitle.value || !newCardDesc.value) {
      newCard.style.display = "none";
      return;
    }

    let newTask = {
      id: randomInteger(1, 500),
      date: getDate(),
      user: newCardSelect.value,
      title: newCardTitle.value,
      description: newCardDesc.value,
      status: "toDo", //по умолчанию для всех новых карточек
    };
    allTasks.push(newTask);
    setStorage("AllTasks", allTasks);
    newCard.style.display = "none";
    render(
      allTasks.filter((el) => el.status === "toDo"),
      boardTodoList
    );
    render(
      allTasks.filter((el) => el.status === "isProgress"),
      boardProgressList
    );
    render(
      allTasks.filter((el) => el.status === "isDone"),
      boardDoneList
    );
    scoreCount();
  });

  newCardNav.append(newCardSelect, newCardBtnNo, newCardBtnYes);
  newCard.append(newCardTitle, newCardDesc, newCardNav);
  root.append(newCard);
}

//удалить все карточки
function deleteDoneCards() {
  allTasks = allTasks.filter((el) => el.status !== "isDone");

  setStorage("AllTasks", allTasks);
  deactiveModal1();

  render(
    allTasks.filter((el) => el.status === "toDo"),
    boardTodoList
  );
  render(
    allTasks.filter((el) => el.status === "isProgress"),
    boardProgressList
  );
  render(
    allTasks.filter((el) => el.status === "isDone"),
    boardDoneList
  );
  scoreCount();
}

//удалить карточку
function deleteCard(e) {
  let delIndex = allTasks.findIndex(
    (el) => el.id === +e.target.closest("li").getAttribute("id")
  );
  allTasks.splice(delIndex, 1);
  setStorage("AllTasks", allTasks);
  render(
    allTasks.filter((el) => el.status === "toDo"),
    boardTodoList
  );
  render(
    allTasks.filter((el) => el.status === "isProgress"),
    boardProgressList
  );
  render(
    allTasks.filter((el) => el.status === "isDone"),
    boardDoneList
  );
  scoreCount();
}

//переместить карточку в другие колонки
function moveCard(e) {
  let moveIndex = allTasks.findIndex(
    (el) => el.id === +e.target.closest("li").getAttribute("id")
  );

  if (allTasks.filter((el) => el.status === "isProgress").length > 5) {
    activeModal2();
    return;
  }

  allTasks[moveIndex].status = "isProgress";

  setStorage("AllTasks", allTasks);
  render(
    allTasks.filter((el) => el.status === "toDo"),
    boardTodoList
  );
  render(
    allTasks.filter((el) => el.status === "isProgress"),
    boardProgressList
  );
  render(
    allTasks.filter((el) => el.status === "isDone"),
    boardDoneList
  );
  scoreCount();
}

function moveBackCard(e) {
  let moveIndex = allTasks.findIndex(
    (el) => el.id === +e.target.closest("li").getAttribute("id")
  );
  allTasks[moveIndex].status = "toDo";

  setStorage("AllTasks", allTasks);
  render(
    allTasks.filter((el) => el.status === "toDo"),
    boardTodoList
  );
  render(
    allTasks.filter((el) => el.status === "isProgress"),
    boardProgressList
  );
  render(
    allTasks.filter((el) => el.status === "isDone"),
    boardDoneList
  );
  scoreCount();
}

function moveFinalCard(e) {
  let moveIndex = allTasks.findIndex(
    (el) => el.id === +e.target.closest("li").getAttribute("id")
  );
  allTasks[moveIndex].status = "isDone";

  setStorage("AllTasks", allTasks);
  render(
    allTasks.filter((el) => el.status === "toDo"),
    boardTodoList
  );
  render(
    allTasks.filter((el) => el.status === "isProgress"),
    boardProgressList
  );
  render(
    allTasks.filter((el) => el.status === "isDone"),
    boardDoneList
  );
  scoreCount();
}

//создание модалки-1

let modal1 = createEl("div", "modal");
let modal1Wrap = createEl("div", "modal__wrap");
let modal1Text = createEl(
  "div",
  "modal__text",
  "Are you sure you want to delete all the tasks?"
);
let modal1Nav = createEl("div", "modal__navigation");
let modal1BtnNo = createEl("button", "new-card__btn", "Uh no");
modal1BtnNo.addEventListener("click", deactiveModal1);
let modal1BtnYes = createEl("button", "new-card__btn", "Yes please");
modal1BtnYes.addEventListener("click", deleteDoneCards);

modal1Nav.append(modal1BtnNo, modal1BtnYes);
modal1Wrap.append(modal1Text, modal1Nav);
modal1.append(modal1Wrap);
root.append(modal1);

//работа модалки

function activeModal1() {
  modal1.classList.add("modal_active");
}

function deactiveModal1() {
  modal1.classList.remove("modal_active");
}

//создание модалки-2

let modal2 = createEl("div", "modal");
let modal2Wrap = createEl("div", "modal__wrap");
let modal2Text = createEl(
  "div",
  "modal__text",
  "OMG finish at least one task before adding more"
);
let modal2Nav = createEl("div", "modal__navigation");
let modal2Btn = createEl("button", "new-card__btn", "OK then");
modal2Btn.addEventListener("click", deactiveModal2);

modal2Nav.append(modal2Btn);
modal2Wrap.append(modal2Text, modal2Nav);
modal2.append(modal2Wrap);
root.append(modal2);

function activeModal2() {
  modal2.classList.add("modal_active");
}

function deactiveModal2() {
  modal2.classList.remove("modal_active");
}

//счетчики задач для хедера в колонках

function scoreCount() {
  let scoreToDo = 0;
  let scoreIsProgress = 0;
  let scoreIsDone = 0;

  allTasks.forEach((el) => {
    if (el.status === "toDo") {
      scoreToDo++;
    } else if (el.status === "isProgress") {
      scoreIsProgress++;
    } else if (el.status === "isDone") {
      scoreIsDone++;
    }
  });

  boardTodoCount.innerText = scoreToDo;
  boardProgressCount.innerText = scoreIsProgress;
  boardDoneCount.innerText = scoreIsDone;
}

//отрисовка карточек из массива и прослушка на кнопки

function render(arr, list) {
  list.innerHTML = "";

  arr.forEach((el) => {
    let li = createEl("li", "card-item");
    li.id = el.id;

    let cardHeader = createEl("div", "card-header");
    let cardTitle = createEl("div", "card-header__title", el.title);
    let cardWrapBtn = createEl("div", "card-header__wrap-btn");

    let cardBody = createEl("div", "card-body");
    let cardDesc = createEl("div", "card-body__desc", el.description);

    let cardFooter = createEl("div", "card-footer");
    let cardUser = createEl("div", "card-footer__user", el.user);
    let cardTime = createEl("div", "card-footer__date", el.date);

    cardHeader.append(cardTitle, cardWrapBtn);
    cardBody.append(cardDesc);
    cardFooter.append(cardUser, cardTime);
    li.append(cardHeader, cardBody, cardFooter);
    list.append(li);

    //кнопки и стиль карточек в зависимости от статуса

    if (el.status === "toDo") {
      li.style.backgroundColor = "rgba(179, 249, 197, 0.944)";

      let cardEditBtn = createEl("button", "card-btn", "🖉");
      /*    cardEditBtn.addEventListener("click", editCard); */

      let cardDelBtn = createEl("button", "card-btn", "✖");
      cardDelBtn.addEventListener("click", deleteCard);

      let cardMoveBtn = createEl("button", "card-btn", "▶");
      cardMoveBtn.addEventListener("click", moveCard);

      cardWrapBtn.append(cardEditBtn, cardDelBtn);
      cardBody.append(cardMoveBtn);
    } else if (el.status === "isProgress") {
      li.style.backgroundColor = "lightgrey";

      let cardMoveBackBtn = createEl("button", "card-btn", "◀");
      cardMoveBackBtn.addEventListener("click", moveBackCard);

      let cardCompleteBtn = createEl("button", "card-btn", "✔");
      cardCompleteBtn.addEventListener("click", moveFinalCard);

      cardWrapBtn.append(cardMoveBackBtn, cardCompleteBtn);
    } else if (el.status === "isDone") {
      li.style.backgroundColor = "rgb(188, 212, 252)";

      let cardDeleteBtn = createEl("button", "card-btn", "✖");
      cardDeleteBtn.addEventListener("click", deleteCard);

      cardWrapBtn.append(cardDeleteBtn);
    }
  });
}

addBtn.addEventListener("click", addNewCard);
deleteAllBtn.addEventListener("click", activeModal1);

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
