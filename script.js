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

let h=makeNewTodo('wash clothes','i','j','k')
let i=makeNewTodo('do dishes','i','j','k')


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
    return{printProjects}
})()

renderProjects.printProjects()

let renderTasks=(function(){
    let printList=function(){
       let tasks= document.querySelector('#tasks')
       while( tasks.hasChildNodes() ){
        tasks.removeChild(tasks.lastChild);} 
        let array=projects.currentProject;
        for(let j=0;j<array.length;j++){
            const task=document.createElement('div')
            task.classList.add('task')
            task.textContent=`${projects.currentProject[j].title}`
            tasks.appendChild(task)
        }
    }


    return{printList,}

})()

renderTasks.printList()