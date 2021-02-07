const bookInput = document.querySelector('.book-input');
const authorInput = document.querySelector('.author-input');
const bookButton= document.querySelector('.book-button');
const table = document.querySelector('.table');
const bookCategory = document.querySelector('.category');
const bookPrio = document.querySelector('.priority');


bookButton.addEventListener('click', addBook);
table.addEventListener('click', deleteRow);

function addBook(event){
    event.preventDefault();
    
    let newRow = document.createElement('tr');

    const newCat = document.createElement('td');
    newCat.innerHTML = bookCategory.value;
    newRow.appendChild(newCat);

    const newBook = document.createElement('td');
    newBook.innerText = bookInput.value;
    newBook.classList.add('book-item');
    newRow.appendChild(newBook);

    const newAuthor = document.createElement('td');
    newAuthor.innerText = authorInput.value;
    newAuthor.classList.add('author-item');
    newRow.appendChild(newAuthor);

    const newPrio = document.createElement('td');
    newPrio.innerHTML = bookPrio.value;
    newRow.appendChild(newPrio);

    const dltButton = document.createElement('button');
    dltButton.innerHTML = '<i class="fas fa-trash"></i>';
    dltButton.classList.add("dlt-btn");
    newRow.appendChild(dltButton);

    table.appendChild(newRow);
    bookInput.value = "";
    authorInput.value = "";
}


function deleteRow(e){
    const item = e.target;
    
     if (item.classList[0] === "dlt-btn") {
        const todo = item.parentElement;
        todo.remove();
    }
} 

function sort(table, column, asc = true){
    const dirModifier = asc ? 1 : -1;
    const tBody = table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll("tr"));

    const sortedRows = rows.sort((a, b) => {
        const aColText = a.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();
        const bColText = b.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();

        return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
    });

    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }

    tBody.append(...sortedRows);

    table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
    table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-asc", asc);
    table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-desc", !asc);
}

document.querySelectorAll(".sortable th").forEach(headerCell => {
    headerCell.addEventListener("click", () => {
        const tableElement = headerCell.parentElement.parentElement.parentElement;
        const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
        const currentIsAscending = headerCell.classList.contains("th-sort-asc");

        sort(tableElement, headerIndex, !currentIsAscending);
    });
});

