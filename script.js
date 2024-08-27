function makeNewTodo(title,description,dueDate,priority){
     title=title
     description=description
    dueDate=dueDate
    priority=priority
    let status='incomplete'
    let changeStatus=function(){
        if (status==='incomplete'){
            status='complete'
        }
        else if(status==='complete'){
            status='incomplete'
        }
    }
    let showStatus=function(){
        return status
    }
    return{title,description,dueDate,priority,showStatus,changeStatus}
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
    if (!(title===''||title===null||title===undefined)){
    projects.currentProject.push(newTodo)}
}

let projects=(function(){
    let allProjects=[]
    function addNewProject(title){
        let newProject=makeNewProject(title)
        if (!(title===''||title===null||title===undefined)){
        allProjects.push(newProject)}
    }
    let defaultProject=makeNewProject('default project')
    let secondaryProject=makeNewProject('secondary project')
    allProjects.push(defaultProject,secondaryProject)
    let currentProject=defaultProject.newArray
    function deleteProject(j){
        allProjects.splice(j,1)
        renderProjects.printProjects()
    }
    function deleteTask(j){
            currentProject.splice(j,1)
            renderTasks.printList()
    }
    return{allProjects,defaultProject,secondaryProject, currentProject,addNewProject,deleteTask,deleteProject}
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

                const delButton=document.createElement('button')
                delButton.classList.add('delete')
                delButton.addEventListener('click',()=>{
                    projects.deleteProject([i])
                })
                project.appendChild(delButton)
                projectDiv.appendChild(project)
            }
    }

    let updateProjectDom=function(){
        projectDialog.showModal()
        cancelProject.addEventListener('click',()=>{
        projectForm.reset()
        projectDialog.close()
        })
        projectForm.addEventListener('submit',(event)=>{
            event.preventDefault()
            let title=document.querySelector('#project-title').value
                projects.addNewProject(title)
                printProjects()
                projectForm.reset()
                projectDialog.close()
        })
    }
    return{printProjects, updateProjectDom}
})()
renderProjects.printProjects()

const projectDialog=document.querySelector('#project-dialog')
const addProjectButton=document.querySelector('#new-project')
addProjectButton.addEventListener('click',renderProjects.updateProjectDom)
const projectForm=document.querySelector('#projectForm')
const cancelProject = document.querySelector(".cancel");



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
            task.appendChild(taskHeader)
            let statusButton=document.createElement('button')
                statusButton.classList.add('status-button')
                statusButton.textContent=``
                statusButton.addEventListener('click', ()=>{
                    projects.currentProject[j].changeStatus()
                    renderTasks.printList()
                });
                if(projects.currentProject[j].showStatus()==='complete'){
                    statusButton.style.backgroundColor='green'
                    statusButton.style.color='white'}
                else(statusButton.style.backgroundColor='white')
            taskHeader.appendChild(statusButton)
            const titleDiv=document.createElement('div')
                titleDiv.classList.add('title-div')
                titleDiv.textContent=`${projects.currentProject[j].title}`
            taskHeader.appendChild(titleDiv)
            const descrip=document.createElement('div')
                descrip.classList.add('descrip')
                descrip.textContent=`${projects.currentProject[j].description}`
            task.appendChild(descrip)

            const priorityDiv=document.createElement('div')
            priorityDiv.classList.add('priority')
            priorityDiv.textContent=`${projects.currentProject[j].priority}`
            taskHeader.appendChild(priorityDiv)

            const delBut=document.createElement('button')
                delBut.classList.add('delete')
                
                delBut.addEventListener('click',()=>{
                    projects.deleteTask([j])
                })
            taskHeader.appendChild(delBut)
            tasks.appendChild(task)
        }
    }
    function updateTodoDom(){
        todoDialog.showModal()
        cancelTask.addEventListener('click',()=>{
            todoForm.reset()
            todoDialog.close()
        })
        
        todoForm.addEventListener('submit',(event)=>{
            event.preventDefault()
            let title=document.querySelector('#todo-title').value
            let description=document.querySelector('#todo-description').value
            let dueDate=document.querySelector('#todo-date').value
            let priority=document.querySelector('select').value   
            addTodoToProject(title,description,dueDate,priority)
            todoForm.reset()
            todoDialog.close()
            printList()
            
            
        })
    }
    return{printList, updateTodoDom}
})()

renderTasks.printList()

const todoDialog=document.querySelector('#todo-dialog')
const addTodoButton=document.querySelector('#new-todo')
addTodoButton.addEventListener('click',renderTasks.updateTodoDom)
const todoForm=document.querySelector('#todoForm')
const cancelTask=document.querySelector('#cancelTask')
const confirmTask=document.querySelector('#confirmTask')
