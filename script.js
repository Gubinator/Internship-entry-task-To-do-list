window.localStorage

window.addEventListener('load', () => {


//1st half (Defining list of task)
const formList = document.querySelector("#new-todo-list");
const inputList = document.querySelector("#new-list-input");
const taskLists = document.querySelector("#list-selector");


//2nd half (Defining tasks of an list)
const form = document.querySelector("#new-task-form");
const input = document.querySelector("#new-task-input");

const submit = document.querySelector(".submit-test");
const main = document.querySelector("#main-task");
const listTitle = document.querySelector("#list-title");

const list_element = document.querySelector("#tasks") 

const listNamesArr = [];
//const taskNamesArr = []; // Nece moci ovako morati ce preko objekta kasnije za fju InvalidateSameTaskName - pricekati

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
            //console.log(count + "U foru");
        }
    }
    //console.log(count + "Van fora");
    if(count>=1){
        //alert("List of the same name is already inputed. Please change the name of a list.")
        return 1;
    }

}

formList.addEventListener('submit', (e) => { 
    e.preventDefault();

    const select_element = document.createElement("option");
    console.log(inputList.value);
    if(!inputList.value){
        alert("List name can't be empty, please fill up your list name before submitting!");
    }
    if(InvalidateSameListName(inputList.value)==1){
        alert("List of the same name is already inputed, please change the name of a list.");
    } 
    else{
        
        
        
        const select_element = document.createElement("option");
        //task_input_element.classList.add("text");
        //task_input_element.classList.add("input-hide");
        
        select_element.value = inputList.value;
        select_element.text = inputList.value;

        
        ///MEMO OVO NECE RADITI NA REFRESH NACI MEHANIZAM DA RADI PREKO LISTE
        RemoveHidden();

        taskLists.appendChild(select_element);
        listNamesArr.push(select_element.value);
        alert("You inserted a new task list - " + select_element.value);

    }

})


form.addEventListener('submit', (e) => { 

    e.preventDefault();
    
    const task_element = document.createElement("div");
    task_element.classList.add("task");

    const task_content_element = document.createElement("div");
    task_content_element.classList.add("content");

    if(!input.value){
        alert("Task can't be empty, please fill up your task before submitting!");  //Prevents blank task input
    } else { 

        //task_content_element.innerText = input.value;
        /*task_element.appendChild(task_content_element);
        list_element.appendChild(task_element); */

        const task_input_element = document.createElement("input")
        task_input_element.type = "text";
        task_input_element.classList.add("text");
        task_input_element.classList.add("input-hide");
        task_input_element.value = input.value;
        task_input_element.setAttribute("readonly", "readonly");

        //task_content_element.appendChild(task_input_element);
        
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
        
        

        action_delete.addEventListener('click', () => { 
        list_element.removeChild(task_element);
        localStorage.removeItem(task_input_element.value);
                 })



        //Adding data to the local storage
        //Since local storage can get 1key and 1value-string only, I'm going to make object into string -> JSON
        const taskObject = new Object();
        taskObject.description = task_input_element.value;
        taskObject.is_checked = action_check.checked;
        console.log(taskObject);
        console.log(JSON.stringify(taskObject));
        // I'm using value as input field value as
        localStorage.setItem(taskObject.description, JSON.stringify(taskObject));
        

        action_edit.addEventListener('click', () => {
            
            if(action_edit.innerText.toLowerCase() == "edit"){
                action_edit.innerText = "save";
                task_input_element.removeAttribute("readonly"); 
                localStorage.removeItem(taskObject.description);
            }
            else{
                action_edit.innerText = "edit";
                task_input_element.setAttribute("readonly", "readonly");
                taskObject.description = task_input_element.value;
                localStorage.setItem(taskObject.description, JSON.stringify(taskObject));
                
            }
        })


        action_check.addEventListener('change', () =>{

            if(action_check.checked==true){
                task_input_element.classList.add("checked");
                taskObject.is_checked = "true";
                localStorage.setItem(task_input_element.value, JSON.stringify(taskObject));
            }
            if(action_check.checked==false){
                task_input_element.classList.remove("checked");
                taskObject.is_checked = "false";
                localStorage.setItem(task_input_element.value, JSON.stringify(taskObject));
            }

         })
        }
    })


    //Dio za prikaz itema koji su stavljeni unutar local storage-a, ugl. for petlja i copy-pasteane f-je
    if(localStorage.length!=0){
        for (let i=0; i<localStorage.length; i++){

        const task_element = document.createElement("div");
        task_element.classList.add("task");
        
        const task_content_element = document.createElement("div");
        task_content_element.classList.add("content");

        const task_input_element = document.createElement("input")
        task_input_element.type = "text";
        task_input_element.classList.add("text");
        task_input_element.classList.add("input-hide");
        
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);

        const objTaskLocal = JSON.parse(value); //Here I established object from whom I can get value of both checkbox and task-name

        /*objTaskLocal.description = task_input_element.value;
        taskObject.is_checked = action_check.checked;
        console.log(taskObject);*/
        
        //console.log("CONSOLE LOG TEST")
        console.log(objTaskLocal.is_checked)
        task_input_element.value = objTaskLocal.description; // I'm using objects attribute description to change input field for updated page
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
        
        if(objTaskLocal.is_checked==="true"){ //Mora biti i ovaj i donji jer ovaj sluzi za kad se friski objekt napravi onda mu sejva za refresh
            //console.log("If checked - on refresh console log this);
            action_check.checked=true;
            task_input_element.classList.add("checked");
        }
        
        action_edit.addEventListener('click', () => {
            //console.log("2");
            console.log(objTaskLocal.description);
            if(action_edit.innerText.toLowerCase() == "edit"){
                action_edit.innerText = "save";
                task_input_element.removeAttribute("readonly"); 
                localStorage.removeItem(objTaskLocal.description);
            }
            else{
                action_edit.innerText = "edit";
                task_input_element.setAttribute("readonly", "readonly");
                //console.log(objTaskLocal.description);
                objTaskLocal.description = task_input_element.value;
                //console.log(task_input_element.value);
                
                localStorage.setItem(objTaskLocal.description, JSON.stringify(objTaskLocal));
                
            }
        })

        action_delete.addEventListener('click', () => { 
        list_element.removeChild(task_element);
        localStorage.removeItem(objTaskLocal.description);
                 })
        
        action_check.addEventListener('change', () =>{
            
            if(action_check.checked===true){
                //console.log("1ST TEST");
                objTaskLocal.is_checked = true;
                task_input_element.classList.add("checked");
                localStorage.setItem(task_input_element.value, JSON.stringify(objTaskLocal));
                
            }
            if(action_check.checked===false){
                //console.log("2ND TEST");
                objTaskLocal.is_checked = false;

                task_input_element.classList.remove("checked");
                localStorage.setItem(task_input_element.value, JSON.stringify(objTaskLocal));
            }

         })

         if(objTaskLocal.is_checked===true){
            console.log("jebemu pleme");
            action_check.checked=true;
            task_input_element.classList.add("checked");
        }

        }
    }

})