export function load(list,name) {
    const list_group = document.getElementById(name);
    
for (const elem of list) {
    const liElement = document.createElement("li");
    liElement.classList.add("list-group-item");
    liElement.textContent = elem;
    list_group.appendChild(liElement)
}
}