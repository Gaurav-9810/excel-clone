let rows = 50;
let cols = 50;

let addressColCont = document.querySelector(".address-col-cont");
let addressRowCont = document.querySelector(".address-row-cont");
let cellsCont = document.querySelector(".cells-cont");
let addressBar = document.querySelector(".address-bar");

for (let i = 0; i < rows; i++) {
    let addressCol = document.createElement("div");
    addressCol.setAttribute("class", "address-col");
    addressCol.innerText = i + 1;
    addressColCont.appendChild(addressCol);
}

for (let i = 0; i < cols; i++) {
    let addressRow = document.createElement("div");
    addressRow.setAttribute("class", "address-row");
    let n = i + 1;
    let ans = "";
    let st=columnname(n,ans);
   /* while (n > 0) {
        let rem = n % 26;
        if (rem == 0) {
            ans = "z" + ans;
            n = Math.floor(n / 26) - 1;
        }
        else {
            ans = String.fromCharCode(rem - 1 + 65) + ans;
            n = Math.floor(n / 26);
        }
    }*/
    addressRow.innerText = st;
    addressRowCont.appendChild(addressRow);
}

for (let i = 0; i < rows; i++) {
    let rowCont = document.createElement("div");
    rowCont.setAttribute("class", "row-cont");
    for (let j = 0; j < cols; j++) {
        let cell = document.createElement("div");
        cell.setAttribute("class", "cell");
        cell.setAttribute("contenteditable", "true");
        cell.setAttribute("spellcheck", "false");

        // Attributes for cell and storage identification
        cell.setAttribute("rid", i);
        let n = j + 1;
        let ans = "";
        let s=columnname(n,ans);
        /*while (n > 0) {
            let rem = n % 26;
            if (rem == 0) {
                ans = "z" + ans;
                n = Math.floor(n / 26) - 1;
            }
            else {
                ans = String.fromCharCode(rem - 1 + 65) + ans;
                n = Math.floor(n / 26);
            }
        }*/
        cell.setAttribute("cid", j);

        rowCont.appendChild(cell);
        addListenerForAddressBarDisplay(cell, i, s);
    }
    cellsCont.appendChild(rowCont);
}
//address bar value 
function addListenerForAddressBarDisplay(cell, i, s) {
    cell.addEventListener("click", (e) => {
        let rowID = i + 1;
        let colID = s;
        addressBar.value = `${colID}${rowID}`;
    })
}
//gives column name
function columnname(n,ans){
    while (n > 0) {
        let rem = n % 26;
        if (rem == 0) {
            ans = "Z" + ans;
            n = Math.floor(n / 26) - 1;
        }
        else {
            ans = String.fromCharCode(rem - 1 + 65) + ans;
            n = Math.floor(n / 26);
        }
    }
    return ans;
}

//by default click 
/*let firstcell= document.querySelector(".cell");
firstcell.click();*/
