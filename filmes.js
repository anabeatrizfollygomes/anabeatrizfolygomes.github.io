// URL base da API com uma chave de teste
const API_URL = "https://www.omdbapi.com/?apikey= ac27b5bd";

// Array para armazenar filmes
let filmes = [];

// Função para buscar filmes por título
async function buscarFilmes(titulo) {
  try {
    const response = await fetch(`${API_URL}&s=${titulo}`);
    const data = await response.json();

    if (data.Response === "True") {
      filmes = data.Search;
      exibirFilmes();
    } else {
      document.getElementById("movieList").innerHTML = `<li>${data.Error}</li>`;
    }
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
  }
}

// Função para exibir filmes no HTML
function exibirFilmes() {
  // Mapear os filmes para extrair título, ano e diretor (mock de diretor)
  const filmesMapeados = filmes.map(filme => ({
    titulo: filme.Title,
    ano: parseInt(filme.Year),
    diretor: "Desconhecido" // A API de busca geral não retorna o diretor, mas este campo está presente em detalhes do filme
  }));

  // Filtrar apenas filmes lançados após o ano 2000
  const filmesFiltrados = filmesMapeados.filter(filme => filme.ano > 2000);

  // Gerar a lista de filmes no HTML
  const listaHTML = filmesFiltrados
    .map(filme => `<li><strong>${filme.titulo}</strong> (${filme.ano}) - Diretor: ${filme.diretor}</li>`)
    .join("");

  document.getElementById("movieList").innerHTML = listaHTML || "<li>Nenhum filme encontrado após o ano 2000.</li>";
}

// Adicionar evento ao botão de busca
document.getElementById("searchButton").addEventListener("click", () => {
  const titulo = document.getElementById("movieTitle").value.trim();
  if (titulo) {
    buscarFilmes(titulo);
  } else {
    document.getElementById("movieList").innerHTML = "<li>Por favor, insira um título para buscar.</li>";
  }
});
