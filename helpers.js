export function createEl(tag, className, text, type, placeholder) {
  let el = document.createElement(tag);
  text ? (el.innerText = text) : null;

  if (className) {
    let arr = className.split(" ");
    for (let elArr of arr) {
      el.classList.add(elArr);
    }
  }

  if (tag === "input" || tag === "textarea" || tag === "select") {
    type ? (el.type = type) : null;
    placeholder ? (el.placeholder = placeholder) : null;
  }
  return el;
}

export function getDate() {
  let d = new Date();

  let dd = d.getDate();
  if (dd < 10) dd = "0" + dd;

  let mm = d.getMonth() + 1;
  if (mm < 10) mm = "0" + mm;

  let yy = d.getFullYear();

  return dd + "." + mm + "." + yy;
}

export function randomInteger(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}