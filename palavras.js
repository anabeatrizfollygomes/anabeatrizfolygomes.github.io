// Função para pegar 5 frases aleatórias da API Quotable
async function getRandomQuotes() {
    const quotesContainer = document.getElementById('quotes');
    quotesContainer.innerHTML = '';  // Limpa o container antes de exibir novas frases
  
    // Requisições para obter 5 frases aleatórias
    const requests = [];
    for (let i = 0; i < 5; i++) {
      requests.push(fetch('https://api.quotable.io/random'));
    }
  
    try {
      // Espera todas as requisições serem resolvidas
      const responses = await Promise.all(requests);
  
      // Processa as respostas
      const quotes = await Promise.all(responses.map(response => response.json()));
  
      // Exibe as frases e autores
      quotes.forEach(quote => {
        const quoteElement = document.createElement('div');
        quoteElement.classList.add('quote');
        quoteElement.innerHTML = `
          <p>"${quote.content}"</p>
          <p class="author">- ${quote.author}</p>
        `;
        quotesContainer.appendChild(quoteElement);
      });
    } catch (error) {
      console.error('Erro ao obter frases:', error);
      quotesContainer.innerHTML = '<p>Houve um erro ao carregar as frases. Tente novamente.</p>';
    }
  }
  