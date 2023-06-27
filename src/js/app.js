class Card {
	#el;
	#styles;

	constructor(element) {
		this.#el = element;
		this.#styles = window.getComputedStyle(element);
	}

	clear() {
		this.#el.remove()
	}

	set styles(text) {
		this.#el.style.cssText = text;
	}

	get styles() {
		return this.#styles;
	}

	get proection() {
		return (() => {
			const d = document.createElement('div');
			d.classList.add('proection');
			const { width, height } = this.styles;
			d.style.cssText = `
	 			width: ${width};
		 		height: ${height};
		 		margin: 10px 0;
			`
			return d;
		})();
	}

	static create(content) {
		const node = document.createElement('div');
		node.classList.add('draggable');
		node.textContent = content;
		const close = document.createElement('div');
		close.classList.add('close');
		close.innerHTML = '&#10060';
		close.addEventListener("click", (e) => {
			e.stopPropagation;
			e.target.parentElement.remove(e.target);
		  });
		node.appendChild(close);
		return new Card(node);
	}

	get element() {
		return this.#el;
	}
}

class Controller {
	constructor(container) {
		this.container = container;
		// Card
		this.draggingElement = null;
		// Card.proection
		this.draggingProection = null;
	}

	init() {
		// this.container.append(Card.create(15).element)
	}

	setDraggingElement(node) {
		this.draggingElement = new Card(node);
	}

	replaceDragging() {
    // console.log('this.draggingElement.element',this.draggingElement.element)
		this.draggingProection.replaceWith(this.draggingElement.element);
		this.draggingElement.element.style = this.draggingElement.styles;
	}

	clear() {
		this.draggingElement = null;
		this.draggingProection = null;
	}

	onMouseDown = (evt) => {
		const target = evt.target;
		if (target.classList.contains('draggable')) {
			this.shiftX = evt.offsetX;
			this.shiftY = evt.offsetY;
			this.setDraggingElement(target);
			this.draggingElement.style = `
		 		left: ${evt.pageX - this.shiftX}px;
		 		top: ${evt.pageY - this.shiftY}px;
			`
			this.proectionAct(evt)
		}
	}

	onMouseUp = () => {

		if (this.draggingElement) {
			this.replaceDragging();
			this.clear()
		}
	}

	// Рассчёт позиции вставки проекции и вставка или удаление
	proectionAct(evt) {
		const target = evt.target;
		const element = this.draggingElement;
		const proection = this.draggingProection;
		if (
			(target.classList.contains("draggable")) &&
			!target.classList.contains("proection")
		) {
			const { y, height } = target.getBoundingClientRect();
			const appendPosition = y + height / 2 > evt.clientY
				? "beforebegin"
				: "afterend";

			if (!proection) {
				this.draggingProection = element.proection;
			} else {
				proection.remove();
				target.insertAdjacentElement(appendPosition, proection);
			}
		}
		else if ((target.classList.contains("col")) &&
		!target.classList.contains("proection")) {
			const { y, height } = target.getBoundingClientRect();
			const appendPosition = "beforeEnd";
			if (!proection) {
				this.draggingProection = element.proection;
			} else {
				proection.remove();
				target.insertAdjacentElement(appendPosition, proection);
			}
		}
	}
	onMouseMove = (evt) => {
		if (this.draggingElement) {
		  const { pageX, pageY } = evt;
		  const element = this.draggingElement;
		  const { width, height } = this.draggingElement.styles;
		  element.styles = `
			position: absolute;
			 left: ${pageX - this.shiftX}px;
			 top: ${pageY - this.shiftY}px;
			 pointer-events: none;
			width: ${width};
			height: ${height};
		  `
		  this.proectionAct(evt)
		}
	  }
	  }

const close = document.querySelectorAll(".close");
document.querySelectorAll(".add-card").forEach((e) => {
  e.addEventListener("click", (event) => {
    if (
      !event.target.nextElementSibling ||
      event.target.nextElementSibling.className !== "add-text"
    ) {
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

close.forEach((elem) => {
  elem.addEventListener("click", (e) => {
    e.stopPropagation;
    e.target.parentElement.remove(e.target);
  });
});
const controller = new Controller(document.querySelector(".col"));

controller.init();

document.body.addEventListener("mousedown", controller.onMouseDown);
document.body.addEventListener("mouseup", controller.onMouseUp);
document.body.addEventListener("mousemove", controller.onMouseMove);
