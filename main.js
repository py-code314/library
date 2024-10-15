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

function addBookToLibrary(bookData) {
  const newBook = new Book(bookData.title, bookData.author);
  console.log(newBook);
  myLibrary.push(newBook);

  console.log(myLibrary);
}
  





