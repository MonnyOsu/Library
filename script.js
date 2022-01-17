const library = document.getElementById('library-container');
const newBookBtn = document.getElementById('new-book');
const newBookForm = document.getElementById('popup-container')
const newBookFormClose = document.getElementById('new-book-close-button');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');
const selectInput = document.getElementById('has-read');
const submitInput = document.getElementById('submit-btn');
const form = document.getElementById('form');
const styles = getComputedStyle(document.body);


class Book {
    constructor(title, author, pages, haveRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.haveRead = haveRead;
    }
}

// let myLibrary = [];
let myLibraryStorage = localStorage.getItem('myLibrary')
    ? JSON.parse(localStorage.getItem('myLibrary'))
    : [];


function getNewBookInformation() {
    let title = titleInput.value;
    let author = authorInput.value;
    let pages = pagesInput.value;
    let haveRead = selectInput.options[selectInput.selectedIndex].text;
    let newBook = new Book(title, author, pages, haveRead);
    myLibraryStorage.push(newBook);
    localStorage.setItem("myLibrary", JSON.stringify(myLibraryStorage));
    console.log(myLibraryStorage)
}

function closeForm() {
    newBookForm.classList.remove('popup-container');
    newBookForm.classList.add('popup-container-hidden');
    form.reset();

}

function clearLibrary() {
    library.innerHTML = ''
}

function createLibrary() {
    clearLibrary();
    let bookNumber = 0;

    for (let book of myLibraryStorage) {

        let bookContainer = document.createElement('div');
        let bookHeading = document.createElement('div');
        let authorDiv = document.createElement('div');
        let pagesDiv = document.createElement('div');
        let buttonContainer = document.createElement('div');
        let readToggle = document.createElement('button');
        let removeBtn = document.createElement('button');

        bookContainer.dataset.index = bookNumber;
        bookHeading.textContent = `Title: ${book.title}`;
        authorDiv.textContent = `Author: ${book.author}`;
        pagesDiv.textContent = `Pages: ${book.pages}`;
        readToggle.textContent = book.haveRead;
        removeBtn.textContent = 'Remove';

        library.appendChild(bookContainer);
        bookContainer.appendChild(bookHeading);
        bookContainer.appendChild(authorDiv);
        bookContainer.appendChild(pagesDiv);
        bookContainer.appendChild(buttonContainer);
        buttonContainer.appendChild(readToggle);
        buttonContainer.appendChild(removeBtn);

        bookContainer.classList.add('book-card')
        bookHeading.classList.add('title');
        authorDiv.classList.add('author');
        pagesDiv.classList.add('pages');
        readToggle.classList.add('book-card-button');
        removeBtn.classList.add('book-card-button');
        removeBtn.classList.add('book-card-button');
        buttonContainer.classList.add('book-card-button-container');

        if (readToggle.textContent == 'Read') {
            readToggle.classList.add('has-read');
        } else {
            readToggle.classList.add('not-read');
        }

        readToggle.addEventListener('click', () => {
            if (readToggle.textContent == 'Read') {
                readToggle.textContent = 'Not Read';
                readToggle.classList.remove('has-read');
                readToggle.classList.add('not-read');
            } else {
                readToggle.textContent = 'Read';
                readToggle.classList.remove('not-read');
                readToggle.classList.add('has-read');

            }
        })

        bookNumber++
        document.getElementById('form').reset();


        removeBtn.addEventListener('click', (e) => {
            let removeIndex = e.target.parentElement.parentElement.dataset.index;
            console.log(removeIndex);
            myLibraryStorage.splice(removeIndex, 1);
            localStorage.setItem("myLibrary", JSON.stringify(myLibraryStorage));
            createLibrary();
        })


    }

}

window.addEventListener('load', createLibrary);

newBookBtn.addEventListener('click', () => {
    newBookForm.classList.add('popup-container');
    newBookForm.classList.remove('popup-container-hidden');
})

newBookFormClose.addEventListener('click', () => {
    newBookForm.classList.remove('popup-container');
    newBookForm.classList.add('popup-container-hidden');
})


form.addEventListener("submit", (e) => {
    e.preventDefault();
    getNewBookInformation();
    closeForm();
    createLibrary();
    document.getElementById('form').reset();
});







