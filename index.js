const cardSection = document.getElementById("card-section");
const openAddnNewBookModal = document.getElementById("open-add-new-book-modal");
const newBookDialog = document.getElementById("new-book-dialog");
const newBookForm = document.getElementById("new-book-form");
const confirmAddBook = document.getElementById("confirm-add-book");

const myLibrary = new Map();

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.set(book.id, book);
  createCardElement(book);
}

function createCardSection(headerText, text) {
  const cardSection = document.createElement("div");
  cardSection.className = "card-info";
  const header = document.createElement("h5");
  const paragraph = document.createElement("p");

  header.textContent = headerText;
  paragraph.textContent = text;
  cardSection.append(header, paragraph);

  return cardSection;
}

function handleUpdateReadStatus(bookId, statusSection) {
  const book = myLibrary.get(bookId);

  myLibrary.set(book.id, {
    ...book,
    read: !book.read,
  });

  statusSection.querySelector("p").textContent = !book.read
    ? "Read"
    : "Not read yet";
}

function handleDeleteBookCard(bookId, cardElement) {
  myLibrary.delete(bookId);
  cardElement.remove();
}

function createCardElement(book) {
  const cardElement = document.createElement("div");
  cardElement.className = "card";

  const title = document.createElement("h2");
  title.textContent = `${book.title}`;

  const authorSection = createCardSection("Author", book.author);
  const pagesSection = createCardSection("Pages", book.pages);
  const statusSection = createCardSection(
    "Status",
    book.read ? "Read" : "Not read yet",
  );
  const buttonContainer = document.createElement("div");
  const readButton = document.createElement("button");
  const deleteButton = document.createElement("button");

  readButton.textContent = "Update Read Status";
  deleteButton.textContent = "Delete Book";

  readButton.addEventListener(
    "click",
    handleUpdateReadStatus.bind(null, book.id, statusSection),
  );
  deleteButton.addEventListener(
    "click",
    handleDeleteBookCard.bind(null, book.id, cardElement),
  );
  buttonContainer.className = "button-container";
  buttonContainer.append(readButton, deleteButton);

  cardElement.append(
    title,
    authorSection,
    pagesSection,
    statusSection,
    buttonContainer,
  );

  cardSection.appendChild(cardElement);
}

openAddnNewBookModal.addEventListener("click", () => {
  newBookDialog.showModal();
});

newBookDialog.addEventListener("close", () => {
  if (newBookDialog.returnValue === "confirm") {
    const form = new FormData(newBookForm);
    const title = form.get("title");
    const author = form.get("author");
    const numPages = form.get("numPages");
    const read = form.get("read");
    addBookToLibrary(title, author, numPages, Boolean(read));
    newBookForm.reset();
  }
});

addBookToLibrary("Children of Time", "Adrian Tchaikovsky", 600, true);
