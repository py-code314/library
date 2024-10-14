const addBook = document.querySelector('.library-heading__btn');
const closeBtn = document.querySelector('.dialog--close-btn');
const dialog = document.querySelector('.dialog');
const bookName = document.querySelector('.title');
const authorName = document.querySelector('.author');
const confirmBtn = document.querySelector('.confirm-btn');
const cancelBtn = document.querySelector('.cancel-btn');

addBook.addEventListener('click', () => {
  // show form
  dialog.showModal();
})



