const addBook = document.querySelector('.library-heading__btn');

const dialog = document.querySelector('.dialog');
const form = document.querySelector('.form');

const closeBtn = document.querySelector('.form--close-btn');

const bookName = document.querySelector('.title');
const authorName = document.querySelector('.author');
const percentage = document.querySelector('.dialog__percentage');

const cancelBtn = document.querySelector('.form--cancel-btn');
// const submitBtn = document.querySelector('.form--submit-btn');

const book = document.querySelector('.book');
const bookButtons = document.querySelectorAll('.book__buttons');

const updateBtn = document.querySelector('.book__update-btn');
const deleteBtn = document.querySelector('.book__delete-btn');

const myLibrary = [];
const bookCovers = [
  './images/book-covers-random/coffee.jpeg',
  './images/book-covers-random/colors.jpeg',
  './images/book-covers-random/flowers.jpeg',
  './images/book-covers-random/leaves.jpeg',
  './images/book-covers-random/paper.jpeg',
  './images/book-covers-random/roses.jpeg',
  './images/book-covers-random/sky.jpeg',
  './images/book-covers-random/stars.jpeg',
  './images/book-covers-random/vase.jpeg',
];

// Book constructor
function Book({
  title,
  author,
  coverImage,
  totalPages,
  yearPublished,
  genre,
  readStatus,
  pagesRead,
}
) {
  this.title = title;
  this.author = author;
  this.coverImage = coverImage;
  this.totalPages = totalPages;
  this.yearPublished = yearPublished;
  this.genre = genre;
  this.readStatus = readStatus;
  this.pagesRead = pagesRead;
}

function addBookToLibrary(bookData) {
  const newBook = new Book({
    title: bookData.title,
    author: bookData.author,
    coverImage: bookData.coverImage,
    totalPages: bookData.totalPages,
    yearPublished: bookData.yearPublished,
    genre: bookData.genre,
    readStatus: bookData.readStatus,
    pagesRead: bookData.pagesRead,}
  );
  // console.log(newBook);
  myLibrary.push(newBook);

  // console.log(myLibrary);
}

// add books manually
const dracula = new Book({
  title: 'Dracula',
  author: 'Bram Stoker',
  coverImage: './images/book-covers-manual/dracula.jpg',
  totalPages: 418,
  yearPublished: 1897,
  genre: 'Fiction',
  readStatus: 'reading',
  pagesRead: 115,
});
myLibrary.push(dracula);
// console.log(myLibrary);
const mother = new Book({
  title: 'Mother',
  author: 'Maxim Gorky',
  coverImage: './images/book-covers-manual/mother.jpg',
  totalPages: 285,
  yearPublished: 1906,
  genre: 'Fiction',
  readStatus: 'reading',
  pagesRead: 234,
});
myLibrary.push(mother);

const mockingbird = new Book({
  title: 'To Kill a Mockingbird',
  author: 'Harper Lee',
  coverImage: './images/book-covers-manual/mocking-bird.jpeg',
  totalPages: 281,
  yearPublished: 1960,
  genre: 'Fiction',
  readStatus: 'reading',
  pagesRead: 150,
});
myLibrary.push(mockingbird);

const theHound = new Book({
  title: 'The Hound of the Baskervilles',
  author: 'Arthur Conan Doyle',
  coverImage: './images/book-covers-manual/hound.jpeg',
  totalPages: 248,
  yearPublished: 1902,
  genre: 'Fiction',
  readStatus: 'yes',
});
myLibrary.push(theHound);

const fahrenheit451 = new Book({
  title: 'Fahrenheit 451',
  author: 'Ray Bradbury',
  coverImage: './images/book-covers-manual/fahrenheit.jpg',
  totalPages: 156,
  yearPublished: 1953,
  genre: 'Fiction',
  readStatus: 'no',
});
myLibrary.push(fahrenheit451);

const frankenstein = new Book({
  title: 'Frankenstein',
  author: 'Mary Shelley',
  coverImage: './images/book-covers-manual/frankenstein.jpg',
  totalPages: 280,
  yearPublished: 1818,
  genre: 'Fiction',
  readStatus: 'no',
});
myLibrary.push(frankenstein);

function showBooks() {
  myLibrary.forEach((bookObj) => {
    const book = createBook(bookObj);
    if (bookObj.readStatus === 'reading') {
      document.querySelector('.reading').append(book);
    } else if (bookObj.readStatus === 'yes' || bookObj.readStatus === 'no') {
      document.querySelector('.library').append(book);
    }
  });
}

function createBook(bookObj) {
  // create book card
  const bookDiv = document.createElement('div');
  bookDiv.className = 'book';
  // add index to book
  bookDiv.dataset.index = myLibrary.indexOf(bookObj);

  // create book container
  const bookContainer = document.createElement('div');
  bookContainer.className = 'book__container';

  // create cover div
  const coverDiv = document.createElement('div');
  coverDiv.className = 'book__cover';

  // add cover photo
  const coverPhoto = addCoverPhoto(bookObj);

  // create details div
  const detailsDiv = document.createElement('div');
  detailsDiv.className = 'book__details';

  const titleElement = document.createElement('h3');
  titleElement.textContent = bookObj.title;

  const authorElement = document.createElement('p');
  authorElement.textContent = bookObj.author;

  // create percentage div
  const percentageDiv = document.createElement('div');
  percentageDiv.className = 'book__percentage-container';

  // const percentage = document.createElement('p');
  // percentage.className = 'book__percentage';

  const progressDiv = document.createElement('div');
  progressDiv.className = 'book__progress-container';

  // console.log(bookObj);
  // add progress bar
  const [percentage, progressBar] = updateProgress(bookObj);

  // append elements
  coverDiv.append(coverPhoto);
  detailsDiv.append(titleElement, authorElement);
  progressDiv.append(progressBar);
  percentageDiv.append(percentage, progressDiv);
  bookContainer.append(coverDiv, detailsDiv, percentageDiv);

  // create buttons div
  const buttonsDiv = addButtonsOverlay(bookObj);

  // append to book card
  bookDiv.append(bookContainer, buttonsDiv);

  return bookDiv;
}

function addCoverPhoto(bookObj) {
  const coverPhoto = document.createElement('img');

  // Add book covers from an array for books added by user
  if (bookObj.coverImage) {
    coverPhoto.src = bookObj.coverImage;
  } else {
    coverPhoto.src = bookCovers[Math.floor(Math.random() * bookCovers.length)];
    bookObj.coverImage = coverPhoto.src;
  }
  return coverPhoto;
}

function updateProgress(bookObj) {
  // create percentage
  const percentage = document.createElement('p');
  percentage.className = 'book__percentage';

  // create progress bar
  const progressBar = document.createElement('div');
  progressBar.className = 'book__progress-bar';

  if (bookObj.readStatus === 'yes') {
    percentage.textContent = '100%';
    progressBar.style.width = '100%';
  } else if (bookObj.readStatus === 'no') {
    percentage.textContent = '0%';
    progressBar.style.width = '0%';
  } else {
    const percent = Math.floor((bookObj.pagesRead * 100) / bookObj.totalPages);
    // console.log(percent);
    percentage.textContent = `${percent}%`;
    progressBar.style.width = `${percent}%`;
  }
  return [percentage, progressBar];
}

function addButtonsOverlay() {
  // create buttons div
  const buttonsDiv = document.createElement('div');
  buttonsDiv.className = 'book__buttons';

  // create buttons
  const updateBtn = document.createElement('button');
  updateBtn.className = 'book__update-btn';
  updateBtn.innerHTML = `Update <img src="./images/icons/update.svg" alt="update" /> `;

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'book__delete-btn';
  deleteBtn.innerHTML = `Delete <img src="./images/icons/delete.svg" alt="delete" /> `;

  // append buttons
  buttonsDiv.append(updateBtn, deleteBtn);
  return buttonsDiv;
}

// set max year for Year Published
const yearInput = document.querySelector('.year');
const currentYear = new Date().getFullYear();
yearInput.setAttribute('max', currentYear);

// load books when page loads
window.addEventListener('DOMContentLoaded', () => {
  showBooks();
  // console.log(totalPages.value);
});

const errorMessage = document.querySelector('.form__error');
const submitBtn = document.querySelector('.form--submit-btn');
function disableSubmitBtn() {
  

  if (errorMessage.textContent) {
    submitBtn.setAttribute('disabled', 'disabled');
    submitBtn.style.cursor = 'not-allowed';
  } else {
    submitBtn.disabled = false;
    submitBtn.style.cursor = 'pointer';
  }
}

function errorPagesRead(event) {
  const totalPages = event.target.form.querySelector('.total-pages').value;
  const errorMessage = document.querySelector('.form__errors p');
  const pagesRead = event.target.form.querySelector('.pages-read').value;

  if (parseInt(pagesRead) < 1) {
    errorMessage.textContent = 'Pages read cannot be less than 0';
  } else if (parseInt(pagesRead) > parseInt(totalPages)) {
    errorMessage.textContent = 'Pages read cannot be greater than total pages';
  } else {
    errorMessage.textContent = '';
  }

  disableSubmitBtn();
}



// show pages read input only if readStatus is 'reading'
dialog.addEventListener('input', (event) => {
  if (event.target.classList.contains('title')) {
    errorTitle();
  }
  if (event.target.classList.contains('author')) {
    errorEmptyAuthor();
  }
  if (event.target.classList.contains('total-pages')) {
    errorTotalPages();
  }
  if (event.target.classList.contains('year')) {
    errorYearPublished();
  }
  if (event.target.classList.contains('read-status')) {
    showReadPagesInput();
  }
  // if (event.target.classList.contains('pages-read')) {
  //   errorPagesRead(event);
  // }

  // validateForm();
  // disableSubmitBtn();
});

// function validateForm() {
//   errorEmptyTitle();
//   errorEmptyAuthor();
// }

const title = document.querySelector('.title');
const existingBookTitles = myLibrary.map((book) => book.title.toLowerCase());
function errorTitle() {
  // console.log(title.value);
  // get all book titles
  isValid = true;
  if (title.value === '') {
    showErrorMessage('title-error', 'Title is required');
    isValid = false;
  } else if (existingBookTitles.includes(title.value.toLowerCase())) {
    showErrorMessage('title-error', 'Book title already exists');
    isValid = false;
  } else {
    hideErrorMessage('title-error');
  }
  if (isValid) {
    console.log('success');
    disableSubmitBtn();
  }
}

const author = document.querySelector('.author');
function errorEmptyAuthor() {
  if (author.value === '') {
    showErrorMessage('author-error', 'Author is required');
  } else {
    hideErrorMessage('author-error');
  }
}

const totalPages = document.querySelector('.total-pages');
const pagesRead = document.querySelector('.pages-read');
function errorTotalPages() {
  if (totalPages.value === '') {
    showErrorMessage('total-pages-error', 'Total pages is required');
  } else if (parseInt(totalPages.value) < 1) {
    showErrorMessage('total-pages-error', 'Total pages cannot be less than 1');
  } else if (parseInt(totalPages.value) < parseInt(pagesRead.value)) {
    showErrorMessage(
      'total-pages-error',
      'Total pages cannot be less than pages read'
    );
  } else {
    hideErrorMessage('total-pages-error');
  }
 
}

const yearPublished = document.querySelector('.year');
function errorYearPublished() {
  if (parseInt(yearPublished.value) < 1) {
    showErrorMessage('year-error', 'Year cannot be less than 1');
  } else if (parseInt(yearPublished.value) > currentYear) {
    showErrorMessage('year-error', 'Year cannot be greater than current year');
  } else {
    hideErrorMessage('year-error');
  }
}

const readStatus = document.querySelector('.read-status');
const pagesReadDiv = document.querySelector('.form__pages-read');
const pagesReadInput = document.querySelector('.pages-read');
function showReadPagesInput() { 
  if (readStatus.value === 'reading') {
    // show input field
    pagesReadDiv.style.display = 'flex';
    // make input field required
    pagesReadInput.setAttribute('required', 'required');
    // set max value equal to total pages
    pagesReadInput.setAttribute('max', totalPages);
  } else {
    pagesReadDiv.style.display = 'none';
    pagesReadInput.removeAttribute('required');
  }
}

function showErrorMessage(elementId, message) {
  const element = document.getElementById(elementId);
  element.textContent = message;
  element.style.display = 'block';
}

function hideErrorMessage(elementId) {
  const element = document.getElementById(elementId);
  element.style.display = 'none';
}

// add code for Esc key
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    dialog.close('esc');
  }
});

dialog.addEventListener('close', (event) => {
  event.preventDefault();
  // console.log(dialog.returnValue);

  if (dialog.returnValue === 'submit') {
    document.querySelector('.title').removeAttribute('disabled');
    // create new formData object
    const formData = new FormData(form);
    // console.log(formData);
    // convert formData to object
    const bookData = Object.fromEntries(formData);
    // console.log(bookData);
    const existingBook = myLibrary.find(
      (book) => book.title === bookData.title
    );
    console.log(existingBook);
    if (existingBook) {
      // update values
      bookData.coverImage = existingBook.coverImage;
      console.log(bookData.coverImage);
      Object.assign(existingBook, bookData);
    } else {
      addBookToLibrary(bookData);
    }
    console.log(myLibrary);

    // remove all divs with class book
    const books = document.querySelectorAll('.book');
    books.forEach((book) => book.remove());
    // show all books in library
    showBooks();
  }
});

function deleteBook(event) {
  const bookDiv = event.target.closest('.book');
  const bookIndex = Number(bookDiv.dataset.index);
  myLibrary.splice(bookIndex, 1);
  bookDiv.remove();
}

document.addEventListener('click', (event) => {
  // return 'close' to the dialog so that it doesn't send 'submit'
  if (event.target.classList.contains('form--close-icon')) {
    dialog.close('close');
  }

  // return 'cancel' to the dialog so that it doesn't send 'submit'
  if (event.target.classList.contains('form--cancel-btn')) {
    dialog.close('cancel');
  }

  if (event.target.classList.contains('library-heading__btn')) {
    // reset form fields
    form.reset();
    // show form
    dialog.showModal();
  }
  // update book
  if (event.target.classList.contains('book__update-btn')) {
    updateForm(event);
  }

  // delete book
  if (event.target.classList.contains('book__delete-btn')) {
    deleteBook(event);
  }
});

function updateForm(event) {
  const bookDiv = event.target.closest('.book');
  const bookIndex = Number(bookDiv.dataset.index);
  const book = myLibrary[bookIndex];

  // pre populate form fields
  document.querySelector('.title').value = book.title;
  document.querySelector('.author').value = book.author;
  document.querySelector('.total-pages').value = book.totalPages;
  document.querySelector('.year').value = book.yearPublished;
  document.querySelector('.genre').value = book.genre;
  document.querySelector('.read-status').value = book.readStatus;
  document.querySelector('.pages-read').value = book.pagesRead;

  // disable title input
  document.querySelector('.title').setAttribute('disabled', 'disabled');

  // show dialog
  dialog.showModal();
  // show pages-read input only if readStatus is 'reading'

  if (book.readStatus === 'reading') {
    document.querySelector('.form__pages-read').style.display = 'flex';
  }
}
