const addBook = document.querySelector('.library-heading__btn');
const closeBtn = document.querySelector('.dialog--close-btn');
const dialog = document.querySelector('.dialog');
const form = document.querySelector('.dialog-form');
const bookName = document.querySelector('.title');
const authorName = document.querySelector('.author');
const confirmBtn = document.querySelector('.dialog--confirm-btn');
const cancelBtn = document.querySelector('.dialog--cancel-btn');

addBook.addEventListener('click', () => {
  // make sure fields are empty
  if (bookName.value !== '' && authorName.value !== '') {
    bookName.value = '';
    authorName.value = '';
  }
  
  // show form
  dialog.showModal();
  
})

// TODO: add code for Esc key 

cancelBtn.addEventListener('click', () => {
  // return 'cancel' to the dialog so that it doesn't send 'confirm'
  dialog.close('cancel');
  
})

closeBtn.addEventListener('click', () => {
  // return 'close' to the dialog so that it doesn't send 'confirm'
  dialog.close('close');
})

dialog.addEventListener('close', () => {
  console.log(dialog.returnValue);
  

  if (dialog.returnValue === 'confirm') {
    // create new formData object
    const formData = new FormData(form);
    // convert formData to object
    const bookData = Object.fromEntries(formData);
    console.log(bookData);
    addBookToLibrary(bookData);
  }
})

const myLibrary = [];
function Book(title, author) {
  // the constructor...
  this.title = title;
  this.author = author;
  // this.pages = pages;
  // this.yearPublished = yearPublished;
  // this.genre = genre;
  // this.readStatus = readStatus;
} 

const hound = new Book('The Hound of the Baskervilles', 'Arthur Conan Doyle');
myLibrary.push(hound);
const fahrenheit = new Book('Fahrenheit 451', 'Ray Bradbury');
myLibrary.push(fahrenheit);

myLibrary.forEach(book => {
  const bookDiv = document.createElement('div');
  bookDiv.className = 'book';

  const coverDiv = document.createElement('div');
  coverDiv.className = 'book__cover';

  const detailsDiv = document.createElement('div');
  detailsDiv.className = 'book__details';

  const titleElement = document.createElement('h3');
  titleElement.textContent = book.title;

  const authorElement = document.createElement('p');
  authorElement.textContent = book.author;

  bookDiv.append(coverDiv, detailsDiv);
  detailsDiv.append(titleElement, authorElement);
  document.querySelector('.library').append(bookDiv);
});

function addBookToLibrary(bookData) {
  const newBook = new Book(bookData.title, bookData.author);
  console.log(newBook);
  myLibrary.push(newBook);

  console.log(myLibrary);
}
  





