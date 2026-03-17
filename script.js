const myLibrary = [];

function Book(title, author, pages, read, date) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.date = date;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, read, date) {
    const newBook = new Book(title, author, pages, read, date);
    myLibrary.push(newBook);
}

function renderBook(book) {
    const shelfTrack = document.getElementById('shelfTrack');
    const el = document.createElement('div');

    el.classList.add('book');
    if (book.read === 'read') {
        el.classList.add('read');
    }

    el.innerHTML = `
        <div class="book-spine" style="background:${book.color}">
            <span class="book-title-text">${book.title}</span>
        </div>
    `;

    shelfTrack.appendChild(el);

    document.getElementById('shelfEmpty').style.display = 'none';
    document.getElementById('bookCount').innerHTML = `<strong>${myLibrary.length}</strong> books on the shelf`;
}

function saveLibrary() {
    localStorage.setItem('library', JSON.stringify(myLibrary));
}

function loadLibrary() {
    const saved = localStorage.getItem('library');
    if (saved) {
        const parsed = JSON.parse(saved);
        parsed.forEach(function (book) {
            myLibrary.push(book);
            renderBook(book);
        });
    }
}

const resetLibrary = document.getElementById('resetLibrary');

resetLibrary.addEventListener('click', function () {
    if (confirm('Are you sure you want to reset your library? This cannot be undone.')) {
        localStorage.removeItem('library');
        myLibrary.length = 0;
        document.getElementById('shelfTrack').innerHTML = `
            <div class="shelf-empty" id="shelfEmpty">
                <p>Your shelf awaits its first story…</p>
            </div>
        `;
        document.getElementById('bookCount').innerHTML = `<strong>0</strong> books on the shelf`;
    }
});

const addBookBtn = document.getElementById('addBookBtn');
const modalOverlay = document.getElementById('modalOverlay');
const closeModal = document.getElementById('closeModal');
const bookColorStrip = document.getElementById('bookColorStrip');
const myForm = document.getElementById('bookForm');

const colors = ['#7b3f3f', '#3f5f7b', '#4a7b4a', '#6b4d7b',
    '#7b6b3f', '#3f6b6b', '#7b4a3f', '#4f4f7b',
    '#5c7b5c', '#7b5c3f', '#3f547b', '#6b3f5c'];

loadLibrary();

addBookBtn.addEventListener('click', function () {
    const randomIndex = Math.floor(Math.random() * colors.length);
    const chosenColor = colors[randomIndex];
    bookColorStrip.style.background = chosenColor;
    document.getElementById('bookColor').value = chosenColor;
    modalOverlay.classList.add('open');
});

closeModal.addEventListener('click', function () {
    modalOverlay.classList.remove('open');
});

myForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const title = document.getElementById('bookTitle').value;
    const author = document.getElementById('bookAuthor').value;
    const pages = Number(document.getElementById('bookPages').value);
    const read = document.getElementById('bookStatus').value;
    const date = document.getElementById('bookDate').value;
    const color = document.getElementById('bookColor').value;

    addBookToLibrary(title, author, pages, read, date);

    const newBook = myLibrary[myLibrary.length - 1];
    newBook.color = color;

    renderBook(newBook);
    saveLibrary();

    modalOverlay.classList.remove('open');
    myForm.reset();
});

const scrollLeft = document.getElementById('scrollLeft');
const scrollRight = document.getElementById('scrollRight');
const shelfViewport = document.getElementById('shelfViewport');

scrollLeft.addEventListener('click', function () {
    shelfViewport.scrollBy({ left: -200, behavior: 'smooth' });
});

scrollRight.addEventListener('click', function () {
    shelfViewport.scrollBy({ left: 200, behavior: 'smooth' });
});