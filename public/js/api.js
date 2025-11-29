async function getTriagem() {
  try {
    const response = await fetch("http://localhost:3000/espera");
    if (!response.ok) throw new Error("Erro ao carregar triagem");

    const data = await response.json();

    // organiza dados
    const triagem = {
      vermelho: 0,
      laranja: 0,
      amarelo: 0,
      verde: 0,
      azul: 0
    };

    data.forEach(item => {
      const cor = item.cor.toLowerCase();
      if (triagem[cor] !== undefined) {
        triagem[cor] = item.quantidade;
      }
    });

    return triagem;

  } catch (err) {
    console.error("Erro ao buscar triagem:", err);
    return null;
  }
}

async function carregarTriagem() {
  const triagem = await getTriagem();
  if (!triagem) return;

  document.getElementById("valor-vermelho").innerText = triagem.vermelho;
  document.getElementById("valor-laranja").innerText = triagem.laranja;
  document.getElementById("valor-amarelo").innerText = triagem.amarelo;
  document.getElementById("valor-verde").innerText = triagem.verde;
  document.getElementById("valor-azul").innerText = triagem.azul;

  console.log("TRIAGEM CARREGADA:", triagem);
}

carregarTriagem();
carregarUltimaAtualizacaoTriagem();

setInterval(() => {
  carregarTriagem();
  carregarUltimaAtualizacaoTriagem();
}, 5000);


async function carregarUltimaAtualizacaoTriagem() {
  try {
    const response = await fetch("http://localhost:3000/espera/ultima");
    const json = await response.json();

    if (!json.ultimaAtualizacao) return;

    const data = new Date(json.ultimaAtualizacao);

    const horaFormatada = data.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });

    document.getElementById("ultima-atualizacao-triagem").innerText = horaFormatada;

  } catch (err) {
    console.error("Erro ao carregar última atualização da triagem:", err);
  }
}
