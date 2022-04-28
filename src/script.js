const timetable_table = document.getElementById("timetable");


/**
 * Injects a table with time into index.html
 */
function makeTable() {
    for (let i = 7; i <= 24; i++) {
        let newRow = makeRow(toTwelveHour(i));
        timetable_table.appendChild(newRow);
    }
}


/**
 * returns a string representing 12hr time
 * @param {integer} number 
 */
function toTwelveHour(number) {
    let new_num = (number + 11) % 12 + 1;
    // check if am or pm 
    let return_str = new_num + ":00";
    if (number <= 11 || number == 24) {
        return_str += " AM";
    }
    else {
        return_str += " PM";
    }
    return return_str;
}


/**
 * Makes a table row required used in hte makeTable function
 */
function makeRow(str_time) {
    const tableRow = document.createElement("tr");
    const timeTh = document.createElement("th");
    timeTh.innerText = str_time;
    const timeThEmpty = document.createElement("th");
    // add the 'th' elements to the 'tr'
    tableRow.appendChild(timeTh);
    tableRow.appendChild(timeThEmpty);
    return tableRow;
}


function main() {
    // let test = makeRow("8:00");
    // timetable_table.appendChild(test);
    makeTable();
}

main()