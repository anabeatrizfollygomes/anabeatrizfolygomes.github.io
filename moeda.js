const API_URL = "https://v6.exchangerate-api.com/v6/0c0ca0a7272ea9bfab816300/latest/";

async function converterMoeda(valor, moedaOrigem, moedaDestino) {
  try {
    const response = await fetch(`${API_URL}${moedaOrigem}`);
    const data = await response.json();

    if (data.conversion_rates) {
      const taxa = data.conversion_rates[moedaDestino];
      const valorConvertido = (valor * taxa).toFixed(2);
      return valorConvertido;
    } else {
      throw new Error("Erro ao obter as taxas de conversão.");
    }
  } catch (error) {
    console.error("Erro:", error);
    return null;
  }
}

document.getElementById("convertButton").addEventListener("click", async () => {
  const amount = parseFloat(document.getElementById("amount").value);
  const fromCurrency = document.getElementById("fromCurrency").value;
  const toCurrency = document.getElementById("toCurrency").value;

  if (!amount || amount <= 0) {
    document.getElementById("result").innerText = "Por favor, insira um valor válido.";
    return;
  }

  const result = await converterMoeda(amount, fromCurrency, toCurrency);

  if (result) {
    document.getElementById("result").innerText = `Resultado: ${result} ${toCurrency}`;
  } else {
    document.getElementById("result").innerText = "Erro ao realizar a conversão.";
  }
});
