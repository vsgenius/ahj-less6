import { load } from "./loadcard";
import { addelements } from "./addcard";

let todo = ["Посмотреть видео", "сделать дз", "сдать ДЗ"];
let inprogress = ["Посмотреть видео","прочитать ДЗ"];
let done = [];

load(todo, "todo");
load(inprogress, "inprogress");
load(done, "done");
const items_todo = document.querySelector("#todo");
const items_progress = document.querySelector("#inprogress");
const items_done = document.querySelector("#done"); 
let actualElements;
const onMouseUp = (e) => {
  const mouseUpItem = e.target;
  console.log(e.toElement)
  if (e.toElement.parentElement.id==='todo') {
    items_todo.insertBefore(actualElements, mouseUpItem);
  } else if (e.toElement.parentElement.id==='inprogress') {
    items_progress.insertBefore(actualElements, mouseUpItem);
  } else if (e.toElement.parentElement.id==='done') {
    items_done.insertBefore(actualElements, mouseUpItem);
  } else if (e.toElement.id==='todo') {
    items_todo.appendChild(actualElements, mouseUpItem);
  } else if (e.toElement.id==='inprogress') {
    items_progress.appendChild(actualElements, mouseUpItem);
  } else if (e.toElement.id==='done') {
    items_done.appendChild(actualElements, mouseUpItem);
  }
  actualElements.classList.remove("dragged");
  actualElements = undefined;
  document.documentElement.removeEventListener("mouseup", onMouseUp);
  document.documentElement.removeEventListener("mouseover", onMouseOver);
};
const onMouseOver = (e) => {
  e.preventDefault;
  actualElements.style.top = e.clientY + "px";
  actualElements.style.left = e.clientX + "px";
};
items_todo.addEventListener("mousedown", (e) => {
  e.preventDefault;
  actualElements = e.target;
  actualElements.classList.add("dragged");
  document.documentElement.addEventListener("mouseup", onMouseUp);
  document.documentElement.addEventListener("mouseover", onMouseOver);
});
items_progress.addEventListener("mousedown", (e) => {
    e.preventDefault;
    actualElements = e.target;
    actualElements.classList.add("dragged");
    document.documentElement.addEventListener("mouseup", onMouseUp);
    document.documentElement.addEventListener("mouseover", onMouseOver);
  });
items_done.addEventListener("mousedown", (e) => {
    e.preventDefault;
    actualElements = e.target;
    actualElements.classList.add("dragged");
    document.documentElement.addEventListener("mouseup", onMouseUp);
    document.documentElement.addEventListener("mouseover", onMouseOver);
  });
