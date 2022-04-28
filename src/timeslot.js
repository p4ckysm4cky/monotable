// W3school strat to draggable div
// Make the DIV element draggable:
// dragElement(document.getElementById("mydiv"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}



// This part is my own code 
const divPage = document.getElementById("page");
const createTime_button = document.getElementById("createTime");
const inputTime_input = document.getElementById("inputTime");

// radio buttons
const radioBreak = document.getElementById("radioBreak");
const radioWork = document.getElementById("radioWork");
const radioOther = document.getElementById("radioOther");

/**
 * The function just adds an evenlistener to the input for 
 * making 'timeslots'
 */
function timeSlotInput() {
    // when button is clicked
    createTime_button.addEventListener("click", () => {
        let type = "";
        // Lazy method
        if (radioBreak.checked) {
            type = "slotBreak";
        }
        else if (radioWork.checked) {
            type = "slotWork";
        }
        else {
            type = "slotOther";
        }
        text = inputTime_input.value;
        inputTime_input.value = "";
        addTimeSlot(text, type);
    })
    // when input is entered
    inputTime_input.addEventListener("keypress", e => {
        if (e.key == "Enter") {
            let type = "";
            // Lazy method
            if (radioBreak.checked) {
                type = "slotBreak";
            }
            else if (radioWork.checked) {
                type = "slotWork";
            }
            else {
                type = "slotOther";
            }
            text = inputTime_input.value;
            inputTime_input.value = "";
            addTimeSlot(text, type);
        }
    })
}


/**
 * Creates a draggable div to the DOM
 * @param {String} text represents the description of the timeslot
 * @param {String} type represents the css class it is part for color coding
 */
function addTimeSlot(text, type) {
    const header = document.createElement("div");
    // too lazy to use an actual way to create unique id
    // to make sure the drag element doesn't break
    // may refactor, to remove this 
    const randomNum = Math.floor(Math.random() * 10000)
    header.className = "slotHeader";
    header.id = "t" + randomNum +"header";

    const timeslot = document.createElement("div");
    timeslot.className = "timeslot " + type;
    timeslot.id = "t" + randomNum;

    timeslot.appendChild(header);
    timeslot.append(text);

    // ctrl + click = delete
    timeslot.addEventListener("click", (e) => {
        if (e.ctrlKey) {
            e.target.remove();
        }
    })
    divPage.appendChild(timeslot);
    dragElement(timeslot);
}


timeSlotInput();
