

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
    // put the new elements into checklist div"
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

    // when page load change the number of visible cards to 1 for smaller screens
    var mediaquery = window.matchMedia('(max-width: 478px)');
    if (mediaquery.matches) { // If media query matches
        document.body.style.backgroundColor = "yellow";
        document.getElementById("short-period").style.display = "block"
        document.getElementById("medium-period").style.display = "none"
        document.getElementById("long-period").style.display = "none"


      }

    //  when resize the page change  number of visible cards to 1 if we are in smaller screens
    //  and let 3 if we are in the biggest
    mediaquery.onchange = (e) => {
        if (e.matches) {
        console.log('This is a narrow screen — less than 600px wide.')
        document.getElementById("short-period").style.display = "block"
        document.getElementById("medium-period").style.display = "none"
        document.getElementById("long-period").style.display = "none"
       

    } else {
        console.log('This is a wide screen — more than 600px wide.')
        document.getElementById("short-period").style.display = "block"
        document.getElementById("medium-period").style.display = "block"
        document.getElementById("long-period").style.display = "block"
    }
    }
    

    function changeVisibility(number){
        if (window.matchMedia("(max-width:478px)").matches) {
            if(number == 1){
                console.log("numero é 1")
                document.getElementById("short-period").style.display = "block"
                document.getElementById("medium-period").style.display = "none"
                document.getElementById("long-period").style.display = "none"
        
            }else if(number == 2){
                console.log("numero é 2")
                document.getElementById("short-period").style.display = "none"
                document.getElementById("medium-period").style.display = "block"
                document.getElementById("long-period").style.display = "none"
        
            }else{
                console.log("numero é 3")
                document.getElementById("short-period").style.display = "none"
                document.getElementById("medium-period").style.display = "none"
                document.getElementById("long-period").style.display = "block"
            }
        
        
        
        }else{
            console.log("numero é 3")
            document.getElementById("short-period").style.display = "block"
            document.getElementById("medium-period").style.display = "block"
            document.getElementById("long-period").style.display = "block"
        }
    }