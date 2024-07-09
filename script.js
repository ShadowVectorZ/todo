function makeNewTodo(title,description,dueDate,priority){
     title=title
     description=description
    dueDate=dueDate
    priority=priority

    return{title,description,dueDate,priority}
}

let h=makeNewTodo('h','i','j','k')
let i=makeNewTodo('h','i','j','k')


function addTodoToProject(title,description,dueDate,priority){
    let newTodo=makeNewTodo(title,description,dueDate,priority)
    makeProject.currentProject.push(newTodo)
}

let makeProject=(function(project){
    let defaultProject=[]
    let currentProject=defaultProject
    let makeNewProject=function(){
         project=[]
    }

   
    return{defaultProject,currentProject,project,makeNewProject,}
})()

makeProject.currentProject.push(h,i)

let renderTasks=(function(){

    let printList=function(){
       let tasks= document.querySelector('#tasks')
       while( tasks.hasChildNodes() ){
        tasks.removeChild(tasks.lastChild);} 
        let array=makeProject.currentProject;
        for(let j=0;j<array.length;j++){
            const task=document.createElement('div')
            task.classList.add('task')
            task.textContent=`${makeProject.currentProject[j].title}`
            tasks.appendChild(tasl)
        }
    }


    return{printList,}

})()