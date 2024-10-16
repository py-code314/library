const addBook = document.querySelector('.library-heading__btn');
const closeBtn = document.querySelector('.dialog--close-btn');
const dialog = document.querySelector('.dialog');
const form = document.querySelector('.dialog-form');
const bookName = document.querySelector('.title');
const authorName = document.querySelector('.author');
const confirmBtn = document.querySelector('.dialog--confirm-btn');
const cancelBtn = document.querySelector('.dialog--cancel-btn');
const book = document.querySelector('.book');
const bookButtons = document.querySelectorAll('.book__buttons');
const readBtn = document.querySelector('.book__read-btn');
const deleteBtn = document.querySelector('.book__delete-btn');

// load books when page loads
window.addEventListener('DOMContentLoaded', () => {
  showBooks();
});

addBook.addEventListener('click', () => {
  // make sure fields are empty
  // if (bookName.value !== '' && authorName.value !== '') {
  //   bookName.value = '';
  //   authorName.value = '';
  // }
  // clear all form fields
  form.reset();

  // show form
  dialog.showModal();
});

// TODO: add code for Esc key

cancelBtn.addEventListener('click', () => {
  // return 'cancel' to the dialog so that it doesn't send 'confirm'
  dialog.close('cancel');
});

closeBtn.addEventListener('click', () => {
  // return 'close' to the dialog so that it doesn't send 'confirm'
  dialog.close('close');
});

dialog.addEventListener('close', (event) => {
  event.preventDefault();
  console.log(dialog.returnValue);

  if (dialog.returnValue === 'confirm') {
    // create new formData object
    const formData = new FormData(form);
    // convert formData to object
    const bookData = Object.fromEntries(formData);
    // console.log(bookData);
    addBookToLibrary(bookData);
    // showBooks();

    // remove all divs with class book
    const books = document.querySelectorAll('.book');
    books.forEach((book) => book.remove());
    // show all books in library
    showBooks();
  }
});

const myLibrary = [];
function Book(
  title,
  author,
  coverImage,
  pages,
  yearPublished,
  genre,
  readStatus
) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.coverImage = coverImage;
  this.pages = pages;
  this.yearPublished = yearPublished;
  this.genre = genre;
  this.readStatus = readStatus;
}

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

function showBooks() {
  myLibrary.forEach((book) => {
    const bookDiv = document.createElement('div');
    bookDiv.className = 'book';
    bookDiv.dataset.index = myLibrary.indexOf(book);

    const bookContainer = document.createElement('div');
    bookContainer.className = 'book__container';

    const coverDiv = document.createElement('div');
    coverDiv.className = 'book__cover';

    const coverPhoto = document.createElement('img');
    // coverPhoto.src = book.coverImage;
    // Add book covers from an array for books added by user
    if (book.coverImage) {
      coverPhoto.src = book.coverImage;
    } else {
      coverPhoto.src =
        bookCovers[Math.floor(Math.random() * bookCovers.length)];
    }

    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'book__details';

    const titleElement = document.createElement('h3');
    titleElement.textContent = book.title;

    const authorElement = document.createElement('p');
    authorElement.textContent = book.author;

    detailsDiv.append(titleElement, authorElement);

    coverDiv.append(coverPhoto);
    bookContainer.append(coverDiv, detailsDiv);
    

    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'book__buttons';

    const readBtn = document.createElement('button');
    readBtn.className = 'book__read-btn';
    readBtn.innerHTML = `Read <img src="./images/update.svg" alt="update" /> `;
    buttonsDiv.append(readBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'book__delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.innerHTML = `Delete <img src="./images/delete.svg" alt="delete" /> `;

    buttonsDiv.append(readBtn, deleteBtn);
    // document.querySelector('.library').append(bookDiv);
    if (book.readStatus === 'reading') {
      document.querySelector('.reading').append(bookDiv);
    } else {
      document.querySelector('.library').append(bookDiv);
    }

    bookDiv.append(bookContainer, buttonsDiv);
  });
}

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('book__delete-btn')) {
    const bookDiv = event.target.closest('.book');
    const bookIndex = Number(bookDiv.dataset.index);
    myLibrary.splice(bookIndex, 1);
    bookDiv.remove();
    // console.log(myLibrary);
  }
});
// document.querySelectorAll('.book').forEach((book) => {
//   book.addEventListener('mouseover', () => {
//     bookButtons.style.display = 'block';
//   });

//   book.addEventListener('mouseout', () => {
//     bookButtons.style.display = 'none';
//   });
// });

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
  // console.log(newBook);
  myLibrary.push(newBook);

  console.log(myLibrary);
}


