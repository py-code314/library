const addBook = document.querySelector('.library-heading__btn');
const closeBtn = document.querySelector('.dialog--close-btn');
const dialog = document.querySelector('.dialog');
const form = document.querySelector('.dialog-form');
const bookName = document.querySelector('.title');
const authorName = document.querySelector('.author');
const confirmBtn = document.querySelector('.dialog--confirm-btn');
const cancelBtn = document.querySelector('.dialog--cancel-btn');

// load books when page loads
window.addEventListener('DOMContentLoaded', () => {
  showBooks();
})

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
    books.forEach(book => book.remove());
    // show all books in library
    showBooks();
    
    
  }
})

const myLibrary = [];
function Book(title, author, coverImage, pages, yearPublished, genre, readStatus) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.coverImage = coverImage;
  this.pages = pages;
  this.yearPublished = yearPublished;
  this.genre = genre;
  this.readStatus = readStatus;
} 

const hound = new Book('The Hound of the Baskervilles', 'Arthur Conan Doyle', './images/hound.jpeg', 295, 1890, 'Fiction', 'Yes');
myLibrary.push(hound);
const fahrenheit = new Book('Fahrenheit 451', 'Ray Bradbury', './images/fahrenheit.jpg', 195, 1953, 'Fiction', 'No');
myLibrary.push(fahrenheit);
const frankenstein = new Book('Frankenstein', 'Mary Shelley', './images/frankenstein.jpg', 160, 1818, 'Fiction', 'No');
myLibrary.push(frankenstein);

const bookCovers = ['./images/book-covers/book.jpeg', './images/book-covers/coffee.jpeg', './images/book-covers/colors.jpeg', './images/book-covers/dark-green.jpeg', './images/book-covers/flowers.jpeg', './images/book-covers/leaves.jpeg', './images/book-covers/paper.jpeg', './images/book-covers/red.jpeg', './images/book-covers/roses.jpeg', './images/book-covers/sky.jpeg', './images/book-covers/stars.jpeg', './images/book-covers/vase.jpeg'];

function showBooks() {
  myLibrary.forEach((book) => {
    const bookDiv = document.createElement('div');
    bookDiv.className = 'book';

    const coverDiv = document.createElement('div');
    coverDiv.className = 'book__cover';

    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'book__details';

    const coverPhoto = document.createElement('img');
    // coverPhoto.src = book.coverImage;
    // Add book covers from an array for books added by user
    if (book.coverImage) {
      coverPhoto.src = book.coverImage;
    } else {
      coverPhoto.src = bookCovers[Math.floor(Math.random() * bookCovers.length)];
    }
      
    

    const titleElement = document.createElement('h3');
    titleElement.textContent = book.title;

    const authorElement = document.createElement('p');
    authorElement.textContent = book.author;

    bookDiv.append(coverDiv, detailsDiv);
    coverDiv.append(coverPhoto);
    detailsDiv.append(titleElement, authorElement);
    document.querySelector('.library').append(bookDiv);
  });

}



function addBookToLibrary(bookData) {
  const newBook = new Book(bookData.title, bookData.author);
  // console.log(newBook);
  myLibrary.push(newBook);

  console.log(myLibrary);
  
}
  





