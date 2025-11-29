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
setInterval(carregarTriagem, 5000); // atualiza a cada 5 segundos


// =============================
//   BUSCAR LEITOS DO BACKEND

/* async function carregarLeitosGraficos() {
  try {
    const response = await fetch("http://localhost:3000/leito");
    const leitos = await response.json();

    const setoresMap = {
      "Emergência - Adultos":   { total: 40, id: "graf1" },
      "Emergência - Pediátrica":{ total: 16, id: "graf2" },
      "Leitos Clínicos":        { total: 119, id: "graf3" },
      "Leitos Pediátricos":     { total: 17, id: "graf4" },
      "UTI Adulto":             { total: 16, id: "graf5" },
      "UTI Neonatal":           { total: 10, id: "graf6" }
    };

    const ocupadosPorSetor = {};
    Object.keys(setoresMap).forEach((nome) => {
      ocupadosPorSetor[nome] = 0;
    });

    leitos.forEach((leito) => {
      if (leito.status !== "ocupado") return;
      if (!leito.setor || !leito.setor.nome) return;

      const setorNome = leito.setor.nome.trim();

      if (ocupadosPorSetor[setorNome] === undefined) {
        console.warn("Setor sem mapeamento para gráfico:", setorNome);
        return;
      }

      ocupadosPorSetor[setorNome]++;
    });

    // --- CRIA E ATUALIZA OS GRÁFICOS + DESCRIÇÃO ---
    for (const setorNome in setoresMap) {
      const { total, id } = setoresMap[setorNome];
      const ocupados = ocupadosPorSetor[setorNome] ?? 0;

      const canvas = document.getElementById(id);
      if (!canvas) {
        console.warn("Canvas não encontrado:", id);
        continue;
      }

      criarGrafico(id, ocupados, total);

      // ---- AQUI: ATUALIZA O TEXTO AUTOMATICAMENTE ----
      const infoId = "info-" + id; // exemplo: graf1 → info-graf1
      const p = document.getElementById(infoId);

      if (p) {
        p.innerHTML = `Leitos: ${total}<br>Ocupados: ${ocupados}`;
      }
    }

  } catch (err) {
    console.error("Erro ao carregar gráficos:", err);
  }
}


carregarLeitosGraficos();
 */

