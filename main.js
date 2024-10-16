const addBook = document.querySelector('.library-heading__btn');


const dialog = document.querySelector('.dialog');
const form = document.querySelector('.dialog-form');

const closeBtn = document.querySelector('.dialog--close-btn');

const bookName = document.querySelector('.title');
const authorName = document.querySelector('.author');
const percentage = document.querySelector('.dialog__percentage');

const cancelBtn = document.querySelector('.dialog--cancel-btn');
const confirmBtn = document.querySelector('.dialog--confirm-btn');

const book = document.querySelector('.book');
const bookButtons = document.querySelectorAll('.book__buttons');

const readBtn = document.querySelector('.book__read-btn');
const deleteBtn = document.querySelector('.book__delete-btn');

const myLibrary = [];
const bookCovers = [
  './images/book-covers/book.jpeg',
  './images/book-covers/coffee.jpeg',
  './images/book-covers/colors.jpeg',
  './images/book-covers/dark-green.jpeg',
  './images/book-covers/flowers.jpeg',
  './images/book-covers/leaves.jpeg',
  './images/book-covers/paper.jpeg',
  './images/book-covers/red.jpeg',
  './images/book-covers/roses.jpeg',
  './images/book-covers/sky.jpeg',
  './images/book-covers/stars.jpeg',
  './images/book-covers/vase.jpeg',
];

// Book constructor
function Book(
  title,
  author,
  coverImage,
  pages,
  yearPublished,
  genre,
  readStatus
) {
  this.title = title;
  this.author = author;
  this.coverImage = coverImage;
  this.pages = pages;
  this.yearPublished = yearPublished;
  this.genre = genre;
  this.readStatus = readStatus;
}

// add books manually
const dracula = new Book(
  'Dracula',
  'Bram Stoker',
  './images/dracula.jpg',
  418,
  1897,
  'Fiction',
  'reading'
);
myLibrary.push(dracula);

const mother = new Book(
  'Mother',
  'Maxim Gorky',
  './images/mother.jpg',
  285,
  1906,
  'Fiction',
  'reading'
);
myLibrary.push(mother);

const mockingBird = new Book(
  'To Kill a Mockingbird',
  'Harper Lee',
  './images/mocking-bird.jpeg',
  281,
  1960,
  'Fiction',
  'reading'
);
myLibrary.push(mockingBird);

const hound = new Book(
  'The Hound of the Baskervilles',
  'Arthur Conan Doyle',
  './images/hound.jpeg',
  248,
  1902,
  'Fiction',
  'yes'
);
myLibrary.push(hound);

const fahrenheit = new Book(
  'Fahrenheit 451',
  'Ray Bradbury',
  './images/fahrenheit.jpg',
  156,
  1953,
  'Fiction',
  'no'
);
myLibrary.push(fahrenheit);

const frankenstein = new Book(
  'Frankenstein',
  'Mary Shelley',
  './images/frankenstein.jpg',
  280,
  1818,
  'Fiction',
  'no'
);
myLibrary.push(frankenstein);

// load books when page loads
window.addEventListener('DOMContentLoaded', () => {
  showBooks();
});

addBook.addEventListener('click', () => {
  // make sure fields are empty
  form.reset();

  // show form
  dialog.showModal();
  
});

// show percentage input only if readStatus is 'reading'
dialog.addEventListener('input', (event) => {
  // how to access these from global scope?
  const readStatus = event.target.form.querySelector('#read-status').value;
  const percentage = event.target.form.querySelector('.dialog__percentage');
  if (readStatus === 'reading') {
    percentage.style.display = 'flex';
  } else {
    percentage.style.display = 'none';
  }
});

// TODO: add code for Esc key

closeBtn.addEventListener('click', () => {
  // return 'close' to the dialog so that it doesn't send 'confirm'
  dialog.close('close');
});

cancelBtn.addEventListener('click', () => {
  // return 'cancel' to the dialog so that it doesn't send 'confirm'
  dialog.close('cancel');
});

dialog.addEventListener('close', (event) => {
  event.preventDefault();
  console.log(dialog.returnValue);

  if (dialog.returnValue === 'confirm') {
    // create new formData object
    const formData = new FormData(form);
    // convert formData to object
    const bookData = Object.fromEntries(formData);
    console.log(bookData);
    addBookToLibrary(bookData);
    
    // remove all divs with class book
    const books = document.querySelectorAll('.book');
    books.forEach((book) => book.remove());
    // show all books in library
    showBooks();
  }
});

function addBookToLibrary(bookData) {
  const newBook = new Book(
    bookData.title,
    bookData.author,
    bookData.coverImage,
    bookData.pages,
    bookData.yearPublished,
    bookData.genre,
    bookData.readStatus
  );
  console.log(newBook);
  myLibrary.push(newBook);

  console.log(myLibrary);
}



function showBooks() {
  myLibrary.forEach((book) => {
    // create book card
    const bookDiv = document.createElement('div');
    bookDiv.className = 'book';
    // add index to book
    bookDiv.dataset.index = myLibrary.indexOf(book);

    // create book container
    const bookContainer = document.createElement('div');
    bookContainer.className = 'book__container';

    // create cover div
    const coverDiv = document.createElement('div');
    coverDiv.className = 'book__cover';

    const coverPhoto = document.createElement('img');
    // Add book covers from an array for books added by user
    if (book.coverImage) {
      coverPhoto.src = book.coverImage;
    } else {
      coverPhoto.src =
        bookCovers[Math.floor(Math.random() * bookCovers.length)];
    }

    // create details div
    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'book__details';

    const titleElement = document.createElement('h3');
    titleElement.textContent = book.title;

    const authorElement = document.createElement('p');
    authorElement.textContent = book.author;

    // create percentage div
    const percentageDiv = document.createElement('div');
    percentageDiv.className = 'percentage';
    percentageDiv.textContent = `${book.readStatus}%`;

    // append elements
    detailsDiv.append(titleElement, authorElement);
    coverDiv.append(coverPhoto);
    bookContainer.append(coverDiv, detailsDiv);

    // create buttons div
    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'book__buttons';

    // create buttons
    const readBtn = document.createElement('button');
    readBtn.className = 'book__read-btn';
    readBtn.innerHTML = `Read <img src="./images/update.svg" alt="update" /> `;
    // buttonsDiv.append(readBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'book__delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.innerHTML = `Delete <img src="./images/delete.svg" alt="delete" /> `;

    // append buttons
    buttonsDiv.append(readBtn, deleteBtn);

    // append to book card
    bookDiv.append(bookContainer, buttonsDiv);

    // add book to library or continue reading section
    // console.log(book.readStatus);
    if (book.readStatus === 'reading') {
      document.querySelector('.reading').append(bookDiv);
    } else {
      document.querySelector('.library').append(bookDiv);
    }
  });
}

// delete book
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('book__delete-btn')) {
    const bookDiv = event.target.closest('.book');
    const bookIndex = Number(bookDiv.dataset.index);
    myLibrary.splice(bookIndex, 1);
    bookDiv.remove()
  }
});


