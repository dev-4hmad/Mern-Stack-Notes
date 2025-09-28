let inp = document.querySelector("input");
let btn = document.querySelector("button");
let ul = document.querySelector("ul");

function addTodo() {
    let text = inp.value.trim();   
    if (text === "") return;       

    let item = document.createElement("li");
    item.innerText = text;
    ul.appendChild(item);

    let delbtn = document.createElement("button");
    delbtn.innerText = "Delete";
    delbtn.classList.add("delete");
    item.appendChild(delbtn);

    inp.value = "";
}

// Button click
btn.addEventListener("click", addTodo);

// Enter key press
inp.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTodo();
    }
});

// Delete handler
ul.addEventListener("click", function(event){
    if (event.target.tagName === "BUTTON"){
        event.target.parentElement.remove();
    }
});