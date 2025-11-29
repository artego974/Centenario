async function carregarLeitos() {
    try {
        const response = await fetch("http://localhost:3000/leito");
        const dados = await response.json();

        // Apenas leitos ocupados
        const ocupados = dados.filter(l => l.status === "ocupado");

        // Agrupar por dia YYYY-MM-DD
        const mapa = {};

        ocupados.forEach(leito => {
            const data = new Date(leito.date).toISOString().split("T")[0];
            if (!mapa[data]) mapa[data] = 0;
            mapa[data]++;
        });

        // Ordena do mais velho -> mais novo
        const datasOrdenadas = Object.keys(mapa).sort();

        // Pega os 4 mais recentes
        const ultimos4 = datasOrdenadas.slice(-4);

        // Monta os valores na ordem correta
        const ocupadosUltimos4 = ultimos4.map(d => mapa[d]);

        // Salva no localStorage
        localStorage.setItem("ocupadosDatas", JSON.stringify(ultimos4));
        localStorage.setItem("ocupadosValores", JSON.stringify(ocupadosUltimos4));

        console.log("Dias (velho → novo):", ultimos4);
        console.log("Valores:", ocupadosUltimos4);

    } catch (err) {
        console.error("Erro ao carregar os leitos:", err);
    }
}

carregarLeitos();
