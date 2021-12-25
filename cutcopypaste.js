let ctrlKey;
//helps to know condition of ctrl key
document.addEventListener("keydown", (e) => {
    ctrlKey = e.ctrlKey;
})
document.addEventListener("keyup", (e) => {
    ctrlKey = e.ctrlKey;
})

for (let i =0;i < rows;i++) {
    for (let j = 0;j < cols;j++) {
        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        handleSelectedCells(cell);
    }
}

let copyBtn = document.querySelector(".copy");
let cutBtn = document.querySelector(".cut");
let pasteBtn = document.querySelector(".paste");
// Select cells range
let rangeStorage = [];
function handleSelectedCells(cell) {
    cell.addEventListener("click", (e) => {
        if (!ctrlKey) return;
        if (rangeStorage.length >= 2) {
            //deleting previous selection and starting fresh
            defaultSelectedCellsUI();//used to decolour the selected cells
            rangeStorage = [];//empty the previous range
        }

        // UI
        cell.style.border = "2px solid #218c74";

        let rid = Number(cell.getAttribute("rid"));
        let cid = Number(cell.getAttribute("cid"));
        rangeStorage.push([rid, cid]);
    })
}

function defaultSelectedCellsUI() {
    for (let i = 0;i < rangeStorage.length;i++) {
        let cell = document.querySelector(`.cell[rid="${rangeStorage[i][0]}"][cid="${rangeStorage[i][1]}"]`);
        cell.style.border = "1px solid lightgrey";
    }
}

let copyData = [];//storing cells to be copied
copyBtn.addEventListener("click", (e) => {
    copyData = [];

    let [strow, stcol, endrow, endcol] = [ rangeStorage[0][0], rangeStorage[0][1], rangeStorage[rangeStorage.length-1][0], rangeStorage[rangeStorage.length-1][1] ];

    for (let i = strow;i <= endrow;i++) {
        let copyRow = [];
        for (let j = stcol;j <= endcol;j++) {
            let cellProp = sheetDB[i][j];
            copyRow.push(cellProp);
        }
        copyData.push(copyRow);
    }

    defaultSelectedCellsUI();
})


pasteBtn.addEventListener("click" ,(e) => {
    // Past cells data 
    let rowDiff = Math.abs(rangeStorage[0][0] - rangeStorage[rangeStorage.length-1][0]);
    let colDiff = Math.abs(rangeStorage[0][1] - rangeStorage[rangeStorage.length-1][1]);

    // Target
    let address = addressBar.value;
    let [stRow, stCol] = decodeRIDCIDFromAddress(address);

    let targetRow = stRow+rowDiff;
    let targetCol = stCol+colDiff;
    // r -> refers copydata row
    // c -> refers copydata col
    //r and c are taken because it may start from anywhere and may cross our grid 
    for (let i = stRow,r = 0;i <= targetRow;i++,r++) {
        for (let j = stCol,c = 0;j <= targetCol;j++,c++) {
            let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
            if (!cell) continue;//in case we are out of grid

            // DB
            let data = copyData[r][c];
            let cellProp = sheetDB[i][j];

            cellProp.value = data.value;
            cellProp.bold = data.bold;
            cellProp.italic = data.italic;
            cellProp.underline = data.underline;
            cellProp.fontSize = data.fontSize;
            cellProp.fontFamily = data.fontFamily;
            cellProp.fontColor = data.fontColor;
            cellProp.BGcolor = data.BGcolor;
            cellProp.alignment = data.alignment;

            // UI
            cell.click();
        }
    }
})

cutBtn.addEventListener("click", (e) => {
    let [strow, stcol, endrow, endcol] = [ rangeStorage[0][0], rangeStorage[0][1], rangeStorage[rangeStorage.length-1][0], rangeStorage[rangeStorage.length-1][1] ];
    let response = confirm("Your data for these cells will be removed permanently, Are you sure?");
    if (response === false) return;
    for (let i = strow;i <= endrow;i++) {
        for (let j = stcol;j <= endcol;j++) {
            let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);

            // DB
            let cellProp = sheetDB[i][j];
            cellProp.value = "";
            cellProp.bold = false;
            cellProp.italic = false;
            cellProp.underline = false;
            cellProp.fontSize = 14;
            cellProp.fontFamily = "monospace";
            cellProp.fontColor = "#000000";
            cellProp.BGcolor = "#000000";
            cellProp.alignment = "left";

            // UI
            cell.click();
        }
    }

    defaultSelectedCellsUI();
})