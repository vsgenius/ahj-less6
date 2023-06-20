import Card from "./card";

const close = document.querySelectorAll(".close");
document.querySelectorAll(".add-card").forEach((e) => {
  e.addEventListener("click", (event) => {
    console.log(event.target.nextElementSibling.className)
    if (event.target.nextElementSibling.className !== 'add-text') {
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

const onMouseDown = function (event) {
  const ball = event.target;
  //console.log(event.target.className);
  if (event.target.className !== "draggable") {
    return;
  }
  ball.style.position = "absolute";
  ball.style.zIndex = 1000;
  document.body.append(ball);

  function moveAt(pageX, pageY) {
    ball.style.left = pageX - ball.offsetWidth / 2 + "px";
    ball.style.top = pageY - ball.offsetHeight / 2 + "px";
  }
  moveAt(event.pageX, event.pageY);
  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }
  document.addEventListener("mousemove", onMouseMove);

  ball.onmouseup = function (e) {
    const col = document.elementFromPoint(
      e.pageX + ball.offsetWidth / 2 + 1,
      e.pageY
    );
    if (col.classList.contains("col")) {
      ball.style.position = "";
      ball.style.zIndex = 0;
      col.appendChild(ball);
      document.removeEventListener("mousemove", onMouseMove);
      ball.onmouseup = null;
    }
  };
};
document.body.addEventListener("mousedown", onMouseDown);
// document.body.addEventListener("mouseup", onMouseUp);
// document.body.addEventListener("mousemove", onMouseMove);

close.forEach((elem) => {
  elem.addEventListener("click", (e) => {
    e.target.parentElement.remove(e.target);
  });
});
