export function addelements(name) {
    const elem = document.createElement('div');
    const parent = document.getElementById(name);
    elem.classList.add('card-body');
    const textarea = document.createElement('textarea');
    textarea.style.resize = 'none';
    textarea.style.row = '5';
    elem.appendChild(textarea);
    const input = document.createElement('input');
    input.type = 'button';
    input.value = 'Add card';
    elem.appendChild(input)
    parent.appendChild(elem);
}
{/* <div class="card-body">
<textarea name="" id="" cols="30" rows="5" style="resize: none"></textarea>
<input type="button" value="Add card">
</div> */}