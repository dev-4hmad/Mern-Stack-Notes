let btn = document.querySelector('button');
let ul = document.querySelector('ul');
let inp = document.querySelector('input');

btn.addEventListener('click', ()=>{
    if (!inp.value) return; 


    let li = document.createElement("li");
    li.innerText = inp.value;


    let delBtn = document.createElement("button");
    delBtn.innerText = "❌";
    delBtn.style.marginLeft = "10px";


    let modBtn = document.createElement("button");
    modBtn.innerText = "✏️ Modify";
    modBtn.style.marginLeft = "10px";


    delBtn.addEventListener('click', ()=>{
        li.remove();
    });


    modBtn.addEventListener('click', ()=>{

        let oldText = li.firstChild.textContent;

        let editInput = document.createElement("input");
        editInput.type = "text";
        editInput.value = oldText;

        let saveBtn = document.createElement("button");
        saveBtn.innerText = "💾 Save";

        saveBtn.addEventListener('click', ()=>{
            li.innerText = editInput.value; 
            li.appendChild(delBtn);
            li.appendChild(modBtn);
        });

        li.innerText = "";
        li.appendChild(editInput);
        li.appendChild(saveBtn);
    });

    li.appendChild(delBtn);
    li.appendChild(modBtn);

    ul.appendChild(li);

    inp.value = "";
});