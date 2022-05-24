
function addTask(button){
    // get the parent element
    let buttonParent = button.parentNode.parentNode;
    // get the div to make and store the new task
    let currentChecklist = buttonParent.querySelector(".checklist");
    let textInput = buttonParent.querySelector(".taskInput");
    
    let newText = textInput.value
    console.log(newText)
    
    // create the new checkbox element
    newCheckbox = document.createElement("input")
    newCheckbox.setAttribute("type","checkbox")
    newCheckbox.setAttribute("id", `label${countid}`)

    // make a label for this checkbox
    newLabel = document.createElement("label")
    newLabel.setAttribute("for", `label${countid}`)
    newLabel.innerText = newText

    console.log(newLabel)


    console.log(newCheckbox)
    // put the new  checkbox into checklist div
    currentChecklist.appendChild(  newCheckbox)
    currentChecklist.appendChild(newLabel)
    console.log(currentChecklist.firstChild)
    countid++

}
//store the id counter
let countid = 1