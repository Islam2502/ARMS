let arrayLength = 30; // переменная будет изменяться в зависимости от данных с бэкенда (до 3000 строк)
let tableSize = 10; // изменяется, нужно будет реализовать смену через select - 10, 50, 100 строчек таблицы
let startIndex = 1;
let endIndex = 10; // 
let currentPage = 1;
let maxIndex = 3;
let maxPages = 10;

function getButtonNumTemplate(numPage) {
    return `<button class="page-selector" data-index="${numPage}">${numPage}</button>`
}

function getSomeEmptyTemplate() {
    return `<span class="some-empty"> </span>`
}


function pagination(currentPage, totalPages, maxVisiblePages = 5) {
    // Проверяем входные данные
    if (currentPage < 1 || currentPage > totalPages) {
      throw new Error("Неверные входные данные");
    }
  
    // Создаем массив для номеров страниц
    const pages = [];
  
    // Добавляем 1 в массив
    pages.push(1);
  
    // Если текущая страница не равна 1, добавляем "first" в массив
    if (currentPage !== 1) {
      pages.push("first");
    }
  
    // Определяем диапазон видимых страниц с каждой стороны текущей страницы
    const visiblePagesBefore = Math.floor(maxVisiblePages / 2);
    const visiblePagesAfter = maxVisiblePages - visiblePagesBefore - 1;
  
    // Добавляем в массив страницы до текущей, если они попадают в видимый диапазон
    for (let i = currentPage - visiblePagesBefore; i < currentPage; i++) {
      if (i > 1) {
        pages.push(i);
      }
    }
  
    // Добавляем текущую страницу в массив
    pages.push(currentPage);
  
    // Добавляем в массив страницы после текущей, если они попадают в видимый диапазон
    for (let i = currentPage + 1; i <= currentPage + visiblePagesAfter; i++) {
      if (i < totalPages) {
        pages.push(i);
      }
    }
  
    // Если текущая страница не равна последней, добавляем "last" в массив
    if (currentPage !== totalPages) {
      pages.push("last");
    }
  
    // Добавляем последнюю страницу в массив
    pages.push(totalPages);
  
    return pages;
  }

// С бэкенда мы получаем массив информации в json (представляющую из себя таблицу от 1 до 3000 строк)
// Представим, что мы получаем requestDataArr - таблица в массиве
// let arrayLength = requestDataArr.length
// tablesize будет также изменяем, добавить тэг select с выбором: 10, 50, 100
// maxPages = Math.ceil(arrayLength / tablesize)

let pageNums = document.getElementById("nums");
// let pageNum = document.getElementById("num");

pageNums.onclick = function(event) {
    console.log(event.target.dataset)
};

function renderPageNums() {
    pageNums.innerText = ''
    
    let pagesToRender = pagination(50, 90);
    console.log(pagesToRender)

    let uniquePagesToRender = [...new Set(pagesToRender)]
    console.log(uniquePagesToRender)
    for (let i = 0; i < uniquePagesToRender.length; i++) {
        if (uniquePagesToRender[i]=="first") {
            pageNums.insertAdjacentHTML("beforeend", getSomeEmptyTemplate());
        } else if (uniquePagesToRender[i]=="last") {
            pageNums.insertAdjacentHTML("beforeend", getSomeEmptyTemplate());

        } else {
            pageNums.insertAdjacentHTML("beforeend", getButtonNumTemplate(uniquePagesToRender[i]));

        }


    }
    
}

