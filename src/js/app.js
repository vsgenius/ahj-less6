import Controller from "./controller";

const controller= new Controller(document.querySelector('.col'));
controller.init()
const close = document.querySelectorAll('.close');

close.forEach((elem) =>{elem.addEventListener('click', (e)=> {
  console.log(e.target.parentElement.remove(e.target))
})});
document.body.addEventListener('mousedown', controller.onMouseDown);
document.body.addEventListener('mouseup', controller.onMouseUp);
document.body.addEventListener('mousemove', controller.onMouseMove);