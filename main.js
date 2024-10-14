const addBook = document.querySelector('.add-book');
const closeButton = document.querySelector('.close-btn');
const dialog = document.querySelector('#form-dialog');
const bookName = document.querySelector('.title');
const authorName = document.querySelector('.author');
const confirmBtn = document.querySelector('.confirm-btn');
const cancelBtn = document.querySelector('.cancel-btn');

addBook.addEventListener('click', () => {
  // show form
  dialog.showModal();
})



