
// create 

// event click 
// add.onclick = function(){
// let addDiv = document.createElement("div");
// let addText = document.createTextNode("challeng");
// addDiv.value = input.dispatchEvent;
// let deleteButton = document.createElement("button");
// let deleteText = document.createTextNode("delete");
// deleteButton.appendChild(deleteText);
// addDiv.appendChild(addText);
// addDiv.appendChild(deleteButton);

// // css 
// addDiv.style.cssText=
// "display: flex; justify-content: space-between;background: white;padding: 10px;width: 80%;margin: auto; border-radius: 7px;text-transform: capitalize ";
// deleteButton.style.cssText=" cursor:pointer;background-color: red;color: white;border: none;border-radius: 4px;padding: 5px 10px;text-transform: capitalize;font-size: 20px;"

// tasks.appendChild(addDiv)
// deleteButton.addEventListener("click",()=>{
//     addDiv.style.cssText = "display:none"
// })

// }
let submit = document.querySelector(".Add");
let input = document.querySelector(".input");
let taskDiv = document.querySelector(".Tasks");
let deleteB = document.querySelector(".Tasks .task .del");
let deleteAll = document.querySelector(".delete");

let arrayOfTasks =[];

submit.onclick = function(){
    if(input.value !== ""){
        addTasksToArray(input.value)//to add tasks to array
        input.value = ""; //to make input null
    }
}

// click on button to delete 
taskDiv.addEventListener("click",(e)=> {
    if(e.target.classList.contains("del")){
        // remove from page 
        e.target.parentElement.remove();
        // remove from localStorage
        deleteFromLocal(e.target.parentElement.getAttribute("data-id"));
    }
})
// check if there is tasks in localStorage
if(localStorage.getItem("task")){
    arrayOfTasks = JSON.parse(localStorage.getItem("task"))
}
// call getTasksFromLocalstorage function
getTasksFromLocalstorage();
// create addtasktotasks function
function addTasksToArray(taskText){// taskText = input.value
    // create object for store data 
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    };
    //or arrayOfTasks.push(input.value);
    arrayOfTasks.push(task);
    // function to add element to page 
    AddElementsToPageForm(arrayOfTasks);
    // Add tasks to localstorage
    AddTasksToLocalStorageFrom(arrayOfTasks);
}
// addelementsFunction

function AddElementsToPageForm(arrayOfTasks){

    taskDiv.innerHTML = "";
    
    arrayOfTasks.forEach((task) => {
        //create main div
        let Div = document.createElement("div");
        Div.className ="task";
        if(task.completed){
            Div.className ="task done";

        }
        Div.setAttribute("data-id",task.id);
        Div.appendChild(document.createTextNode(task.title))
        // css for div
        //create delete button
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("delete"));
        // css for span 
        //Append button to main div
        Div.appendChild(span);
        taskDiv.appendChild(Div);
    });

}

// add to localStorage function 
function AddTasksToLocalStorageFrom(arrayOfTasks){
window.localStorage.setItem("task",JSON.stringify(arrayOfTasks));
}
// get tasks from localStorage function
function getTasksFromLocalstorage(){
let data = window.localStorage.getItem("task");
if(data)
{
    let task = JSON.parse(data);
    AddElementsToPageForm(task);

}
}
//to delete data from localstorage
function deleteFromLocal(taskId){
    arrayOfTasks = arrayOfTasks.filter((task)=> task.id != taskId )
    AddTasksToLocalStorageFrom(arrayOfTasks)
}
// to delete all 
deleteAll.addEventListener("click", ()=>{
    // delete from page 
    taskDiv.innerHTML ="";
    // dlete from localstorage 
    // window.localStorage.clear();
    window.localStorage.removeItem("task");
})
