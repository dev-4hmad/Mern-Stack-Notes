let fav = "Avatar"

let guess = prompt("Enter");
while ((guess != "Avatar") && (guess != "quit")){
    guess = prompt("Wrong")
}
if (guess == "Avatar"){
    console.log("Good")
}
else{
    console.log("Nah")
}