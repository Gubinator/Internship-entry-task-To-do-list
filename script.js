window.localStorage

window.addEventListener('load', () => {

//localStorage.clear();

//1st half (Defining list of tasks)
const formList = document.querySelector("#new-todo-list");
const inputList = document.querySelector("#new-list-input");
const taskLists = document.querySelector("#list-selector");
const title = document.querySelector("#tasklist-name");

//2nd half (Defining tasks of an individual list)
const form = document.querySelector("#new-task-form");
const input = document.querySelector("#new-task-input");
const submit = document.querySelector(".submit-test");
const main = document.querySelector("#main-task");
const listTitle = document.querySelector("#list-title");
const list_element = document.querySelector("#tasks") 
const listNamesArr = [];
const taskNamesArr = [];
const informationObject = new Object();
informationObject.lists = listNamesArr;

function RemoveHidden(){
    if(taskLists.hasAttribute("hidden")){ // Shows Select or "taskLists" when not empty
        taskLists.removeAttribute("hidden");
    }
    if(submit.hasAttribute("hidden")){ // -||-
        submit.removeAttribute("hidden");
    }
    if(input.hasAttribute("hidden")){ // -||-
        input.removeAttribute("hidden");
    }
    if(main.hasAttribute("hidden")){ 
        main.removeAttribute("hidden");
    }
    if(listTitle.hasAttribute("hidden")){ 
        listTitle.removeAttribute("hidden");
    }
}

function InvalidateSameListName(listName){
    var count = 0;

    for(var i=0; i<listNamesArr.length; i++){
        if(listName===listNamesArr[i]){
            count++;
        }
    }
    if(count>=1){
        return 1;
    }

}

function InvalidateSameTaskName(taskName){
    var count = 0;

    for(var i=0; i<taskNamesArr.length; i++){
        if(taskName===taskNamesArr[i]){
            count++;
        }
    }
    if(count>=1){
        return 1;
    }

}

// Found on stack overflow (didn't find another way) : https://stackoverflow.com/questions/9778899/how-to-order-divs-by-id-in-javascript
function SortTasksById(){
    [].map.call( list_element.children, Object ).sort(function (a,b){
        return +a.id.match(/\d+/) - +b.id.match( /\d+/ );
    }).forEach( function (elem){
        elem.classList.add("transition");
        list_element.appendChild(elem);
    });
}

formList.addEventListener('submit', (e) => { 
    e.preventDefault();
    const select_element = document.createElement("option");
    //console.log(inputList.value);
    if(!inputList.value){
        alert("List name can't be empty, please fill up your list name before submitting!");
        return;
    }
    if(InvalidateSameListName(inputList.value)==1){
        alert("List of the same name is already inserted, please change the name of a list.");
    } 
    else{
        list_element.innerHTML="";
        const select_element = document.createElement("option");
        
        select_element.value = inputList.value;
        select_element.text = inputList.value;
        title.textContent = select_element.value;
        title.value = select_element.value;
        RemoveHidden();

        taskLists.appendChild(select_element);
        listNamesArr.push(select_element.value);
        informationObject.lists=listNamesArr;
        alert("You inserted a new task list: " + select_element.value);
        taskLists.value=select_element.value; 

        /*removeListButton.addEventListener('click', () => { 
            list_element.removeChild(task_element);
            localStorage.removeItem(objTaskLocal.TaskID);
                     })*/

    }
})

taskLists.addEventListener('change', (e) => {
    title.textContent = taskLists.value;

    if(localStorage.length!=0){
        RemoveHidden();
        list_element.innerHTML=""; // Everytime clears div filled with tasks, and loads new everytime on change
        for (let i=0; i<localStorage.length; i++){
        
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        //console.log(value);
        const objTaskLocal = JSON.parse(value); //Here I established object from whom I can get value of both checkbox and task-name
        //console.log(objTaskLocal)
        //console.log(taskLists.value);
        //console.log("Ovo je nes drugo"+objTaskLocal.BelongsTo);
        if(taskLists.value==objTaskLocal.BelongsTo){
            RemoveHidden();
            const task_element = document.createElement("div");
            task_element.classList.add("task");
            
            const task_content_element = document.createElement("div");
            task_content_element.classList.add("content");
    
            const task_input_element = document.createElement("input")
            task_input_element.type = "text";
            task_input_element.classList.add("text");
            task_input_element.classList.add("input-hide");
            //console.log(objTaskLocal);
            /*objTaskLocal.description = task_input_element.value;
            taskObject.is_checked = action_check.checked;
            console.log(taskObject);*/
            
            //console.log(objTaskLocal.TaskID);
            //console.log(objTaskLocal.lists);
            //console.log(JSON.stringify(objTaskLocal.lists));
            //console.log(objTaskLocal);
            task_input_element.value = objTaskLocal.description; 
            task_input_element.setAttribute("readonly", "readonly");
            
            task_element.appendChild(task_content_element);
            task_content_element.appendChild(task_input_element);
            task_element.setAttribute("id",objTaskLocal.TaskID);
            list_element.appendChild(task_element);
    
            const action_elements = document.createElement("div");
            action_elements.classList.add("actions");
            const action_edit = document.createElement("button");
            const action_delete = document.createElement("button");
            const action_check = document.createElement("input");
            action_check.setAttribute("type", "checkbox");
            action_check.classList.add("input-checkbox")
            action_delete.innerText = "Delete";
            action_edit.innerText = "Edit";
            action_elements.appendChild(action_check);
            action_elements.appendChild(action_edit);
            action_elements.appendChild(action_delete);
            task_element.appendChild(action_elements);
            if(objTaskLocal.is_checked==="true"){ //Mora biti i ovaj i donji jer ovaj sluzi za kad se friski objekt napravi onda mu sejva za refresh
                //console.log("If checked - on refresh console log this);
                action_check.checked=true;
                task_input_element.classList.add("checked");
            }
            
            action_edit.addEventListener('click', () => {
                //console.log("2");
                //console.log(objTaskLocal.description);
                if(action_edit.innerText.toLowerCase() == "edit"){
                    action_edit.innerText = "save";
                    task_input_element.removeAttribute("readonly"); 
                    localStorage.removeItem(objTaskLocal.TaskID);
                }
                else{
                    action_edit.innerText = "edit";
                    task_input_element.setAttribute("readonly", "readonly");
                    //console.log(objTaskLocal.description);
                    objTaskLocal.description = task_input_element.value;
                    //console.log(task_input_element.value);
                    
                    localStorage.setItem(objTaskLocal.TaskID, JSON.stringify(objTaskLocal));
                    
                }
            })
    
            action_delete.addEventListener('click', () => { 
            list_element.removeChild(task_element);
            localStorage.removeItem(objTaskLocal.TaskID);
                     })
            
            action_check.addEventListener('change', () =>{
                
                if(action_check.checked===true){
                    //console.log("1ST TEST");
                    objTaskLocal.is_checked = true;
                    task_input_element.classList.add("checked");
                    localStorage.setItem(objTaskLocal.TaskID, JSON.stringify(objTaskLocal));
                    
                }
                if(action_check.checked===false){
                    //console.log("2ND TEST");
                    objTaskLocal.is_checked = false;
    
                    task_input_element.classList.remove("checked");
                    localStorage.setItem(objTaskLocal.TaskID, JSON.stringify(objTaskLocal));
                }
    
             })

             if(objTaskLocal.is_checked==true){ //Mora biti i ovaj i donji jer ovaj sluzi za kad se friski objekt napravi onda mu sejva za refresh
                //console.log("If checked - on refresh console log this);
                action_check.checked=true;
                task_input_element.classList.add("checked");
            }
    
        }

        }
    }
    SortTasksById();
})


form.addEventListener('submit', (e) => { 

    e.preventDefault();
    
    const task_element = document.createElement("div");
    task_element.classList.add("task");

    const task_content_element = document.createElement("div");
    task_content_element.classList.add("content");

    if(!input.value){
        alert("Task can't be empty, please fill up your task before submitting!");  //Prevents blank task input
        return;
    } 
    if(InvalidateSameTaskName(input.value)==1){
        alert("Task of the same name is already inserted, please change the name of a task.");
    }
    else { 

        const task_input_element = document.createElement("input")
        task_input_element.type = "text";
        task_input_element.classList.add("text");
        task_input_element.classList.add("input-hide");
        task_input_element.value = input.value;
        task_input_element.setAttribute("readonly", "readonly");
        
        task_element.appendChild(task_content_element);
        task_content_element.appendChild(task_input_element);
        list_element.appendChild(task_element);

        const action_elements = document.createElement("div");
        action_elements.classList.add("actions");
        const action_edit = document.createElement("button");
        const action_delete = document.createElement("button");
        const action_check = document.createElement("input");
        action_check.setAttribute("type", "checkbox");
        action_check.classList.add("input-checkbox")
        action_delete.innerText = "Delete";
        action_edit.innerText = "Edit";
        action_elements.appendChild(action_check);
        action_elements.appendChild(action_edit);
        action_elements.appendChild(action_delete);
        task_element.appendChild(action_elements);
        input.value="";
        

        //Adding data to the local storage
        const taskObject = new Object();
        taskObject.description = task_input_element.value;
        taskObject.is_checked = action_check.checked;
        
        //Making ID by using date 
        var date = new Date();
        var dateTime = date.getTime();
        taskObject.id = dateTime; 
        taskObject.BelongsTo = taskLists.value;
        
        //console.log(taskObject); //
        //console.log(JSON.stringify(taskObject));
        
        // I'm using value as input field value as
        taskNamesArr.push(task_input_element.value);
        //console.log(informationObject);
        //informationObject.lists = listNamesArr;
        informationObject.description = taskObject.description;
        informationObject.TaskID= taskObject.id;
        informationObject.is_checked = taskObject.is_checked;
        informationObject.BelongsTo = taskObject.BelongsTo;

        localStorage.setItem(informationObject.TaskID, JSON.stringify(informationObject));
    
        action_delete.addEventListener('click', () => { 
            list_element.removeChild(task_element);
            localStorage.removeItem(informationObject.TaskID);
                     })
        
        action_edit.addEventListener('click', () => {
            
            if(action_edit.innerText.toLowerCase() == "edit"){
                action_edit.innerText = "save";
                task_input_element.removeAttribute("readonly"); 
                localStorage.removeItem(informationObject.TaskID);
            }
            else{
                action_edit.innerText = "edit";
                task_input_element.setAttribute("readonly", "readonly");
                taskObject.description = task_input_element.value;
                localStorage.setItem(informationObject.TaskID, JSON.stringify(informationObject));
            }
        })

        action_check.addEventListener('change', () =>{

            if(action_check.checked===true){
                task_input_element.classList.add("checked");
                informationObject.is_checked = true;
                localStorage.setItem(informationObject.TaskID, JSON.stringify(informationObject));
            }
            if(action_check.checked===false){
                task_input_element.classList.remove("checked");
                informationObject.is_checked = false;
                localStorage.setItem(informationObject.TaskID, JSON.stringify(informationObject));
            }
         })
        }
    })
    // Dio za prikaz lista koje su unutar local storage-a
    if(localStorage.length!=0){

        var max = localStorage.key(0);
        console.log("Testna vrijednost" + max);
        for(var i=0; i<localStorage.length; i++){
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
            const last_object = JSON.parse(value);
            if(max<key){
                max=key;
            }
        }
        const value = localStorage.getItem(max);
        const last_object = JSON.parse(value);
        //console.log(last_object.lists); Finally working

       function AddNewOption(OptionValue){
        
        const select_element = document.createElement("option");
       
        //console.log(last_object.description);
        select_element.value = OptionValue;
        select_element.text = OptionValue;
        taskLists.appendChild(select_element);
        
        RemoveHidden();

        taskLists.appendChild(select_element);
        listNamesArr.push(select_element.value);
        informationObject.lists=listNamesArr;
        taskLists.value=select_element.value; 
        }

        //console.log(last_object.lists.length);
        for(var i=0; i<last_object.lists.length; i++){
            AddNewOption(last_object.lists[i]);
        }

    } 
    //Dio za prikaz itema koji su stavljeni unutar local storage-a, ugl. for petlja i copy-pasteane f-je
    if(localStorage.length!=0){
        RemoveHidden();
        for (var i=0; i<localStorage.length; i++){

        const key = localStorage.key(i);
        console.log(key);
        const value = localStorage.getItem(key);
        //console.log(value);
        const objTaskLocal = JSON.parse(value);
        //console.log(objTaskLocal)
        //console.log(taskLists.value);
        //console.log("Belongs:"+objTaskLocal.BelongsTo);
        console.log(objTaskLocal.description);
        if(taskLists.value==objTaskLocal.BelongsTo){
            const task_element = document.createElement("div");
            task_element.classList.add("task");
            
            const task_content_element = document.createElement("div");
            task_content_element.classList.add("content");
    
            const task_input_element = document.createElement("input")
            task_input_element.type = "text";
            task_input_element.classList.add("text");
            task_input_element.classList.add("input-hide");
            

            //console.log(objTaskLocal);
            /*objTaskLocal.description = task_input_element.value;
            taskObject.is_checked = action_check.checked;
            console.log(taskObject);*/
            
            //console.log("CONSOLE LOG TEST")
            
            //console.log(objTaskLocal.TaskID);
            //console.log(objTaskLocal.lists);
            //console.log(JSON.stringify(objTaskLocal.lists));
            //console.log(objTaskLocal);
            task_input_element.value = objTaskLocal.description; // I'm using objects attribute description to change input field for updated page
            task_input_element.setAttribute("readonly", "readonly");
            
            task_element.appendChild(task_content_element);
            task_content_element.appendChild(task_input_element);
            task_element.setAttribute("id", objTaskLocal.TaskID)
            list_element.appendChild(task_element);
            
            const action_elements = document.createElement("div");
            action_elements.classList.add("actions");
            const action_edit = document.createElement("button");
            const action_delete = document.createElement("button");
            const action_check = document.createElement("input");
            action_check.setAttribute("type", "checkbox");
            action_check.classList.add("input-checkbox")
            action_delete.innerText = "Delete";
            action_edit.innerText = "Edit";
            action_elements.appendChild(action_check);
            action_elements.appendChild(action_edit);
            action_elements.appendChild(action_delete);
            task_element.appendChild(action_elements);
            if(objTaskLocal.is_checked==="true"){
                action_check.checked=true;
                task_input_element.classList.add("checked");
            }
            
            action_edit.addEventListener('click', () => {
                console.log(objTaskLocal.description);
                if(action_edit.innerText.toLowerCase() == "edit"){
                    action_edit.innerText = "save";
                    task_input_element.removeAttribute("readonly"); 
                    localStorage.removeItem(objTaskLocal.TaskID);
                }
                else{
                    action_edit.innerText = "edit";
                    task_input_element.setAttribute("readonly", "readonly");
                    //console.log(objTaskLocal.description);
                    objTaskLocal.description = task_input_element.value;
                    //console.log(task_input_element.value);
                    
                    localStorage.setItem(objTaskLocal.TaskID, JSON.stringify(objTaskLocal));
                    
                }
            })
    
            action_delete.addEventListener('click', () => { 
            list_element.removeChild(task_element);
            localStorage.removeItem(objTaskLocal.TaskID);
                     })
            
            action_check.addEventListener('change', () =>{
                
                if(action_check.checked===true){
                    
                    objTaskLocal.is_checked = true;
                    console.log("1ST TEST jel check");
                    console.log(objTaskLocal.is_checked);
                    task_input_element.classList.add("checked");
                    localStorage.setItem(objTaskLocal.TaskID, JSON.stringify(objTaskLocal));
                    
                }
                if(action_check.checked===false){
                    //console.log("2ND TEST");
                    objTaskLocal.is_checked = false;
    
                    task_input_element.classList.remove("checked");
                    localStorage.setItem(objTaskLocal.TaskID, JSON.stringify(objTaskLocal));
                }
    
             })
    
             if(objTaskLocal.is_checked===true){
                //console.log("Checked on refresh" + objTaskLocal.id);
                action_check.checked=true;
                task_input_element.classList.add("checked");
            }
        }
        }
    }

SortTasksById();

})