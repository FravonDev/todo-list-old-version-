let shortPeriod = [];
let mediumPeriod = [];
let longPeriod = [];

// when page load change the number of visible cards to 1 for smaller screens
let mediaquery = window.matchMedia("(max-width: 478px)");
if (mediaquery.matches) {
  // If media query matches
  document.getElementById("short-period").style.display = "block";
  document.getElementById("medium-period").style.display = "none";
  document.getElementById("long-period").style.display = "none";
}

//  when resize the page change  number of visible cards to 1 if we are in smaller screens
//  and let 3 if we are in the biggest
mediaquery.onchange = (e) => {
  if (e.matches) {
    document.getElementById("short-period").style.display = "block";
    document.getElementById("medium-period").style.display = "none";
    document.getElementById("long-period").style.display = "none";
  } else {
    document.getElementById("short-period").style.display = "block";
    document.getElementById("medium-period").style.display = "block";
    document.getElementById("long-period").style.display = "block";
  }
};

verifyLocalStorage();

// listen for changes and then update
document.querySelectorAll(".period").forEach((element) => {
  // verify ifs not empty
  // verify for changes inside the element (for a update on html content)
  element.addEventListener("DOMSubtreeModified", function () {
    // call the update function foreach card
    // loop though all the element in LocalStorage and get the last index for update

    getlabels();
  });
});

// when people click in "como usar", open the modal
let howToUse = document.querySelector(".openModal");

howToUse.onclick = function () {
  event.preventDefault();
  modal = document.querySelector("#modal");
  modal.classList.toggle("invisible");
  showOrHideModal();
};

function showOrHideModal() {
  modal = document.querySelector("#modal");

  modal.onclick = function () {
    modal.classList.toggle("invisible");
  };
}

function getlabels() {
  let allLabels = document.getElementsByClassName("checkboxGroup");

  for (label of allLabels) {
    // put the event listener on each label
    label.addEventListener("input", function () {
      // call the udpate label function

      updateLabelText(this.querySelector("label"));
    });
  }
}

// localStorage.clear()

function updateLabelText(content) {
  // get the current period to get the correct elements for update.
  let period = content.parentNode.parentNode.parentNode.id;

  // get all the values in localStorage
  let chave = localStorage.getItem(period);
  //convert to an array separating the values by comma(,)
  chave = chave.split(/,(?! )/);

  console.log(content.innerText);
  for (let j = 0; j < chave.length; j++) {
    // get the index of the content parent element
    var ParentIndex = [].indexOf.call(
      content.parentNode.parentNode.childNodes,
      content.parentNode
    );

    // var listOfElements = Array.prototype.slice.call(node.parentElement.children)
    // Now it's an Array. indexInList = listOfElements.indexOf(node);

    // if index of content element equals to chave index
    if (j == ParentIndex) {
      // index of content

      chave[j] = content.innerText;
    }

    localStorage.setItem(period, chave);
  }

  // todo
}

function verifyLocalStorage() {
  // verify the label

  if (localStorage.getItem("short-period")) {
    shortPeriod = [localStorage["short-period"]];
    showData("short-period", "storedData");
  }

  if (localStorage.getItem("medium-period")) {
    mediumPeriod = [localStorage["medium-period"]];
    showData("medium-period", "storedData");
  }

  if (localStorage.getItem("long-period")) {
    longPeriod = [localStorage["long-period"]];
    showData("long-period", "storedData");
  }

  // verify the checkbox
  cardsToBeVerified = ["short-period", "medium-period", "long-period"];
  for (let i = 0; i < cardsToBeVerified.length; i++) {
    let theFirsTelement = document.querySelector(`#${cardsToBeVerified[i]}`);
    // verify if this checkbox have some checkbox
    if (theFirsTelement.querySelector('input[type="checkbox"]')) {
      theFirsTelement = theFirsTelement.querySelector('input[type="checkbox"]');
      check(theFirsTelement, "old");
    }
  }
}

function check(checkbox, state = "new") {
  let currentPeriod = checkbox.parentNode.parentNode.parentNode.id;
  //verify if we have or not checkbox data into localStorage
  if (!localStorage.getItem(`checkbox${currentPeriod}`)) {
    // alert('we dont have');
    // create one if we haven't
    let checkboxIsChecked = checkbox.checked;
    localStorage.setItem(`checkbox${currentPeriod}`, checkboxIsChecked);
  }
  // get all checkbox elements in the current checklist
  let allCheckboxInCard = document.getElementById(currentPeriod);
  allCheckboxInCard = allCheckboxInCard.getElementsByClassName("checkboxGroup");

  //local to store only the state of each checkbox
  let allNewCheckbox = [];
  // iterate through this element to verify if the checkbox are not duplicated or not exists
  for (let i = 0; i < allCheckboxInCard.length; i++) {
    // get the state of checkbox input inside of each checkbox div
    allNewCheckbox.push(
      allCheckboxInCard[i].querySelector('input[type="checkbox"]').checked
    );
  }
  // Verify if the value is new or old

  // if is a old value just load thoses values
  if (state != "new") {
    // put the new values from "allNewCheckbox" into localstorage
    //take the data from localstorage
    allCheckboxState = localStorage.getItem(`checkbox${currentPeriod}`);
    allCheckboxState = allCheckboxState.split(/,(?! )/);

    for (let j = 0; j < allCheckboxInCard.length; j++) {
      // verify if selected checkbox is the same of this especific "j" element
      // iterate by all elements
      if (`${allCheckboxState[j]}` == "true") {
        allCheckboxInCard[j].firstChild.checked = true;
      } else {
        allCheckboxInCard[j].firstChild.checked = false;
      }

      //by each element, set this element, to this correspondent element in local storage
    }
    // now we need put the checkbox state in the screen

    return 0;
  }
  // if's a new value just update
  localStorage.setItem(`checkbox${currentPeriod}`, allNewCheckbox);
}

function showData(period, state = "new") {
  let chave = localStorage.getItem(period);
  //convert to an array separating the values by comma(,)
  chave = chave.split(/,(?! )/);
  // add to screen
  let currentPeriod = document.getElementById(period);
  let currentCheckbox = currentPeriod.querySelector(".checklist");
  if (state == "new") {
    // create the new checkbox element
    newCheckbox = document.createElement("input");
    newCheckbox.setAttribute("type", "checkbox");
    newCheckbox.setAttribute("input", "check(this)");

    // make a label for this checkbox
    newLabel = document.createElement("label");
    // make the text content editable
    newLabel.setAttribute("contentEditable", "true");

    newLabel.innerText = chave[chave.length - 1];
    //make a new div to group the label and the checkbox input
    checkboxGroup = document.createElement("div");
    checkboxGroup.setAttribute("class", "checkboxGroup");
    // store the values into the div checkboxgroup
    checkboxGroup.appendChild(newCheckbox);
    checkboxGroup.appendChild(newLabel);
    // put the new elements into checklist div"
    currentPeriod.querySelector(".checklist").appendChild(checkboxGroup);
  } else {
    // insert each task in the screen
    for (let i = 0; i < chave.length; i++) {
      // create the new checkbox element
      newCheckbox = document.createElement("input");
      newCheckbox.setAttribute("type", "checkbox");
      newCheckbox.setAttribute("onclick", "check(this)");

      // make a label for this checkbox
      newLabel = document.createElement("label");
      // make the text content editable
      newLabel.setAttribute("contentEditable", "true");

      // newLabel.setAttribute("onInput", "updateLabelText(this)");
      newLabel.innerText = chave[i];
      //make a new div to group the label and the checkbox input
      checkboxGroup = document.createElement("div");
      checkboxGroup.setAttribute("class", "checkboxGroup");
      // store the values into the div checkboxgroup
      checkboxGroup.appendChild(newCheckbox);
      checkboxGroup.appendChild(newLabel);
      // put the new elements into checklist div"
      currentPeriod.querySelector(".checklist").appendChild(checkboxGroup);
    }
  }
}

function addTask(button) {
  debugger;
  // get the parent element
  let buttonParent = button.parentNode.parentNode;
  // get the div to make and store the new task
  let currentChecklist = buttonParent.querySelector(".checklist");
  let textInput = buttonParent.querySelector(".taskInput");
  let currentCache = buttonParent.querySelector(".checklist");

  if (!textInput.value) {
    // disable button when input is empty
    textInput.setAttribute("placeholder", "input required");
    return 0;
  }

  let newText = textInput.value;

  //make the own cardStore variable to store the data
  if (button.id == "button1") {
    shortPeriod.push(newText);
    localStorage.setItem("short-period", shortPeriod);
    // put the values from local storage in the screen
    showData("short-period");
  } else if (button.id == "button2") {
    mediumPeriod.push(newText);
    localStorage.setItem("medium-period", mediumPeriod);
    // put the values from local storage in the screen
    showData("medium-period");
  } else {
    longPeriod.push(newText);
    localStorage.setItem("long-period", longPeriod);
    // put the values from local storage in the screen
    showData("long-period");
  }
  textInput.value = "";
}
// exclude task on tripple click
let groupToExclude = document.querySelectorAll(".checkboxGroup");
let elementExclude;

for (let i = 0; i < groupToExclude.length; i++) {
  groupToExclude[i].addEventListener("click", function (evt) {
    if (evt.detail === 3) {
      //get the parent elements id
      let parentKey = this.parentNode.parentNode.id;
      // find the respective Period
      let parentLocalStorage = localStorage.getItem(parentKey).split(/,(?! )/);
      // get the value to remove from local storage
      elementExclude = this.querySelector("label").innerText;
      for (let j = 0; j < parentLocalStorage.length; j++) {
        //verify if the element clicked are the selected to exlude
        if (
          parentLocalStorage[j].toLocaleLowerCase() ===
          elementExclude.toLocaleLowerCase()
        ) {
          // remove the element from the parentLocalStorage variable
          parentLocalStorage.splice(j, 1);
          // store the updated values into localstorage
          localStorage.setItem(parentKey, parentLocalStorage);
        }
      }
      // now update the screen removing the element from the current html.
      this.remove();
    }
  });
}

function inputRequired(ipt) {
  console.log(ipt);
}

function changeVisibility(number) {
  if (window.matchMedia("(max-width:478px)").matches) {
    if (number == 1) {
      document.getElementById("short-period").style.display = "block";
      document.getElementById("medium-period").style.display = "none";
      document.getElementById("long-period").style.display = "none";
    } else if (number == 2) {
      document.getElementById("short-period").style.display = "none";
      document.getElementById("medium-period").style.display = "block";
      document.getElementById("long-period").style.display = "none";
    } else {
      document.getElementById("short-period").style.display = "none";
      document.getElementById("medium-period").style.display = "none";
      document.getElementById("long-period").style.display = "block";
    }
  } else {
    document.getElementById("short-period").style.display = "block";
    document.getElementById("medium-period").style.display = "block";
    document.getElementById("long-period").style.display = "block";
  }
}
