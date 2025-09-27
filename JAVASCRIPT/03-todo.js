let todo = [];

let req = prompt("Enter your todo");

while(true){
    if (req == "quit"){
        console.log("Quitting");
        break;
    }
    else if (req == "list"){
        console.log("------------")
        for (let i=0; i<todo.length; i++){
            console.log(i, todo[i])
        }
        console.log("-------------")
    }
    else if (req == "add"){
        let task = prompt("Enter your task");
        todo.push(task)
        console.log("Added")
    }
    else if(req == "delete"){
        let idx = prompt("What you want to delete");
        todo.splice(idx, 1);
        console.log(idx, "deleted")
    } 
    else{
        console.log("Wrong request")
    }
    req = prompt("enter request")
}