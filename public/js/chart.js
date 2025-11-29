// Plugin para escrever texto no centro do gráfico
const centerTextPlugin = {
  id: 'centerText',
  beforeDraw(chart, args, options) {
    const { ctx, chartArea: { width, height } } = chart;

    ctx.save();
    ctx.font = 'bold 22px Arial';
    ctx.fillStyle = '#278FAA';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const text = options.text;
    ctx.fillText(text, width / 2, height / 2 + 10);
    ctx.restore();
  }
};

Chart.register(centerTextPlugin);



// =============================
//   BUSCAR LEITOS DO BACKEND
// =============================

async function carregarLeitosGraficos() {
  try {
    const response = await fetch("http://localhost:3000/leito");
    const leitos = await response.json();

    // Mapeamento: NOME DO SETOR → ids dos elementos
    const setoresMap = {
      "Emergência - Adultos":   { total: 40, grafId: "graf1", infoId: "info-graf1" },
      "Emergência - Pediátrica":{ total: 16, grafId: "graf2", infoId: "info-graf2" },
      "Leitos Clínicos":        { total: 119, grafId: "graf3", infoId: "info-graf3" },
      "Leitos Pediátricos":     { total: 17, grafId: "graf4", infoId: "info-graf4" },
      "UTI Adulto":             { total: 16, grafId: "graf5", infoId: "info-graf5" },
      "UTI Neonatal":           { total: 10, grafId: "graf6", infoId: "info-graf6" }
    };

    // inicia contador de ocupados por setor
    const ocupadosPorSetor = {};
    Object.keys(setoresMap).forEach((nome) => {
      ocupadosPorSetor[nome] = 0;
    });

    // conta leitos ocupados
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

    console.log("OCUPADOS POR SETOR:", ocupadosPorSetor);

    // cria/atualiza os 6 gráficos + descrição
    for (const setorNome in setoresMap) {
      const { total, grafId, infoId } = setoresMap[setorNome];
      const ocupados = ocupadosPorSetor[setorNome] ?? 0;

      const canvas = document.getElementById(grafId);
      if (!canvas) {
        console.warn("Canvas não encontrado:", grafId);
        continue;
      }

      criarGrafico(grafId, ocupados, total);

      // Atualiza descrição abaixo do gráfico
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
carregarUltimaAtualizacao();

// se quiser atualizar de X em X tempo:
setInterval(() => {
  carregarLeitosGraficos();
  carregarUltimaAtualizacao();
}, 10000);


function criarGrafico(id, ocupados, total) {

  // --- 🛑 Se vier a mais, força o limite ---
  if (ocupados > total) ocupados = total;

  const disponiveis = total - ocupados;

  // --- porcentagem segura ---
  const porcentagem = Math.round((ocupados / total) * 100);

  new Chart(document.getElementById(id), {
    type: 'doughnut',
    data: {
      labels: ['Ocupados', 'Disponíveis'],
      datasets: [{
        data: [ocupados, disponiveis],
        backgroundColor: ['#278FAA', '#dfe6e9'],
        borderWidth: 1,
        hoverOffset: 8
      }]
    },

    options: {
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `${context.label}: ${context.raw}`;
            }
          }
        },
        centerText: {
          text: porcentagem + '%'
        }
      },
      cutout: '65%'
    }
  });
}
    
async function carregarUltimaAtualizacao() {
  try {
    const res = await fetch("http://localhost:3000/leito/ultima");
    const json = await res.json();

    if (!json.ultimaAtualizacao) return;

    const data = new Date(json.ultimaAtualizacao);

    const formatado = data.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });

    document.getElementById("ultima-atualizacao").innerText = formatado;

  } catch (err) {
    console.error("Erro ao carregar última atualização:", err);
  }
}





