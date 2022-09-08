const root = document.querySelector("#root");

/*  function createEl(tag, className, text, type, placeholder) {
  let el = document.createElement(tag);
  className ? el.classList.add(className) : null;
  text ? (el.innerText = text) : null;
  if (tag === "input") {
    type ? (el.type = type) : null;
    placeholder ? (el.placeholder = placeholder) : null;
  }
  return el;
}

 */

function createEl(tag, className, text) {
  let el = document.createElement(tag);
  text ? (el.innerText = text) : null;

  if (className) {
      let arr = className.split(' ');
      for (let elArr of arr) {
          el.classList.add(elArr);
      }
  }
  return el;
}


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

window.onload = function() {
  setInterval(function() {
    let date = new Date(),
    hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
    min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    document.getElementById("minSec").innerHTML = hour + ":" + min;
  }, 1000);
}




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
