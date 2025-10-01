  let select = document.getElementById("color");
  let body = document.querySelector("body");

  select.addEventListener("change", ()=>{
    body.style.backgroundColor = select.value;
  });