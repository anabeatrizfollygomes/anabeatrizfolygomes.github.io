// URL da API com a chave
const API_KEY = "7e5e23a7dd4c2ea2ca1d7cf2425f28b8";
const API_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric&q=`;

// Função assíncrona para buscar o clima
async function buscarClima(cidade) {
  try {
    const response = await fetch(API_URL + cidade);
    const data = await response.json();

    if (data.cod === 200) {
      exibirClima(data);
    } else {
      document.getElementById("weatherList").innerHTML = `<li>${data.message}</li>`;
    }
  } catch (error) {
    console.error("Erro ao buscar o clima:", error);
  }
}

// Função para exibir informações climáticas
function exibirClima(dados) {
  const clima = {
    cidade: dados.name,
    temperatura: dados.main.temp,
    umidade: dados.main.humidity,
    condicao: dados.weather[0].description,
  };

  // Filtrar condições extremas (temperatura > 35°C ou < 5°C)
  const climaFiltrado = [clima].filter(item => item.temperatura > 35 || item.temperatura < 5);

  // Exibir informações
  if (climaFiltrado.length > 0) {
    const listaHTML = climaFiltrado
      .map(item => `<li><strong>${item.cidade}</strong> - ${item.temperatura}°C, ${item.condicao} (Umidade: ${item.umidade}%)</li>`)
      .join("");
    document.getElementById("weatherList").innerHTML = listaHTML;
  } else {
    document.getElementById("weatherList").innerHTML = "<li>Não há condições climáticas extremas.</li>";
  }
}

// Adicionar evento ao botão de busca
document.getElementById("searchButton").addEventListener("click", () => {
  const cidade = document.getElementById("cityName").value.trim();
  if (cidade) {
    buscarClima(cidade);
  } else {
    document.getElementById("weatherList").innerHTML = "<li>Por favor, insira o nome de uma cidade.</li>";
  }
});
