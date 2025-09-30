// counter app

let para = document.querySelector("p");
let btn = document.querySelector("button");

let num = 0;
function update () {
    num = num + 1
    return num
}

btn.addEventListener('click', ()=>{
    para.innerText = update()
})