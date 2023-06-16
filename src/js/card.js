export default class Card {
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
		const close = document.createElement('div');
		close.classList.add('close');
		close.innerHTML = `&#10060`;
		close.addEventListener("click", (e) => {
			  console.log(e.target.parentElement.remove(e.target));
		});
		node.classList.add('draggable');
		node.textContent = content;
		node.appendChild(close);
		return new Card(node);
	}

	get element() {
		return this.#el;
	}
}