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

const updateBtn = document.querySelector('.book__update-btn');
const deleteBtn = document.querySelector('.book__delete-btn');

const myLibrary = [];
const bookCovers = [
  './images/book-covers/coffee.jpeg',
  './images/book-covers/colors.jpeg',
  './images/book-covers/flowers.jpeg',
  './images/book-covers/leaves.jpeg',
  './images/book-covers/paper.jpeg',
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
  readStatus,
  pagesRead
) {
  this.title = title;
  this.author = author;
  this.coverImage = coverImage;
  this.pages = pages;
  this.yearPublished = yearPublished;
  this.genre = genre;
  this.readStatus = readStatus;
  this.pagesRead = pagesRead;
}

function addBookToLibrary(bookData) {
  const newBook = new Book(
    bookData.title,
    bookData.author,
    bookData.coverImage,
    bookData.pages,
    bookData.yearPublished,
    bookData.genre,
    bookData.readStatus,
    bookData.pagesRead
  );
  console.log(newBook);
  myLibrary.push(newBook);

  console.log(myLibrary);
}



// add books manually
const dracula = new Book(
  'Dracula',
  'Bram Stoker',
  './images/dracula.jpg',
  418,
  1897,
  'Fiction',
  'reading',
  115
);
myLibrary.push(dracula);

const mother = new Book(
  'Mother',
  'Maxim Gorky',
  './images/mother.jpg',
  285,
  1906,
  'Fiction',
  'reading',
  234
);
myLibrary.push(mother);

const mockingBird = new Book(
  'To Kill a Mockingbird',
  'Harper Lee',
  './images/mocking-bird.jpeg',
  281,
  1960,
  'Fiction',
  'reading',
  150
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
  bookDiv.dataset.index = myLibrary.indexOf(book);

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
    const percent = Math.floor((bookObj.pagesRead * 100) / bookObj.pages);
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
  updateBtn.innerHTML = `Update <img src="./images/update.svg" alt="update" /> `;

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'book__delete-btn';
  deleteBtn.innerHTML = `Delete <img src="./images/delete.svg" alt="delete" /> `;

  // append buttons
  buttonsDiv.append(updateBtn, deleteBtn);
  return buttonsDiv;
}

// show error messages
// function showErrorMessages(event) {
//   const message = document.querySelector('.dialog__errors p');

//   const totalPages = event.target.form.querySelector('.pages').value;
//   console.log( typeof totalPages.value);
//   const yearPublished = event.target.form.querySelector('.year');

//   if (parseInt(totalPages.value) < 1 || totalPages.value < 1) {
//     message.textContent = 'Total pages cannot be less than 1';
//   } else if (parseInt(yearPublished.value) < 1 || yearPublished.value < 1) {
//     message.textContent = 'Year cannot be less than 1';
//   } else if (parseInt(yearPublished.value) > currentYear) {
//     message.textContent = 'Year cannot be greater than current year';
//   } 
// }

// dialog.addEventListener('input', (event) => {
//   showErrorMessages(event);
// })



// set max year for Year Published
const yearInput = document.querySelector('.year');
const currentYear = new Date().getFullYear();
yearInput.setAttribute('max', currentYear);


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

function errorTotalPages(event) {
  const errorMessage = document.querySelector('.dialog__errors p');
  const totalPages = event.target.form.querySelector('.pages').value;

  if (parseInt(totalPages) < 1) {
    errorMessage.textContent = 'Total pages cannot be less than 1';
  } 
  else {
    errorMessage.textContent = '';
  }
  
}

function errorYearPublished(event) {
  const errorMessage = document.querySelector('.dialog__errors p');
  const yearPublished = event.target.form.querySelector('.year').value;

  if (parseInt(yearPublished) < 1) {
    errorMessage.textContent = 'Year cannot be less than 1';
  } else if (parseInt(yearPublished) > currentYear) {
    errorMessage.textContent = 'Year cannot be greater than current year';
  } else {
    errorMessage.textContent = '';
  }
}

function errorPagesRead(event) {
  const totalPages = event.target.form.querySelector('.pages').value;
  const errorMessage = document.querySelector('.dialog__errors p');
  const pagesRead = event.target.form.querySelector('.pages-read').value;

  if (parseInt(pagesRead) < 1) {
    errorMessage.textContent = 'Pages read cannot be less than 0';
  } else if (parseInt(pagesRead) > parseInt(totalPages)) {
    errorMessage.textContent = 'Pages read cannot be greater than total pages';
  } else {
    errorMessage.textContent = '';
  }
}

function showReadPagesInput(event) {
  const totalPages = event.target.form.querySelector('.pages').value;
  const readStatus = event.target.form.querySelector('.read-status').value;
  const readPages = event.target.form.querySelector('.dialog__read-pages');
  const readPagesInput = event.target.form.querySelector('.pages-read');
  if (readStatus === 'reading') {
    // show input field 
    readPages.style.display = 'flex';
    // make input field required 
    readPagesInput.setAttribute('required', 'required');
    // set max value equal to total pages
    readPagesInput.setAttribute('max', totalPages);
  } else {
    readPagesInput.removeAttribute('required');
    readPages.style.display = 'none';
  }
}

// show pages read input only if readStatus is 'reading'
dialog.addEventListener('input', (event) => {
  
  // errorTotalPages(event);
  // errorYearPublished(event);
  // showReadPagesInput(event);
  if (event.target.classList.contains('pages')) {
    errorTotalPages(event);
  }
  if (event.target.classList.contains('year')) {
    errorYearPublished(event);
  }
  if (event.target.classList.contains('read-status')) {
    showReadPagesInput(event);
  }
  if (event.target.classList.contains('pages-read')) {
    errorPagesRead(event);
  }
  
  
});

// add code for Esc key
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    dialog.close('esc');
  }
})

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
    const existingBook = myLibrary.find(
      (book) => book.title === bookData.title
    );
    if (existingBook) {
      // update values
      Object.assign(existingBook, bookData);
    } else {
      addBookToLibrary(bookData);
    }

    // remove all divs with class book
    const books = document.querySelectorAll('.book');
    books.forEach((book) => book.remove());
    // show all books in library
    showBooks();
  }
});














// delete book
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('book__delete-btn')) {
    const bookDiv = event.target.closest('.book');
    const bookIndex = Number(bookDiv.dataset.index);
    myLibrary.splice(bookIndex, 1);
    bookDiv.remove();
  }
});

// update book
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('book__update-btn')) {
    const bookDiv = event.target.closest('.book');
    const bookIndex = Number(bookDiv.dataset.index);
    const book = myLibrary[bookIndex];

    // pre populate form fields
    document.querySelector('.title').value = book.title;
    document.querySelector('.author').value = book.author;
    document.querySelector('.pages').value = book.pages;
    document.querySelector('.year').value = book.yearPublished;
    document.querySelector('.genre').value = book.genre;
    document.querySelector('.read-status').value = book.readStatus;
    document.querySelector('.pages-read').value = book.pagesRead;

    // show dialog
    dialog.showModal();

  }
});
