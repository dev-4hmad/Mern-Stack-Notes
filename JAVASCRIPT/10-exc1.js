// Guessing game

let para = document.querySelector("p");
let btn = document.querySelector("button");
let inp = document.querySelector("input")

let num = Math.floor((Math.random()*10)+1)
console.log(num)

btn.addEventListener('click', ()=>{
    let guess = Number(inp.value)
    if (!guess){
        para.innerText = "enter text"
    }
    else if (guess > num) {
        para.innerText = "too big"
    } else if (guess < num){
        para.innerText = "too small"
    }
    
    else {
        para.innerText = `yeah it was: ${guess}`
    }
})


