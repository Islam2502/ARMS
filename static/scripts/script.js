const body = document.querySelector("body"),
    sidebar = document.querySelector(".sidebar"),
    toggle = document.querySelector(".toggle"),
    search = document.querySelector(".search-box"),
    modeSwitch = document.querySelector(".toggle-switch"),
    modeText = document.querySelector(".mode-text");

toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close")
});

modeSwitch.addEventListener("click", () => {
    body.classList.toggle("dark");

if (body.classList.contains("dark")) {
    modeText.innerText = "Светлая тема"
    localStorage.setItem("darkMode", "true");
} else {
    modeText.innerText = "Темная тема"
    localStorage.setItem("darkMode", "false");
}
});

// Проверка, была ли установлена темная тема при предыдущем посещении
const isDarkMode = localStorage.getItem("darkMode") === "true";

// Установка класса "dark" для body, если темная тема была установлена ранее
if (isDarkMode) {
  body.classList.add("dark");
}


// Здесь будет скрипт по поиску значений в таблице
var searchBar = document.querySelector(".search-input");
var category = document.querySelector(".category");
var tableBody = document.querySelector(".table-data");
var tableData = tableBody.innerHTML;
// console.log(searchBar, category);

// search func
const Search = () => {
    tableBody.innerHTML = tableData;
    let rows = tableBody.children;
    console.log(rows)

    if(searchBar.value.length < 1 || category.value == "0") {
        return;
    }

    let filteredRows = "";
    // console.log(category.value)
    let categoryNumber = Number(category.value);
    // console.log(categoryNumber)
    let searchText = searchBar.value.toLowerCase();

    for (let i = 0; i < rows.length; i++) {
        const currentRowText = rows[i].children[categoryNumber].innerText
        // console.log("currentRowText :" + currentRowText)

        // console.log(currentRowText.indexOf(searchText))
        if(currentRowText.indexOf(searchText) > -1) {
            filteredRows += rows[i].outerHTML;
            // console.log(filteredRows)
        }

        tableBody.innerHTML = filteredRows;

    }

}

// searchBar.addEventListener("click", Search)
searchBar.addEventListener("input", Search)
category.addEventListener("change", Search)

// searchBar.addEventListener("input", Search)
// category.addEventListener("change", Search)


//TableSort Part
/** 
*@param {HTMLTableElement} table the table sotr
*@param {number} column The index of the column to sort
*@param {boolean} asc Determines if the sorting will be in ascending
*/

function sortTableByColumn(table, column, asc = true) {
    const dirModifier = asc ? 1 : -1;
    const tBody = table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll("tr"))

    // Sort each row
    const sortedRows = rows.sort((a, b) => {
        const aColText = a.querySelector(`td:nth-child(${column + 1 })`).textContent.trim();
        const bColText = b.querySelector(`td:nth-child(${column + 1 })`).textContent.trim();

        // console.log("a", aColText);
        // console.log("b", bColText);

        return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier)

    });

    // Remove all existing TRs from the table
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild)
    }

    // Re-add the newly sorted rows
    tBody.append(...sortedRows)

    // Remember how rhe column is currently sorted
    table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
    table.querySelector(`th:nth-child(${ column + 1 })`).classList.toggle("th-sort-asc", asc);
    table.querySelector(`th:nth-child(${ column + 1 })`).classList.toggle("th-sort-desc", !asc);
}

// sortTableByColumn(document.querySelector("table"), 0)
document.querySelectorAll(".request-table th").forEach(headerCell => {
    headerCell.addEventListener("click", ()=> {
        const tableElement = headerCell.parentElement.parentElement.parentElement;
        const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
        const currentIsAscending = headerCell.classList.contains("th-sort-asc");

        sortTableByColumn(tableElement, headerIndex, !currentIsAscending)
    })
})
    