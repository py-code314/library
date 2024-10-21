// const addBook = document.querySelector('.library-heading__btn');

const dialog = document.querySelector('.dialog');
const form = document.querySelector('.form');

// const closeBtn = document.querySelector('.form--close-btn');

// const bookName = document.querySelector('.title');
const title = document.querySelector('.title');
// const authorName = document.querySelector('.author');
const author = document.querySelector('.author');
const totalPages = document.querySelector('.total-pages');
const yearPublished = document.querySelector('.year');
const readStatus = document.querySelector('.read-status');
const pagesReadDiv = document.querySelector('.form__pages-read');
// const pagesReadInput = document.querySelector('.pages-read');
const pagesRead = document.querySelector('.pages-read');
const percentage = document.querySelector('.dialog__percentage');
const errorMsgs = document.querySelectorAll('.form__error');

const cancelBtn = document.querySelector('.form--cancel-btn');
const submitBtn = document.querySelector('.form--submit-btn');

const book = document.querySelector('.book');
const bookButtons = document.querySelectorAll('.book__buttons');

const updateBtn = document.querySelector('.book__update-btn');
const deleteBtn = document.querySelector('.book__delete-btn');

const myLibrary = [];
// get all book titles
const existingBookTitles = myLibrary.map((book) => book.title.toLowerCase());
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

// set max year for Year Published
const yearInput = document.querySelector('.year');
const currentYear = new Date().getFullYear();
yearInput.setAttribute('max', currentYear);

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
}) {
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
    pagesRead: bookData.pagesRead,
  });

  myLibrary.push(newBook);
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

function displayBooks() {
  myLibrary.forEach((book) => {
    const bookCard = createBook(book);
    if (book.readStatus === 'reading') {
      document.querySelector('.reading').append(bookCard);
    } else {
      document.querySelector('.library').append(bookCard);
    }
  });
}

function createBook(bookObj) {
  // Get cover image and container
  const coverContainer = createCoverImage(bookObj);

  // Get details container
  const detailsContainer = createDetailsContainer(bookObj);

  // Get percentage container
  const percentageContainer = createPercentageContainer(bookObj);

  // create book container for cover, details, and percentage
  const bookContainer = document.createElement('div');
  bookContainer.className = 'book__container';
  bookContainer.append(coverContainer, detailsContainer, percentageContainer);

  // Get buttons
  const buttonsContainer = createButtonsOverlay(bookObj);

  // create book card
  const bookCard = document.createElement('div');
  bookCard.className = 'book';
  bookCard.dataset.index = myLibrary.indexOf(bookObj);
  bookCard.append(bookContainer, buttonsContainer);

  return bookCard;
}

function createCoverImage(book) {
  const image = document.createElement('img');
  const imageUrl = book.coverImage || getRandomCover();
  image.src = imageUrl;
  book.coverImage = imageUrl;

  const container = document.createElement('div');
  container.className = 'book__cover';
  container.append(image);

  return container;
}

function createDetailsContainer(book) {
  const title = document.createElement('h3');
  title.textContent = book.title;

  const author = document.createElement('p');
  author.textContent = book.author;

  const container = document.createElement('div');
  container.className = 'book__details';
  container.append(title, author);

  return container;
}

function createPercentageContainer(book) {
  const [percentageElement, progressBar] = updateProgress(book);
  const progressBarContainer = document.createElement('div');
  progressBarContainer.className = 'book__progress-container';
  // const progressBar = updateProgress(book)[1];
  progressBarContainer.append(progressBar);

  const container = document.createElement('div');
  container.className = 'book__percentage-container';
  container.append(percentageElement, progressBarContainer);

  return container;
}

function createButtonsOverlay() {
  // create buttons div
  const buttonsContainer = document.createElement('div');
  buttonsContainer.className = 'book__buttons';

  // create buttons
  const updateBtn = document.createElement('button');
  updateBtn.className = 'book__update-btn';
  updateBtn.innerHTML = `Update <img src="./images/icons/update.svg" alt="update" /> `;

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'book__delete-btn';
  deleteBtn.innerHTML = `Delete <img src="./images/icons/delete.svg" alt="delete" /> `;

  // append buttons
  buttonsContainer.append(updateBtn, deleteBtn);
  return buttonsContainer;
}

function getRandomCover() {
  return bookCovers[Math.floor(Math.random() * bookCovers.length)];
}

function updateProgress(book) {
  const progress = document.createElement('p');
  progress.className = 'book__percentage';

  const progressBar = document.createElement('div');
  progressBar.className = 'book__progress-bar';

  let percent;

  switch (book.readStatus) {
    case 'yes':
      progress.textContent = '100%';
      progressBar.style.width = '100%';
      break;
    case 'no':
      progress.textContent = '0%';
      progressBar.style.width = '0%';
      break;
    default:
      percent = Math.floor((book.pagesRead * 100) / book.totalPages);
      progress.textContent = `${percent}%`;
      progressBar.style.width = `${percent}%`;
  }

  return [progress, progressBar];
}

function validateTitle() {
  const titleValue = title.value.trim().toLowerCase();

  if (titleValue === '') {
    displayErrorMessage('title-error', 'Title is required');
  } else if (existingBookTitles.includes(titleValue)) {
    displayErrorMessage('title-error', 'Book title already exists');
  } else {
    hideErrorMessage('title-error');
  }
}

function validateAuthor() {
  const authorValue = author.value.trim();

  if (authorValue === '') {
    displayErrorMessage('author-error', 'Author is required');
  } else {
    hideErrorMessage('author-error');
  }
}

function validateTotalPages() {
  if (totalPages.value === '') {
    displayErrorMessage('total-pages-error', 'Total pages is required');
  } else if (parseInt(totalPages.value) < 1) {
    displayErrorMessage('total-pages-error', 'Total pages cannot be less than 1');
  } else if (parseInt(totalPages.value) < parseInt(pagesRead.value)) {
    displayErrorMessage(
      'total-pages-error',
      'Total pages cannot be less than pages read'
    );
  } else {
    hideErrorMessage('total-pages-error');
  }
}

function validateYearPublished() {
  const year = parseInt(yearPublished.value, 10);
  console.log(year);
  const yearErrMsg = 'Year must be between 1 and ' + currentYear;

  if (yearPublished.value === '') {
    hideErrorMessage('year-error');
  } else if (isNaN(year) || year < 1 || year > currentYear) {
    displayErrorMessage('year-error', yearErrMsg);
  } else {
    hideErrorMessage('year-error');
  }
}

function togglePagesReadInput() {
  const isReading = readStatus.value === 'reading';

  pagesReadDiv.style.display = isReading ? 'flex' : 'none';
  pagesRead.required = isReading;
  pagesRead.max = isReading ? totalPages.value : undefined;
}

function validatePagesRead() {
  const pagesReadValue = parseInt(pagesRead.value);
  const totalPagesValue = parseInt(totalPages.value);

  if (pagesRead.value === '') {
    displayErrorMessage('pages-read-error', 'Pages read is required');
  } else if (isNaN(pagesReadValue) || pagesReadValue < 1) {
    displayErrorMessage(
      'pages-read-error',
      'Pages read must be a number greater than or equal to 1'
    );
  } else if (pagesReadValue > totalPagesValue) {
    displayErrorMessage(
      'pages-read-error',
      'Pages read cannot be greater than total pages'
    );
  } else {
    hideErrorMessage('pages-read-error');
  }
}

function displayErrorMessage(elementId, message) {
  const element = document.getElementById(elementId);
  element.textContent = message;
  
}

function hideErrorMessage(elementId) {
  const element = document.getElementById(elementId);
  element.textContent = '';
  // element.style.display = 'none';
}

function disableSubmitBtn() {
  let anyErrorMsg = false;
  errorMsgs.forEach((msg) => {
    if (msg.textContent !== '') {
      anyErrorMsg = true;
    }
  });
  if (anyErrorMsg) {
    submitBtn.disabled = true;
    submitBtn.style.cursor = 'not-allowed';
  } else {
    submitBtn.disabled = false;
    submitBtn.style.cursor = 'pointer';
  }
}



function showEditForm(event) {
  const bookCard = event.target.closest('.book');
  const bookIndex = Number(bookCard.dataset.index);
  const book = myLibrary[bookIndex];

  const titleInput = document.querySelector('.title');
  const authorInput = document.querySelector('.author');
  const totalPagesInput = document.querySelector('.total-pages');
  const yearInput = document.querySelector('.year');
  const genreInput = document.querySelector('.genre');
  const readStatusInput = document.querySelector('.read-status');
  const pagesReadInput = document.querySelector('.pages-read');

  titleInput.value = book.title;
  authorInput.value = book.author;
  totalPagesInput.value = book.totalPages;
  yearInput.value = book.yearPublished;
  genreInput.value = book.genre;
  readStatusInput.value = book.readStatus;
  pagesReadInput.value = book.pagesRead;
  

  // disable the title input
  titleInput.disabled = true;
  
  
  togglePagesReadInput();
  dialog.showModal();

  
}

function deleteBook(event) {
  const book = event.target.closest('.book');
  const bookIndex = Number(book.dataset.index);
  myLibrary.splice(bookIndex, 1);
  book.remove();
}


// load books when page loads
window.addEventListener('DOMContentLoaded', displayBooks);

// add code for Esc key
dialog.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    dialog.close();
  }
});

// show pages read input only if readStatus is 'reading'
dialog.addEventListener('input', (event) => {
  if (event.target.classList.contains('title')) {
    validateTitle();
  }
  if (event.target.classList.contains('author')) {
    validateAuthor();
  }
  if (event.target.classList.contains('total-pages')) {
    validateTotalPages();
  }
  if (event.target.classList.contains('year')) {
    validateYearPublished();
  }
  if (event.target.classList.contains('read-status')) {
    togglePagesReadInput();
  }
  if (event.target.classList.contains('pages-read')) {
    validatePagesRead(event);
  }

  disableSubmitBtn();
});


document.addEventListener('click', (event) => {
  // console.log(event.target);
  // event.preventDefault();
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
    pagesReadDiv.style.display = 'none';
    dialog.showModal();
  }
  // update book
  if (event.target.classList.contains('book__update-btn')) {
    showEditForm(event);
  }

  // delete book
  if (event.target.classList.contains('book__delete-btn')) {
    deleteBook(event);
  }
});

dialog.addEventListener('close', () => {
  // event.preventDefault();

  if (dialog.returnValue === 'submit') {
    document.querySelector('.title').removeAttribute('disabled');
    // create new formData object
    const formData = new FormData(form);

    // convert formData to object
    const bookData = Object.fromEntries(formData);

    const existingBook = myLibrary.find(
      (book) => book.title === bookData.title
    );

    if (existingBook) {
      // update values
      bookData.coverImage = existingBook.coverImage;

      Object.assign(existingBook, bookData);
    } else {
      addBookToLibrary(bookData);
    }

    // remove all divs with class book
    const books = document.querySelectorAll('.book');
    books.forEach((book) => book.remove());
    // show all books in library
    displayBooks();
  }
});
