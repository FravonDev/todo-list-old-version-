let shortPeriod = []
let mediumPeriod = []
let longPeriod = []
// localStorage.clear()

verifyLocalStorage()

function verifyLocalStorage(){
    console.log('to rodando')

    if (localStorage.getItem("short-period")) {
        shortPeriod = [localStorage["short-period"]]
        showData("short-period", "storedData")
    }

    if (localStorage.getItem("medium-period")) {
        mediumPeriod = [localStorage["medium-period"]]
        showData("medium-period", "storedData")
    }

    if (localStorage.getItem("long-period")) {
        longPeriod = [localStorage["long-period"]]
        showData("long-period", "storedData")
    }

}

// localStorage.clear()

function check(checkbox){
    let currentPeriod = checkbox.parentNode.parentNode.parentNode.id;
    console.log(currentPeriod)
    //verify if we have or not checkbox data into localStorage
    if (!localStorage.getItem(`checkbox${currentPeriod}`)){
        alert('we dont have');
        // create one if we haven't
        // TODO
        let checkboxIsChecked = checkbox.checked;
        // console.log(checkboxIsChecked)
        localStorage.setItem(`checkbox${currentPeriod}`, checkboxIsChecked);


    }

    // get all checkbox elements in the current checklist
    let allCheckboxInCard =  document.getElementById(currentPeriod);
    allCheckboxInCard = allCheckboxInCard.getElementsByClassName('checkboxGroup')
    // console.log(allCheckboxInCard)

    let allNewCheckbox = []
    // iterate through this element to verify if the checkbox are not duplicated or not exists
    for(let i = 0; i < allCheckboxInCard.length; i++){
        // console.log(allCheckboxInCard[i].querySelector('input[type="checkbox"]').checked)

        // get the state of checkbox input inside of each checkbox div
        allNewCheckbox.push(allCheckboxInCard[i].querySelector('input[type="checkbox"]').checked)


        // console.log(allNewCheckbox)
    }
    // put the new values from "allNewCheckbox" into localstorage
    localStorage.setItem(`checkbox${currentPeriod}`, allNewCheckbox);

    //take the data from localstorage
    allCheckboxState = localStorage.getItem(`checkbox${currentPeriod}`)
    allCheckboxState = allCheckboxState.split(/,(?! )/);

    // TODO

    for(let j = 0; j < allCheckboxState.length; j++){
        if(checkbox == allCheckboxInCard[j].querySelector('input[type="checkbox"]')){
            console.log('é')
            console.log(allCheckboxInCard[j].querySelector('input[type="checkbox"]').value)
            if(allCheckboxInCard === 'false'){
                allCheckboxInCard[j].querySelector('input[type="checkbox"]').value = 'no'
                
            }
            else{
                allCheckboxInCard[j].querySelector('input[type="checkbox"]').value = 'yes'
            }
        }
        console.log(allCheckboxState[j])
        // console.log(allCheckboxInCard[j].querySelector('input[type="checkbox"]'), checkbox)
    }
    // now we need put the checkbox state in the screen
}


function showData(period, state="new"){
    let chave = localStorage.getItem(period);
    //convert to an array separating the values by comma(,)
    chave = chave.split(/,(?! )/)
    // add to screen
    let currentPeriod = document.getElementById(period);
    let currentCheckbox = currentPeriod.querySelector(".checklist")
    if(state == "new"){
        // create the new checkbox element
        newCheckbox = document.createElement("input")
        newCheckbox.setAttribute("type","checkbox")
        newCheckbox.setAttribute("onclick","check(this)")


        // make a label for this checkbox
        newLabel = document.createElement("label")
        // make the text content editable
        newLabel.setAttribute("contentEditable","true")
        newLabel.innerText = chave[chave.length -1]
        //make a new div to group the label and the checkbox input
        checkboxGroup = document.createElement('div')
        checkboxGroup.setAttribute("class","checkboxGroup")
        // store the values into the div checkboxgroup
        checkboxGroup.appendChild(newCheckbox)
        checkboxGroup.appendChild(newLabel)
        // put the new elements into checklist div"
        currentPeriod.querySelector(".checklist").appendChild(checkboxGroup)

    }else{
        // insert each task in the screen
        for (let i = 0 ; i < chave.length; i++){
        // create the new checkbox element
        newCheckbox = document.createElement("input")
        newCheckbox.setAttribute("type","checkbox")
        newCheckbox.setAttribute("onclick","check(this)")



        // make a label for this checkbox
        newLabel = document.createElement("label")
        // make the text content editable
        newLabel.setAttribute("contentEditable","true")
        newLabel.innerText = chave[i]
        //make a new div to group the label and the checkbox input
        checkboxGroup = document.createElement('div')
        checkboxGroup.setAttribute("class","checkboxGroup")
         // store the values into the div checkboxgroup
        checkboxGroup.appendChild(newCheckbox)
        checkboxGroup.appendChild(newLabel)
        // put the new elements into checklist div"
        currentPeriod.querySelector(".checklist").appendChild(checkboxGroup)

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
        // put the values from local storage in the screen
        showData("short-period")

    }else if(button.id == "button2"){
        mediumPeriod.push(newText);
        localStorage.setItem("medium-period", mediumPeriod)
        // put the values from local storage in the screen
        showData("medium-period")


    }else{
        longPeriod.push(newText);
        localStorage.setItem("long-period", longPeriod)
        // put the values from local storage in the screen
        showData("long-period")
    }
    textInput.value = ""
    
}
    // exclude task on tripple click
    let groupToExclude = document.querySelectorAll(".checkboxGroup");
    let elementExclude;
    
    for (let i =0; i< groupToExclude.length; i++){
        groupToExclude[i].addEventListener('click', function (evt) {
            if (evt.detail === 3) {
                //get the parent elements id
                let parentKey = this.parentNode.parentNode.id
                // find the respective Period
                let parentLocalStorage = localStorage.getItem(parentKey).split(/,(?! )/)
                console.log(parentLocalStorage)
                // get the value to remove from local storage
                elementExclude = this.querySelector("label").innerText
                for(let j=0; j < parentLocalStorage.length; j++){
                    //verify if the element clicked are the selected to exlude
                    if(parentLocalStorage[j].toLocaleLowerCase() === elementExclude.toLocaleLowerCase()){
                        console.log(parentLocalStorage[j])
                        // remove the element from the parentLocalStorage variable
                        parentLocalStorage.splice(j, 1)
                        console.log(parentLocalStorage)
                        // store the updated values into localstorage
                        localStorage.setItem(parentKey, parentLocalStorage);
                    }
                }
                // now update the screen removing the element from the current html. 
                this.remove()
            }
        });
    }

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
        document.getElementById("short-period").style.display = "block"
        document.getElementById("medium-period").style.display = "block"
        document.getElementById("long-period").style.display = "block"
    }
    }
    

    function changeVisibility(number){
        if (window.matchMedia("(max-width:478px)").matches) {
            if(number == 1){
                document.getElementById("short-period").style.display = "block"
                document.getElementById("medium-period").style.display = "none"
                document.getElementById("long-period").style.display = "none"
        
            }else if(number == 2){
                document.getElementById("short-period").style.display = "none"
                document.getElementById("medium-period").style.display = "block"
                document.getElementById("long-period").style.display = "none"
        
            }else{
                document.getElementById("short-period").style.display = "none"
                document.getElementById("medium-period").style.display = "none"
                document.getElementById("long-period").style.display = "block"
            }
        
        
        
        }else{
            document.getElementById("short-period").style.display = "block"
            document.getElementById("medium-period").style.display = "block"
            document.getElementById("long-period").style.display = "block"
        }
    }
   