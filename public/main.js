const labelsDias = JSON.parse(localStorage.getItem("ocupadosDatas"));
const valoresDias = JSON.parse(localStorage.getItem("ocupadosValores"));

console.log("Labels:", labelsDias);
console.log("Values:", valoresDias);

const dados = {
    labels: labelsDias,
    values: valoresDias
};

function criarGrafico() {
    const canvas = document.getElementById("grafico");

    new Chart(canvas, {
        type: "line",
        data: {
            labels: dados.labels,
            datasets: [
                {
                    label: "Leitos Ocupados por Dia",
                    data: dados.values,
                    borderColor: "rgba(0, 120, 215, 1)",
                    backgroundColor: "rgba(0, 120, 215, 0.2)",
                    borderWidth: 3,
                    pointRadius: 5,
                    tension: 0.4,
                    fill: true
                }
            ]
        }
    });
}

window.onload = criarGrafico;

