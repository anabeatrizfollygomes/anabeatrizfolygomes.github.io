let library = [];

// Função para adicionar um livro
function addBook() {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isAvailable = document.getElementById('isAvailable').value === 'true';

  if (title && author) {
    const newBook = {
      title: title,
      author: author,
      available: isAvailable,
      loans: 0
    };
    library.push(newBook);
    alert('Livro adicionado com sucesso!');
    clearFields();
  } else {
    alert('Por favor, preencha todos os campos!');
  }
}

// Função para limpar os campos do formulário
function clearFields() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isAvailable').value = 'true';
}

// Função para listar os livros disponíveis
function listAvailableBooks() {
  const availableBooks = library.filter(book => book.available);
  const availableBooksList = document.getElementById('availableBooks');
  availableBooksList.innerHTML = '';

  availableBooks.forEach(book => {
    const li = document.createElement('li');
    li.textContent = `${book.title} - ${book.author}`;
    availableBooksList.appendChild(li);
  });
}

// Função para listar os livros emprestados
function listBorrowedBooks() {
  const borrowedBooks = library.filter(book => !book.available);
  const borrowedBooksList = document.getElementById('borrowedBooks');
  borrowedBooksList.innerHTML = '';

  borrowedBooks.forEach(book => {
    const li = document.createElement('li');
    li.textContent = `${book.title} - ${book.author}`;
    borrowedBooksList.appendChild(li);
  });
}

// Função para calcular o total de empréstimos
function calculateTotalLoans() {
  const totalLoans = library.reduce((accum, book) => accum + book.loans, 0);
  alert(`Total de empréstimos realizados: ${totalLoans}`);
}

// Função para atualizar a disponibilidade de um livro
function updateAvailability(bookTitle, isAvailable) {
  const book = library.find(b => b.title === bookTitle);
  if (book) {
    book.available = isAvailable;
  }
}

// Função para emprestar um livro
function borrowBook(bookTitle) {
  const book = library.find(b => b.title === bookTitle);
  if (book && book.available) {
    book.available = false;
    book.loans += 1;
    alert(`Livro "${bookTitle}" emprestado com sucesso!`);
  } else {
    alert(`O livro "${bookTitle}" não está disponível para empréstimo.`);
  }
}

// Função para devolver um livro
function returnBook(bookTitle) {
  const book = library.find(b => b.title === bookTitle);
  if (book && !book.available) {
    book.available = true;
    alert(`Livro "${bookTitle}" devolvido com sucesso!`);
  } else {
    alert(`O livro "${bookTitle}" não foi emprestado.`);
  }
}
