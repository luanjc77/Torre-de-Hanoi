const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const logList = document.getElementById("log-list");

let numDiscos;
let posicoes;
let movimentos;
const hasteMap = { A: 0, B: 1, C: 2 };
const cores = ["#8ecae6", "#219ebc", "#ffb703", "#fb8500", "#ff6b6b", "#6a4c93", "#b5179e", "#00b4d8"];

function desenhar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < 3; i++) {
    const x = 150 + i * 220;
    ctx.beginPath();
    ctx.moveTo(x, 100);
    ctx.lineTo(x, 400);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#222";
    ctx.stroke();
  }

  for (let i = 0; i < 3; i++) {
    const torre = posicoes[i];
    for (let j = 0; j < torre.length; j++) {
      const disco = torre[j];
      const x = 150 + i * 220;
      const y = 390 - j * 30;
      const largura = disco * 30;
      ctx.fillStyle = cores[(disco - 1) % cores.length];
      ctx.fillRect(x - largura / 2, y, largura, 20);
      ctx.strokeStyle = "#444";
      ctx.strokeRect(x - largura / 2, y, largura, 20);
    }
  }
}

function mover(n, origem, destino, auxiliar) {
  if (n > 0) {
    mover(n - 1, origem, auxiliar, destino);
    movimentos.push([origem, destino]);
    mover(n - 1, auxiliar, destino, origem);
  }
}

function logar(texto) {
  const li = document.createElement("li");
  li.textContent = texto;
  logList.appendChild(li);
  logList.scrollTop = logList.scrollHeight;
}

function executarMovimentos(index = 0) {
  if (index >= movimentos.length) {
    logar(`✅ Finalizado em ${movimentos.length} movimentos`);
    return;
  }
  const [origem, destino] = movimentos[index];
  const disco = posicoes[origem].pop();
  posicoes[destino].push(disco);
  const texto = `Movimento ${index + 1}: Disco ${disco} de ${Object.keys(hasteMap)[origem]} para ${Object.keys(hasteMap)[destino]}`;
  console.log(texto);
  logar(texto);
  desenhar();
  setTimeout(() => executarMovimentos(index + 1), 500);
}

function iniciar() {
  numDiscos = parseInt(document.getElementById("numDiscos").value);
  const origem = hasteMap[document.getElementById("hasteInicial").value];
  const destino = hasteMap[document.getElementById("hasteFinal").value];
  const auxiliar = 3 - origem - destino;

  posicoes = [[], [], []];
  movimentos = [];
  logList.innerHTML = "";

  for (let i = numDiscos; i >= 1; i--) {
    posicoes[origem].push(i);
  }

  mover(numDiscos, origem, destino, auxiliar);
  desenhar();
  setTimeout(() => executarMovimentos(), 1000);
}
