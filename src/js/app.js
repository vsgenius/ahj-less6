import Card from "./card";

const close = document.querySelectorAll(".close");
document.querySelectorAll(".add-card").forEach((e) => {
  e.addEventListener("click", (event) => {
    if (!event.target.nextElementSibling || event.target.nextElementSibling.className !== 'add-text') {
      const input = document.createElement("input");
      input.className = "add-text";
      const btn = document.createElement("button");
      btn.textContent = "Add card";
      btn.className = "btn-add";
      btn.addEventListener("click", (e) => {
        const addText = e.target.parentElement.querySelector(".add-text");
        if (addText.value) {
          e.target.parentNode.append(Card.create(addText.value).element);
          addText.value = "";
        }
      });
      e.parentNode.insertBefore(input, e.nextSibling);
      input.parentNode.insertBefore(btn, input.nextSibling);
    } else {
      const input = e.parentNode.querySelector(".add-text");
      console.log(input);
      input.parentNode.removeChild(input);
      const btn = e.parentNode.querySelector(".btn-add");
      btn.parentNode.removeChild(btn);
    }
  });
});

// const onMouseDown = function (event) {
//   const ball = event.target;
//   //console.log(event.target.className);
//   if (event.target.className !== "draggable") {
//     return;
//   }
//   ball.style.position = "absolute";
//   ball.style.zIndex = 1000;
//   document.body.append(ball);

//   function moveAt(pageX, pageY) {
//     ball.style.left = pageX - ball.offsetWidth / 2 + "px";
//     ball.style.top = pageY - ball.offsetHeight / 2 + "px";
//   }
//   moveAt(event.pageX, event.pageY);
//   function onMouseMove(event) {
//     moveAt(event.pageX, event.pageY);
//   }
//   document.addEventListener("mousemove", onMouseMove);

//   ball.onmouseup = function (e) {
//     const col = document.elementFromPoint(
//       e.pageX + ball.offsetWidth / 2 + 1,
//       e.pageY
//     );
//     if (col.classList.contains("col")) {
//       ball.style.position = "";
//       ball.style.zIndex = 0;
//       col.appendChild(ball);
//       document.removeEventListener("mousemove", onMouseMove);
//       ball.onmouseup = null;
//     }
//   };
// };
// document.body.addEventListener("mousedown", onMouseDown);
// // document.body.addEventListener("mouseup", onMouseUp);
// // document.body.addEventListener("mousemove", onMouseMove);

close.forEach((elem) => {
  elem.addEventListener("click", (e) => {
    e.stopPropagation;
    e.target.parentElement.remove(e.target);
  });
});
const items = document.querySelector('.todo')

const itemsElement = items.querySelectorAll('.draggable');

const itemsProgress = document.querySelector('.progress')

const itemsElementProgress = items.querySelectorAll('.draggable');

const itemsDone = document.querySelector('.done')

const itemsElementDone = items.querySelectorAll('.draggable');

let actualelement;

const onMouseOver = (event) => {
  actualelement.style.top = event.clientY  + 'px';
  actualelement.style.left = event.clientX - 50+ 'px';

}
const onMouseUp = (e) => {
  const mouseUpItem = e.target;
  console.log(mouseUpItem.parentElement.className)
if (mouseUpItem.className==='col todo') items.appendChild(actualelement);
if (mouseUpItem.className==='col progress') itemsProgress.appendChild(actualelement);
if (mouseUpItem.className==='col done') itemsDone.appendChild(actualelement);
if (mouseUpItem.className==='draggable' && mouseUpItem.parentElement.className==='col todo')  items.insertBefore(actualelement,mouseUpItem);
if (mouseUpItem.className==='draggable' && mouseUpItem.parentElement.className==='col done')  itemsDone.insertBefore(actualelement,mouseUpItem);
if (mouseUpItem.className==='draggable' && mouseUpItem.parentElement.className==='col progress')  itemsProgress.insertBefore(actualelement,mouseUpItem);
  actualelement.classList.remove('dragged');
  actualelement = undefined;
  document.documentElement.removeEventListener('mouseup',onMouseUp)
  document.documentElement.removeEventListener('mouseover',onMouseOver)  
}

items.addEventListener('mousedown',(e)=> {
  e.preventDefault;
  actualelement = e.target;
  actualelement.classList.add('dragged');

  document.documentElement.addEventListener('mouseup',onMouseUp)
  document.documentElement.addEventListener('mouseover',onMouseOver)  
})
itemsProgress.addEventListener('mousedown',(e)=> {
  e.preventDefault;
  actualelement = e.target;
  actualelement.classList.add('dragged');

  document.documentElement.addEventListener('mouseup',onMouseUp)
  document.documentElement.addEventListener('mouseover',onMouseOver)  
})
itemsDone.addEventListener('mousedown',(e)=> {
  e.preventDefault;
  actualelement = e.target;
  actualelement.classList.add('dragged');

  document.documentElement.addEventListener('mouseup',onMouseUp)
  document.documentElement.addEventListener('mouseover',onMouseOver)  
})