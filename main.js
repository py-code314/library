// Global variables
const dialog = document.querySelector('.dialog');
const form = document.querySelector('.form');

const title = document.querySelector('.title');
const author = document.querySelector('.author');
const totalPages = document.querySelector('.total-pages');
const yearPublished = document.querySelector('.year');
const readStatus = document.querySelector('.read-status');
const pagesReadDiv = document.querySelector('.form__pages-read');
const pagesRead = document.querySelector('.pages-read');
const percentage = document.querySelector('.dialog__percentage');
const errorMsgs = document.querySelectorAll('.form__error');
const pagesReadError = document.querySelector('#pages-read-error');

const cancelBtn = document.querySelector('.form--cancel-btn');
const submitBtn = document.querySelector('.form--submit-btn');

const book = document.querySelector('.book');
const bookButtons = document.querySelectorAll('.book__buttons');

const updateBtn = document.querySelector('.book__update-btn');
const deleteBtn = document.querySelector('.book__delete-btn');

const myLibrary = [];

// Get all book titles
const existingBookTitles = myLibrary.map((book) => book.title.toLowerCase());

// Array of cover images
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

// Set max year for Year Published
const yearInput = document.querySelector('.year');
const currentYear = new Date().getFullYear();
yearInput.setAttribute('max', currentYear);

// Book constructor
// Pass arguments to constructor as an object
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

// Add book to library from form data
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

// Add books manually to library
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

// Display books
function displayBooks() {
  myLibrary.forEach((book) => {
    const bookCard = createBook(book);

    /* Add book to Continue Reading section or Library section
     based on readStatus */
    if (book.readStatus === 'reading') {
      document.querySelector('.reading').append(bookCard);
    } else {
      document.querySelector('.library').append(bookCard);
    }
  });
}

// Create book card
function createBook(bookObj) {
  // Get cover image and container
  const coverContainer = createCoverImage(bookObj);

  // Get details container
  const detailsContainer = createDetailsContainer(bookObj);

  // Get percentage container
  const percentageContainer = createPercentageContainer(bookObj);

  // Create book container for cover, details, and percentage
  const bookContainer = document.createElement('div');
  bookContainer.className = 'book__container';
  bookContainer.append(coverContainer, detailsContainer, percentageContainer);

  // Get buttons
  const buttonsContainer = createButtonsOverlay(bookObj);

  // Create book card
  const bookCard = document.createElement('div');
  bookCard.className = 'book';
  // Add data-index to book card based on idex of book in myLibrary
  bookCard.dataset.index = myLibrary.indexOf(bookObj);
  bookCard.append(bookContainer, buttonsContainer);

  return bookCard;
}

// Create cover image
function createCoverImage(book) {
  const image = document.createElement('img');
  // Get cover image from bookCovers array if it's not provided manually
  const imageUrl = book.coverImage || getRandomCover();
  image.src = imageUrl;
  book.coverImage = imageUrl;

  const container = document.createElement('div');
  container.className = 'book__cover';
  container.append(image);

  return container;
}

// Create details container which contains title and author
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

// Create percentage container which contains percentage text and progress bar
function createPercentageContainer(book) {
  const [percentageElement, progressBar] = updateProgress(book);
  const progressBarContainer = document.createElement('div');
  progressBarContainer.className = 'book__progress-container';
  progressBarContainer.append(progressBar);

  const container = document.createElement('div');
  container.className = 'book__percentage-container';
  container.append(percentageElement, progressBarContainer);

  return container;
}

// Create buttons overlay
function createButtonsOverlay() {
  const buttonsContainer = document.createElement('div');
  buttonsContainer.className = 'book__buttons';

  // Create buttons
  const updateBtn = document.createElement('button');
  updateBtn.className = 'book__update-btn';
  // Add update icon
  updateBtn.innerHTML = `Update <img src="./images/icons/update.svg" alt="Update" /> `;

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'book__delete-btn';
  // Add delete icon
  deleteBtn.innerHTML = `Delete <img src="./images/icons/delete.svg" alt="Delete" /> `;

  buttonsContainer.append(updateBtn, deleteBtn);
  return buttonsContainer;
}

// Return a random cover image URL from the bookCovers array.
function getRandomCover() {
  return bookCovers[Math.floor(Math.random() * bookCovers.length)];
}

// Updates the progress bar and text for a given book.
function updateProgress(book) {
  const progress = document.createElement('p');
  progress.className = 'book__percentage';

  const progressBar = document.createElement('div');
  progressBar.className = 'book__progress-bar';

  let percent;

  switch (book.readStatus) {
    // If book is read, set progress to 100% and progress bar width to 100%
    case 'yes':
      progress.textContent = '100%';
      progressBar.style.width = '100%';
      break;
    case 'no':
      // If book is not read, set progress to 0% and progress bar width to 0%
      progress.textContent = '0%';
      progressBar.style.width = '0%';
      break;
    default:
      // If book is in progress, calculate progress and progress bar width
      percent = Math.floor((book.pagesRead * 100) / book.totalPages);
      progress.textContent = `${percent}%`;
      progressBar.style.width = `${percent}%`;
  }

  return [progress, progressBar];
}

//  Display an error message if the title is empty or already exists in the library.
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

// Display an error message if the author field is empty
function validateAuthor() {
  const authorValue = author.value.trim();

  if (authorValue === '') {
    displayErrorMessage('author-error', 'Author is required');
  } else {
    hideErrorMessage('author-error');
  }
}

// Total pages is invalid if it is empty, less than 1, or less than pages read.
function validateTotalPages() {
  if (totalPages.value === '') {
    displayErrorMessage('total-pages-error', 'Total pages is required');
  } else if (parseInt(totalPages.value) < 1) {
    displayErrorMessage(
      'total-pages-error',
      'Total pages cannot be less than 1'
    );
  } else if (parseInt(totalPages.value) < parseInt(pagesRead.value)) {
    displayErrorMessage(
      'total-pages-error',
      'Total pages cannot be less than pages read'
    );
  } else {
    hideErrorMessage('total-pages-error');
  }
}

/* Validates the year published by checking if it is empty, NaN, less than 1, or
    greater than the current year. */
function validateYearPublished() {
  const year = parseInt(yearPublished.value);
  console.log(year);
  const yearErrMsg = 'Year must be between 1 and ' + currentYear;
  // Get input value without converting to number to check for empty string
  if (yearPublished.value === '') {
    hideErrorMessage('year-error');
  } else if (isNaN(year) || year < 1 || year > currentYear) {
    displayErrorMessage('year-error', yearErrMsg);
  } else {
    hideErrorMessage('year-error');
  }
}

/* Toggle the display of the pages read input based on the value of 
   the read status dropdown. */
function togglePagesReadInput() {
  const isReading = readStatus.value === 'reading';

  pagesReadDiv.style.display = isReading ? 'flex' : 'none';
  // Make pages read required if the book is being read
  pagesRead.required = isReading;
  // Set max value of pages read to total pages if the book is being read
  pagesRead.max = isReading ? totalPages.value : undefined;
  // Show error message only if the book is being read
  pagesReadError.style.display = isReading ? 'block' : 'none';
}

/* Check if the number of pages read is empty, NaN, less than 1, 
or greater than total pages */
function validatePagesRead() {
  const pagesReadValue = parseInt(pagesRead.value);
  const totalPagesValue = parseInt(totalPages.value);
  // Get input value without converting to number to check for empty string
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
  } else if (pagesReadValue < totalPagesValue) {
    // This code is executed when user edits both pages read and total pages
    hideErrorMessage('total-pages-error');
    hideErrorMessage('pages-read-error');
  } else {
    hideErrorMessage('pages-read-error');
  }
}

// Displays an error message in the specified element.
function displayErrorMessage(elementId, message) {
  const element = document.getElementById(elementId);
  element.textContent = message;
}

// Hide the error message displayed in the specified element.
function hideErrorMessage(elementId) {
  const element = document.getElementById(elementId);
  element.textContent = '';
}

/* Disable or enable the form submit button based on whether any error messages are
  being displayed. */
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

/* Function that populates form inputs with book details for editing and 
disables the title input field. */
function showEditForm(event) {
  // Get book from myLibrary based on index
  const bookCard = event.target.closest('.book');
  const bookIndex = Number(bookCard.dataset.index);
  const book = myLibrary[bookIndex];

  // Get form inputs
  // How can I make this code block more DRY?
  const titleInput = document.querySelector('.title');
  const authorInput = document.querySelector('.author');
  const totalPagesInput = document.querySelector('.total-pages');
  const yearInput = document.querySelector('.year');
  const genreInput = document.querySelector('.genre');
  const readStatusInput = document.querySelector('.read-status');
  const pagesReadInput = document.querySelector('.pages-read');

  // Assign values to form inputs from book
  titleInput.value = book.title;
  authorInput.value = book.author;
  totalPagesInput.value = book.totalPages;
  yearInput.value = book.yearPublished;
  genreInput.value = book.genre;
  readStatusInput.value = book.readStatus;
  pagesReadInput.value = book.pagesRead;

  // Disable the title input so that user cannot edit it
  titleInput.disabled = true;

  // Show pages read input based on read status
  togglePagesReadInput();

  // Show form
  dialog.showModal();
}

//Removes a book from the library and the DOM when the delete button is clicked.
function deleteBook(event) {
  const book = event.target.closest('.book');
  const bookIndex = Number(book.dataset.index);
  // Remove book from library based on index
  myLibrary.splice(bookIndex, 1);
  book.remove();
}

/* Event Listeners */
// Load books when page loads.
window.addEventListener('DOMContentLoaded', displayBooks);

// Add code for Esc key
dialog.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    dialog.close();
  }
});

// Event listener for form inputs to validate
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
  // Disable submit button if there are errors
  disableSubmitBtn();
});

// Event listener for dialog buttons
document.addEventListener('click', (event) => {
  // Return 'close' to the dialog so that it doesn't send 'submit'
  if (event.target.classList.contains('form--close-icon')) {
    dialog.close('close');
  }

  // Return 'cancel' to the dialog so that it doesn't send 'submit'
  if (event.target.classList.contains('form--cancel-btn')) {
    dialog.close('cancel');
  }

  // Event listener for Add Book button
  if (event.target.classList.contains('library-heading__btn')) {
    // Reset form fields
    form.reset();

    // Enable title input after user finished updating a book
    title.disabled = false;

    // Hide pages read input when form is opened
    pagesReadDiv.style.display = 'none';

    // Show form
    dialog.showModal();
  }

  // Event listener for Update Book button
  if (event.target.classList.contains('book__update-btn')) {
    showEditForm(event);
  }

  // Event listener for Delete Book button
  if (event.target.classList.contains('book__delete-btn')) {
    deleteBook(event);

    // Remove all divs with class book to prevent duplicates
    const books = document.querySelectorAll('.book');
    books.forEach((book) => book.remove());

    // Run this function to reset the index of each book in myLibrary
    displayBooks();
  }
});

// Event listener for form submit
dialog.addEventListener('close', () => {

  if (dialog.returnValue === 'submit') {
    /* If the title input is disabled, when user updates a book
    title input returning undefined  thus creating a new book */
    document.querySelector('.title').removeAttribute('disabled');

    // Create new formData object
    const formData = new FormData(form);

    // Convert formData to object
    const bookData = Object.fromEntries(formData);

    const existingBook = myLibrary.find(
      (book) => book.title === bookData.title
    );

    // Check if book already exists
    if (existingBook) {
      // Update values
      bookData.coverImage = existingBook.coverImage;
      Object.assign(existingBook, bookData);
    } else {
      addBookToLibrary(bookData);
      console.log(myLibrary);
    }

    // Remove all divs with class book to prevent duplicates
    const books = document.querySelectorAll('.book');
    books.forEach((book) => book.remove());

    // Show all books in library
    displayBooks();
  }
});
