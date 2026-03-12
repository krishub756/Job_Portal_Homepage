let tasks = []

const taskInput = document.getElementById("taskInput")
const priority = document.getElementById("priority")
const addBtn = document.getElementById("addTask")
const taskList = document.getElementById("taskList")

addBtn.addEventListener("click", addTask)

function addTask(){

    const taskName = taskInput.value

    if(taskName === "") return

    const task = {
        name: taskName,
        priority: priority.value,
        completed:false
    }

    tasks.push(task)

    taskInput.value=""

    displayTasks(tasks)
}

function displayTasks(taskArray){

    taskList.innerHTML=""

    taskArray.forEach((task,index)=>{

        const li = document.createElement("li")

        if(task.completed){
            li.classList.add("completed")
        }

        const span = document.createElement("span")
        span.innerText = task.name + " (" + task.priority + ")"
        span.classList.add("priority-"+task.priority.toLowerCase())

        span.onclick = function(){
            toggleComplete(index)
        }

        const delBtn = document.createElement("button")
        delBtn.innerText="Delete"

        delBtn.onclick=function(){
            deleteTask(index)
        }

        li.appendChild(span)
        li.appendChild(delBtn)

        taskList.appendChild(li)

    })
}

function toggleComplete(index){

    tasks[index].completed = !tasks[index].completed

    displayTasks(tasks)

}

function deleteTask(index){

    tasks.splice(index,1)

    displayTasks(tasks)

}

function filterTasks(type){

    if(type==="all"){
        displayTasks(tasks)
    }

    if(type==="completed"){
        const completed = tasks.filter(task=>task.completed)
        displayTasks(completed)
    }

    if(type==="pending"){
        const pending = tasks.filter(task=>!task.completed)
        displayTasks(pending)
    }

}