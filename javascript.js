        let initialTable = {
            headerNames: ["Column 1", "Column 2", "Column 3"],
            data: [
                ["", "", ""],
                ["", "", ""],
                ["", "", ""]
            ]
        }

        let myTable = JSON.parse(JSON.stringify(initialTable));
        let usefulInteger = -1;

        function makeTable() {
            let tableHeader = document.getElementById('tables-header');
            let tableBody = document.getElementById('tables-body');
            let tableFooter = document.getElementById('tables-footer');
            let str = "";

            //fill in header from object
            str = "";
            let headerFields = myTable.headerNames; //an array of strings
            str += "<tr><th id='blank-th'></th>";
            for (let i = 0; i < headerFields.length; i++) {
                str += "<th id='header-" + (i + 1).toString() + "'>" + headerFields[i].toString() + "</th>";
            }
            str += "<th id='add-column' onclick='addColumn()'>+</th>";
            str += "</tr>";
            tableHeader.innerHTML = str;

            //fill in body data from object
            str = "";
            let bodyData = myTable.data; //an array of arrays
            let rowCount = bodyData.length;
            for (let i = 0; i < rowCount; i++) {
                str += "<tr><td id='row-" + (i + 1).toString() + "'>" + (i + 1).toString() + "</td>";
                let columnCount = bodyData[i].length;
                for (let j = 0; j < columnCount; j++) {
                    // str += "<td><input type='text' id='cell-" + (i + 1).toString() + "-" + (j + 1).toString() + "' value='" + bodyData[i][j].toString() + "' onchange='updateTableObject(this.id);'></td>";
                    // str += `<td id='cell-${i}-${j}'><input type='text' value='${bodyData[i][j]}'></td>`;
                    str += "<td><input type='text' id='cell-" + (i + 1).toString() + "-" + (j + 1).toString() + "' value='" + bodyData[i][j].toString() + "'></td>";
                }
                str += "</tr>";
            }
            tableBody.innerHTML = str;

            //make footer for additional controls
            str = "<tr><th id='add-row' onclick='addRow()'>+</th>";
            for (let i = 0; i < headerFields.length; i++) {
                str += "<th id='footer-" + (i + 1).toString() + "'></th>";
            }
            str += "</tr>";
            tableFooter.innerHTML = str;

            addListenersToTable();
            populateMoveColumnSelect(myTable);
            populateMoveRowSelect(myTable);
        }


        function addListenersToTable() {
            let tableHeaders = document.getElementsByTagName('th');
            let tableData = document.getElementsByTagName('td');

            for (th of tableHeaders) {
                th.addEventListener('click', (evt) => {
                    processTableClick(evt)
                });
            }
            for (td of tableData) {
                td.addEventListener('click', (evt) => {
                    processTableClick(evt)
                });
            }
        }



        function populateMoveColumnSelect(myTable) {
            let moveColumnSelect = document.getElementById('move-column');
            moveColumnSelect.options.length = 0;
            // moveColumnSelect.style.backgroundColor = "orange";
            let currentTableHeaders = myTable.headerNames; //an array of header names
            let tempIndex = 1;
            for (th of currentTableHeaders) {
                let option = document.createElement('option');
                option.value = tempIndex.toString() + "-" + th;
                option.text = tempIndex.toString() + "-" + th;;
                moveColumnSelect.add(option);
                tempIndex = tempIndex + 1;
            }
        }

        function populateMoveRowSelect(myTable) {
            // document.getElementById(selectbox).options.length = 0;
            let moveRowSelect = document.getElementById('move-row');
            moveRowSelect.options.length = 0;
            // moveRowSelect.style.backgroundColor = 'orange';
            for (let i = 0; i < myTable.data.length; i++) {
                let option = document.createElement('option');
                option.value = (i + 1).toString();
                option.text = (i + 1).toString();
                moveRowSelect.add(option);
            }
        }


        function processTableClick(evt) {
            let ids = (evt.target.id).split("-");
            //parse ids
            if ((ids[0] === "header") || (ids[0] === "footer")) { //process header cell clicked
                //get column number
                let columnNumber = ids[1];
                console.log("need to process header number" + columnNumber);
                usefulInteger = parseInt(columnNumber);
                document.getElementById('column-display-heading').innerHTML = "Column " + columnNumber + ": \"" + myTable.headerNames[usefulInteger - 1] + "\"";
                document.getElementById('edit-field-name-input').value=myTable.headerNames[usefulInteger - 1];
                
                showMain("main-header-form")
            } else if (ids[0] === "row") { //process row clicked
                //get row number
                let rowNumber = ids[1];
                console.log("need to process row number " + rowNumber);
                usefulInteger = parseInt(rowNumber);
                document.getElementById('row-display-heading').innerHTML = "Row: " + rowNumber;
                showMain("main-row-form");
            } else if (ids[0] === "cell") { //process data cell clicked
                //get row number
                let rowNumber = ids[1];
                //get column number
                let columnNumber = ids[2];
                console.log("need to process cell number with row: " + rowNumber + " and column number: " + columnNumber);
            } else if ((ids[0] === "add") && (ids[1] === "column")) { //process add column clicked
                console.log("need to process add column");
                //make name, if name exists, add _1 to it
            } else if ((ids[0] === "add") && (ids[1] === "row")) { //process add row clicked
                console.log("need to process add row");
                //addRow();  ---> had to put in html onlick="addRow()" because was firing twice
                //make new row with empty fields;
            }
        }


        function updateDataFromCurrentInputs() {
            //need to look and see what is currently in the table visibly
            //and rewrite the data to the data table
            for (let i = 0; i < myTable.data.length; i++) {
                for (let j = 0; j < myTable.headerNames.length; j++) {
                    let id = "cell-" + (i + 1).toString() + "-" + (j + 1).toString();
                    let thisCell = document.getElementById(id);
                    myTable.data[i][j] = thisCell.value;
                }
            }
            //makeTable();
        }
        //Header functions
        function updateHeaderName() {
            let input = document.getElementById("edit-field-name-input");
            myTable.headerNames[usefulInteger - 1] = input.value;
            usefulInteger = -1;
            input.value = "";
            makeTable(myTable);
            showMain('main-table');
        }
        let specialIndex = 0;

        //row functions
        function addRow() {
            updateDataFromCurrentInputs();
            let numberOfColumns = myTable.headerNames.length;
            let tempRow = [];
            for (let i = 0; i < numberOfColumns; i++) {
                tempRow.push("");
            }
            myTable["data"].push(JSON.parse(JSON.stringify(tempRow)));
            makeTable();
        }

        function deleteRow() {
            updateDataFromCurrentInputs();
            let rowIndex = usefulInteger - 1;
            let data = myTable.data;
            myTable.data.splice(rowIndex, 1);
            usefulInteger = -1;
            makeTable(myTable);
            showMain('main-table');
        }

        function copyRow() {
            updateDataFromCurrentInputs();
            let rowIndex = usefulInteger - 1;
            usefulInteger = -1;
            let rowToCopy = JSON.parse(JSON.stringify(myTable.data[rowIndex]));
            myTable.data.push(rowToCopy);
            makeTable();
            showMain('main-table');
        }

        function moveRow() {
            updateDataFromCurrentInputs();
            let rowIndex = usefulInteger - 1;
            usefulInteger = -1;
            let destinationIndex = parseInt(document.getElementById("move-row").value) - 1;
            let rowToMove = myTable.data.splice(rowIndex, 1)[0];
            myTable.data.splice(destinationIndex, 0, rowToMove);
            console.log(myTable.data);
            makeTable();
            showMain('main-table');
        }

        // column functions

        function deleteColumn() {
            updateDataFromCurrentInputs();
            let columnNumber = usefulInteger - 1;
            usefulInteger = -1;
            //use that number to remove header value
            myTable.headerNames.splice(columnNumber, 1);
            //loop through data table rows
            for (let row of myTable.data) {
                row.splice(columnNumber, 1);
            }
            makeTable();
            showMain('main-table')
        }

        function addColumn() {
            updateDataFromCurrentInputs();
            myTable.headerNames.push("new");
            for (let row of myTable.data) {
                row.push("");
            }
            makeTable();
        }

        function copyColumn() {
            updateDataFromCurrentInputs();
            let currentColumn = usefulInteger - 1;
            usefulInteger = -1;
            myTable.headerNames.push(myTable.headerNames[currentColumn]);
            for (let row of myTable.data) {
                row.push(row[currentColumn]);
            }
            makeTable();
            showMain('main-table');
        }

        function moveColumn() {
            updateDataFromCurrentInputs();
            let currentColumn = usefulInteger - 1;
            usefulInteger = -1;

            //get select option, split by "-" then take first token turn it into integer and subtact 1
            let destinationIndex = parseInt(document.getElementById("move-column").value.split("-")[0]) - 1;

            //move header
            let headerToMove = myTable.headerNames.splice(currentColumn, 1);
            myTable.headerNames.splice(destinationIndex, 0, headerToMove);

            //loop through rows of data and move column in each row
            for (let row of myTable.data) {
                let cellDataToMove = row.splice(currentColumn, 1);
                row.splice(destinationIndex, 0, cellDataToMove);
            }
            makeTable();
            showMain('main-table');
        }

        function calculateTotal() {
            updateDataFromCurrentInputs();
            let columnNumber = usefulInteger - 1;
            usefulInteger = -1;
            let total = 0;
            for (let row of myTable.data) {
                total = total + Number(row[columnNumber]);
            }
            if (confirm("The total is: " + total.toString() + "\nCopy to clipboard?")) {
                copyToClipBoard(total.toString());
            };
            showMain('main-table');
        }

        function calculateAverage() {
            updateDataFromCurrentInputs();
            let columnNumber = usefulInteger - 1;
            usefulInteger = -1;
            let total = 0;
            for (let row of myTable.data) {
                total = total + Number(row[columnNumber]);
            }
            let average = total / myTable.data.length;

            if (confirm("The average is: " + average.toString() + "\nCopy to clipboard?")) {
                copyToClipBoard(average.toString());
            }
            showMain('main-table');
        }


        function newTable() {
            console.log("newTable() called");
            if (confirm("Are you sure?  This will erase all current data.")) {
                myTable = JSON.parse(JSON.stringify(initialTable));
                makeTable();
                return myTable;
            }
        }

        function load() {

            console.log("load() called");

            let fileContents = "";
            let inputTypeIsFile = document.createElement('input');
            inputTypeIsFile.type = "file";
            inputTypeIsFile.accept = ".csv";
            inputTypeIsFile.addEventListener("change", function() {
                let inputFile = inputTypeIsFile.files[0];
                let fileReader = new FileReader();
                fileReader.onload = function(fileLoadedEvent) {
                    fileContents = fileLoadedEvent.target.result;
                    if (confirm("Use the first line as the header row?")) {
                        myTable = readCSV(fileContents, true);
                    } else {
                        myTable = readCSV(fileContents, false);
                    }
                    makeTable();
                };
                fileReader.readAsText(inputFile, "UTF-8");
            });
            inputTypeIsFile.click();
        }

        function save() {
            console.log("save() called");
            updateDataFromCurrentInputs();
            if (confirm("Include header as first line in csv file?")) {
                saveStringToTextFile(makeCSV(myTable, true), "csvTable" + getTodaysDate(), ".csv");
            } else {
                saveStringToTextFile(makeCSV(myTable, false), "csvTable" + getTodaysDate(), ".csv");
            }
        }

        function saveStringToTextFile(str1, basename = "myfile", fileType = ".txt") {
            let filename = basename + fileType;
            let blobVersionOfText = new Blob([str1], {
                type: "text/plain"
            });
            let urlToBlob = window.URL.createObjectURL(blobVersionOfText);
            let downloadLink = document.createElement("a");
            downloadLink.style.display = "none";
            downloadLink.download = filename;
            downloadLink.href = urlToBlob;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            downloadLink.parentElement.removeChild(downloadLink);
        }

        function copyToClipBoard(str) {
            //https://techoverflow.net/2018/03/30/copying-strings-to-the-clipboard-using-pure-javascript/
            let el = document.createElement('textarea');
            el.value = str;
            el.setAttribute('readonly', '');
            el.style = {
                position: 'absolute',
                left: '-9999px'
            };
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
            alert('Copied to Clipboard.');
            return (str);
        }


        //Date related functions for convience, uses same format as input type="date"
        function getTodaysDate() {
            let now = new Date();
            let day = ("0" + now.getDate()).slice(-2);
            let month = ("0" + (now.getMonth() + 1)).slice(-2);
            let today = now.getFullYear() + "-" + month + "-" + day;
            return today;
        }

        function getFirstDayOfThisMonthDate() {
            let now = new Date();
            let day = "01";
            let month = ("0" + (now.getMonth() + 1)).slice(-2);
            return now.getFullYear() + "-" + month + "-" + day;
        }

        function getLastDayOfThisMonthDate() {
            let now = new Date();
            let day = daysInThisMonth().toString();
            day = "0" + day;
            day = day.slice(-2);
            let month = ("0" + (now.getMonth() + 1)).slice(-2);
            return now.getFullYear() + "-" + month + "-" + day;
        }

        function daysInSomeMonth(someMonth, someYear) { //use jan month is 0
            return new Date(someYear, someMonth + 1, 0).getDate();
        }

        function daysInThisMonth() {
            thisDate = new Date();
            thisMonth = thisDate.getMonth();
            thisYear = thisDate.getYear();
            return daysInSomeMonth(thisMonth, thisYear);
        }
        ////Asks if you really want to close browser

        window.onbeforeunload = askConfirm;
        let needsSave = true;

        function askConfirm() {
            if (needsSave === true) {
                return "Did you remember to save your data?";
            } else {
                return;
            }
        }

        function showMain(id) {
            console.log("show mains called with " + id);
            let mains = document.getElementsByTagName('main');
            for (let main of mains) {
                console.log(main.id);
                main.style.display = "none";
            }
            document.getElementById(id).style.display = "flex";
        }

        function makeCSV(thisTable, header = true) {
            let csvString = "";
            let tempString = "";
            if (header === true) {
                //fill in header from object
                let headerFields = thisTable.headerNames;
                for (let headerField of headerFields) {
                    tempString = headerField.toString().replaceAll('"', '""'); //any interior " needs to be replaced with ""
                    csvString += "\"" + tempString + "\","; //surround each field with quotes
                }
                csvString = csvString.slice(0, -1) + "\n"; //remove last comma and add new line
            }
            //fill in body data
            let bodyData = thisTable.data;
            let rowCount = bodyData.length;
            for (let i = 0; i < rowCount; i++) {
                let columnCount = bodyData[i].length;
                for (let j = 0; j < columnCount; j++) {
                    tempString = bodyData[i][j].toString().replaceAll('"', '""'); //any interior " needs to be replaced with ""
                    csvString += "\"" + tempString + "\","; //surround each field with quotes
                }
                csvString = csvString.slice(0, -1) + "\n"; //remove last comma and add new line
            }
            console.log(csvString);
            return (csvString);
        }

        function readCSV(csvString, header = true) {
            //trim string
            csvString = csvString.trim();

            //make lines out of csvString
            let lines = csvString.split("\n");

            let newCSVArrayOfArrays = [];

            for (let i = 0; i < lines.length; i++) {
                //trim whitespace of each line
                lines[i] = lines[i].trim();

                //remove leading and trailing " character
                lines[i] = lines[i].slice(1, -1);

                //split by ","
                let tempRowArray = lines[i].split('","');

                //make randomString
                let randomString = tokenMaker(32);
                while (lines[i].includes(randomString) === true) { //tests to see if randomString already in line (seems unlikely)
                    randomString = tokenMaker(32);
                };

                //join by a randome string (make real random string here)
                let newString = tempRowArray.join(randomString);

                //look for the double quotes around randomString that is where the "," ie "","" (CSV convention) was
                newString = newString.replaceAll('"' + randomString + '"', '","');
                //split by randomString without the quotes
                tempRowArray = newString.split(randomString);

                //for each element in the row of elements, replace the "" with " CSV convention
                for (let j = 0; j < tempRowArray.length; j++) {
                    tempRowArray[j] = tempRowArray[j].replaceAll('""', '"');
                }

                // console.log(tempRowArray);
                newCSVArrayOfArrays.push(tempRowArray); //add each row to the new array
            }

            let finalTable = {}
                // finalTable["headerNames"] = [];


            if (newCSVArrayOfArrays.length > 0) {
                if (header === true) {
                    //finalTable["headerNames"] = JSON.parse(JSON.stringify(newCSVArrayOfArrays[0]));
                    finalTable["headerNames"] = newCSVArrayOfArrays[0];
                    if (newCSVArrayOfArrays.length > 1) {
                        let tempRow = [];
                        finalTable["data"] = [];
                        for (let i = 1; i < newCSVArrayOfArrays.length; i++) {
                            // finalTable["data"].push(JSON.parse(JSON.stringify(newCSVArrayOfArrays[i])));
                            finalTable["data"].push(newCSVArrayOfArrays[i]);
                        }
                    }
                } else {
                    finalTable["headerNames"] = [];
                    for (let i = 0; i < newCSVArrayOfArrays[0].length; i++) {
                        finalTable["headerNames"].push("Column-" + (i + 1).toString());
                    }
                    finalTable["data"] = newCSVArrayOfArrays;
                }
            }


            return JSON.parse(JSON.stringify(finalTable));
        }

        function tokenMaker(intSize) {
            let token = "";
            let specialString = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            let index = 0;
            for (let i = 0; i < intSize; i++) {
                token += specialString[Math.floor(Math.random() * specialString.length)];

            }
            console.log(token);
            return token;
        }

        function showRules() {
            alert('FORMATTING RULES:\n\nWhen Saving:\n1) All cells are quoted text.\n2) Interior double quotes in cells are converted like this: "->""\n\nIf loading CSV from other apps:\n1) Cells should all be text type.\n2) Quote all text strings when saving.')
        }

        function copyCSVToClipboard() {
            updateDataFromCurrentInputs();
            let thisResult = "";
            if (confirm("Include header as first line?")) {
                thisResult = copyToClipBoard(makeCSV(myTable, true));
            } else {
                thisResult = copyToClipBoard(makeCSV(myTable, false));
            }
            return thisResult;
        }

        makeTable(myTable);
        showMain('main-table');



        // console.log("HERE TEST\n----------------------------");
        // myTable = {
        //     headerNames: ["Field1", "\",\"Field2 is \"super cool\" and I like using \",\" because \",\"  is really cool   so you should really try \",\""],
        //     data: [
        //         [0, 2],
        //         [1, 3]
        //     ]
        // }

        // let aCSVTable = makeCSV(myTable, true);
        // console.log(aCSVTable);

        // console.log("SECOND TEST\n----------------");
        // console.log(myTable);

        // let anotherNewTable = readCSV(aCSVTable, false);
        // console.log(anotherNewTable);

        // myTable = anotherNewTable;
        // makeTable();
