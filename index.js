const cardSection = document.getElementById("card-section");

const myLibrary = [];

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  createCardElement(book);
}

Book.prototype.info = function () {
  console.log(
    `${this.title} by ${this.author}, ${this.pages} pages, ${
      this.read ? "has been read" : "not read yet"
    }.`
  );
};

function createCardElement(book) {
  const cardElement = document.createElement("div");
  cardElement.className = "card";

  const header = document.createElement("h3");
  header.textContent = `Title: ${book.title}`;

  const author = document.createElement("p");
  author.textContent = `By ${book.author}`;

  const pages = document.createElement("p");
  pages.textContent = `Number of pages: ${book.pages}`;

  cardElement.append(header, author, pages);
  cardSection.appendChild(cardElement);
}

addBookToLibrary("hello world", "me", 98);
