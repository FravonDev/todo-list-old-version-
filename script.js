

function addTask(button){
    // get the parent element
    let buttonParent = button.parentNode.parentNode;
    // get the div to make and store the new task
    let currentChecklist = buttonParent.querySelector(".checklist");
    let textInput = buttonParent.querySelector(".taskInput");

    if (!textInput.value){
        // disable button when input is empty
        console.log(button)
        textInput.setAttribute("placeholder", "input required")

        return 0;
    }
    
    let newText = textInput.value
    // console.log(newText)
    
    // create the new checkbox element
    newCheckbox = document.createElement("input")
    newCheckbox.setAttribute("type","checkbox")
    // newCheckbox.setAttribute("id", `label${countid}`)

    // make a label for this checkbox
    newLabel = document.createElement("label")
    // newLabel.setAttribute("for", `label${countid}`)
    // make the text content editable
    newLabel.setAttribute("contentEditable","true")
    newLabel.innerText = newText

    //make a new div to group the label and the checkbox input
   checkboxGroup = document.createElement('div')
   checkboxGroup.setAttribute("class","checkboxGroup")


    // console.log(newLabel)

    checkboxGroup.appendChild(newCheckbox)
    checkboxGroup.appendChild(newLabel)

    // console.log(newCheckbox)
    // put the new elements into checklist div
    currentChecklist.appendChild(checkboxGroup)

    console.log(currentChecklist)
    // update the id counter
    countid++

    // reset the input text
    textInput.value = ""


}
//store the id counter
let countid = 1

function inputRequired(ipt){
    console.log(ipt)

}
