function makeNewTodo(name){
    let title=name
    let description="description"
    let dueDate="dueDate"
    let priority="priority"



    
    return{title,description,dueDate,priority}
}


function addTodoToProject(){
    let newTodo
    projects[currentProject].push(newTodo)
}

let makeProject=(function(project){
    let projects=[]
    let makeNewProject=function(){
         project=['']
        projects.push(project)

    }
    return{projects,makeNewProject}
})()