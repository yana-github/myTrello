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