function makeNewTodo(title,description,dueDate,priority){
     title=title
     description=description
    dueDate=dueDate
    priority=priority

    return{title,description,dueDate,priority}
}


function makeNewProject(title){
    title=title
    newArray=[]

    return {title,newArray}
}

let h=makeNewTodo('wash clothes','wash all the dishes in sink before guests arrive','12/7','urgent')
let i=makeNewTodo('do dishes',"do everyone's laundry",'12/24','not urgent')


function addTodoToProject(title,description,dueDate,priority){
    let newTodo=makeNewTodo(title,description,dueDate,priority)
    projects.currentProject.push(newTodo)
}

let projects=(function(){
    let allProjects=[]
    function addNewProject(title){
        let newProject=makeNewProject(title)
        allProjects.push(newProject)
    }
    let defaultProject=makeNewProject('default project')
    let secondaryProject=makeNewProject('secondary project')
    allProjects.push(defaultProject,secondaryProject)
    let currentProject=defaultProject.newArray
    return{allProjects,defaultProject,secondaryProject, currentProject,addNewProject}
})()

projects.currentProject.push(h,i)


let renderProjects=(function(){
    let printProjects=function(){
        let projectDiv=document.querySelector('#projects')
        while(projectDiv.hasChildNodes()){
            projectDiv.removeChild(projectDiv.lastChild);}
            let array=projects.allProjects;
            for(let i=0;i<array.length;i++){
                const project=document.createElement('button')
                project.classList.add('project')
                project.textContent=`${projects.allProjects[i].title}`
                project.addEventListener('click',()=>{
                    projects.currentProject=projects.allProjects[i].newArray;
                    renderTasks.printList()
                })
                projectDiv.appendChild(project)
            }
    }

    let updateProjectDom=function(){
        projectDialog.showModal()
        projectForm.addEventListener('submit',(event)=>{
            event.preventDefault()
            let title=document.querySelector('#project-title').value
            if (title===''||title===undefined||title===null){
                projectForm.reset()
                projectDialog.close()
            }
            else{
                projects.addNewProject(title)
                printProjects()
                projectForm.reset()
                projectDialog.close()
            }
        })


    }
    return{printProjects, updateProjectDom}
})()
renderProjects.printProjects()

const projectDialog=document.querySelector('#project-dialog')
const addProjectButton=document.querySelector('#new-project')
addProjectButton.addEventListener('click',renderProjects.updateProjectDom)
const projectForm=document.querySelector('#projectForm')
const cancel = document.querySelector(".cancel");
cancel.addEventListener("click", () => {
    projectDialog.close();
});


let renderTasks=(function(){
    let printList=function(){
       let tasks= document.querySelector('#tasks')
       while( tasks.hasChildNodes() ){
        tasks.removeChild(tasks.lastChild);} 
        let array=projects.currentProject;
        for(let j=0;j<array.length;j++){
            const task=document.createElement('button')
            task.classList.add('task')
            const taskHeader=document.createElement('div')
            taskHeader.classList.add('taskHeader')
                taskHeader.textContent=`${projects.currentProject[j].title}`
            task.appendChild(taskHeader)
            const descrip=document.createElement('div')
                descrip.classList.add('descrip')
                descrip.textContent=`${projects.currentProject[j].description}`
            task.appendChild(descrip)
            const delBut=document.createElement('button')
                delBut.classList.add('delete')
                delBut.textContent='delete'
                delBut.addEventListener('click',()=>{
                    task.remove()
                })
            taskHeader.appendChild(delBut)
            tasks.appendChild(task)
        }
    }
    function updateTodoDom(){
        todoDialog.showModal()
        todoForm.addEventListener('submit',(event)=>{
            event.preventDefault()
            let title=document.querySelector('#todo-title').value
            let description=document.querySelector('#todo-description').value
            let dueDate=document.querySelector('#todo-date').value
            let priority=document.querySelector('select').value
            if (dueDate===''||dueDate===undefined||dueDate===null){
                todoForm.reset()
                todoDialog.close()
            }
            else{
                addTodoToProject(title,description,dueDate,priority)
                printList()
                todoForm.reset()
                todoDialog.close()
            }
        })
    }
    return{printList, updateTodoDom}
})()

renderTasks.printList()

const todoDialog=document.querySelector('#todo-dialog')
const addTodoButton=document.querySelector('#new-todo')
addTodoButton.addEventListener('click',renderTasks.updateTodoDom)
const todoForm=document.querySelector('#todoForm')
// const cancel = document.querySelector(".cancel");
// cancel.addEventListener("click", () => {
//     todoDialog.close();
// });