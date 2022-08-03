let shortPeriod = []
let mediumPeriod = []
let longPeriod = []
// localStorage.clear()

verifyLocalStorage()

function verifyLocalStorage(){
    console.log('to rodando')

    if (localStorage.getItem("short-period") != null) {
        shortPeriod = [localStorage["short-period"]]
        showData("short-period", "storedData")
    }

    if (localStorage.getItem("medium-period") != null) {
        mediumPeriod = [localStorage["medium-period"]]
        showData("medium-period", "storedData")
    }

    if (localStorage.getItem("long-period") != null) {
        longPeriod = [localStorage["long-period"]]
        showData("long-period", "storedData")
    }

}

function showData(period, state="new"){
    // console.log(state)
    let chave = localStorage.getItem(period);
    //convert to an array separating the values by comma(,)
    chave = chave.split(/,(?! )/)
    // console.log(chave)
    // add to screen
    let currentPeriod = document.getElementById(period);
    let currentCheckbox = currentPeriod.querySelector(".checklist")
    if(state == "new"){
        // console.log('thats a new one!')
        // console.log('ultima'+ chave[chave.length -1]);
        // create the new checkbox element
        newCheckbox = document.createElement("input")
        newCheckbox.setAttribute("type","checkbox")
        // newCheckbox.setAttribute("id", `label${countid}`)

        // make a label for this checkbox
        newLabel = document.createElement("label")
        // newLabel.setAttribute("for", `label${countid}`)
        // make the text content editable
        newLabel.setAttribute("contentEditable","true")
        newLabel.innerText = chave[chave.length -1]
        //make a new div to group the label and the checkbox input
        checkboxGroup = document.createElement('div')
        checkboxGroup.setAttribute("class","checkboxGroup")

        // console.log(newLabel)

        checkboxGroup.appendChild(newCheckbox)
        checkboxGroup.appendChild(newLabel)

        // console.log(newCheckbox)
        // put the new elements into checklist div"
        currentPeriod.querySelector(".checklist").appendChild(checkboxGroup)
        // update the id counter
        // countid++

    }else{
        // insert each task in the screen
        for (let i = 0 ; i < chave.length; i++){
        // console.log(chave[i]);
        // create the new checkbox element
        newCheckbox = document.createElement("input")
        newCheckbox.setAttribute("type","checkbox")
        // newCheckbox.setAttribute("id", `label${countid}`)

        // make a label for this checkbox
        newLabel = document.createElement("label")
        // newLabel.setAttribute("for", `label${countid}`)
        // make the text content editable
        newLabel.setAttribute("contentEditable","true")
        newLabel.innerText = chave[i]
        //make a new div to group the label and the checkbox input
        checkboxGroup = document.createElement('div')
        checkboxGroup.setAttribute("class","checkboxGroup")

        // console.log(newLabel)

        checkboxGroup.appendChild(newCheckbox)
        checkboxGroup.appendChild(newLabel)

        // console.log(newCheckbox)
        // put the new elements into checklist div"
        currentPeriod.querySelector(".checklist").appendChild(checkboxGroup)
        // update the id counter
        // countid++
        }
    }
}



function addTask(button){
    // get the parent element
    let buttonParent = button.parentNode.parentNode;
    // get the div to make and store the new task
    let currentChecklist = buttonParent.querySelector(".checklist");
    let textInput = buttonParent.querySelector(".taskInput");
    let currentCache = buttonParent.querySelector(".checklist");
    

    if (!textInput.value){
        // disable button when input is empty
        console.log(button.id)
        textInput.setAttribute("placeholder", "input required")

        return 0;
    }
    
    let newText = textInput.value

    //make the own cardStore variable to store the data
    if(button.id == "button1"){
        shortPeriod.push(newText);
        localStorage.setItem("short-period", shortPeriod)
        // console.log(localStorage.getItem('shortPeriod'))
        // put the values from local storage in the screen
        showData("short-period")

    }else if(button.id == "button2"){
        mediumPeriod.push(newText);
        localStorage.setItem("medium-period", mediumPeriod)
        // console.log(localStorage.getItem('mediumPeriod'))
        // put the values from local storage in the screen
        showData("medium-period")


    }else{
        longPeriod.push(newText);
        localStorage.setItem("long-period", longPeriod)
        // console.log(localStorage.getItem('longPeriod'))            
        // put the values from local storage in the screen
        showData("long-period")
    }
    textInput.value = ""
    
}
// localStorage.clear()
    // exclude task on tripple click
    let groupToExclude = document.querySelectorAll(".checkboxGroup");
    let elementExclude;
    
    for (let i =0; i< groupToExclude.length; i++){
        groupToExclude[i].addEventListener('click', function (evt) {
            if (evt.detail === 3) {
                let parentKey = this.parentNode.parentNode.id
                // console.log(parentKey)
                let parentLocalStorage = localStorage.getItem(parentKey).split(/,(?! )/)
                console.log(parentLocalStorage)
                // get the value to exlude from local storage
                elementExclude = this.querySelector("label").innerText
                for(let j=0; j < parentLocalStorage.length; j++){
                    // console.log(parentLocalStorage[j].toUpperCase()+' '+ j)
                    // console.log(typeof elementExclude)

                    if(parentLocalStorage[j].toLocaleLowerCase() === elementExclude.toLocaleLowerCase()){
                        console.log("é")
                        console.log(parentLocalStorage[j])
                        // remove the element from the parentLocalStorage variable
                        parentLocalStorage.splice(j, 1)
                        console.log(parentLocalStorage)
                        // store the updated values into localstorage
                        localStorage.setItem(parentKey, parentLocalStorage);
                   
   
                    }
                }
               
                
            
                // console.log(elementExclude)
                // console.log(localStorage[elementExclude])
                
                this.remove()
            }
        });
    }
    
    // // store values into localStorage
    // var names = [];
    // names[0] = prompt("New member name?");
    // localStorage.setItem("names", JSON.stringify(names));
    // var storedNames = JSON.parse(localStorage.getItem("names"));
    // console.log(storedNames)



//store the id counter
let countid = 1

function inputRequired(ipt){
    console.log(ipt)
}

    // when page load change the number of visible cards to 1 for smaller screens
    var mediaquery = window.matchMedia('(max-width: 478px)');
    if (mediaquery.matches) { // If media query matches
        document.getElementById("short-period").style.display = "block"
        document.getElementById("medium-period").style.display = "none"
        document.getElementById("long-period").style.display = "none"


      }

    //  when resize the page change  number of visible cards to 1 if we are in smaller screens
    //  and let 3 if we are in the biggest
    mediaquery.onchange = (e) => {
        if (e.matches) {
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
   