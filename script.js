const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

const addBookBtn = document.getElementById('addBookBtn');
const modalOverlay = document.getElementById('modalOverlay');

addBookBtn.addEventListener('click', function () {
    modalOverlay.classList.add('open');
});

console.log(document.getElementById('addBookBtn'));
console.log(document.getElementById('modalOverlay'));