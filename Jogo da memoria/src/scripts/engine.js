const logos = [
  "src/img/Bahia.jpg",
  "src/img/Bahia.jpg",
  "src/img/Botafogo_RJ.jpg",
  "src/img/Botafogo_RJ.jpg",
  "src/img/Corinthians.jpg",
  "src/img/Corinthians.jpg",
  "src/img/Flamengo.jpg",
  "src/img/Flamengo.jpg",
  "src/img/Gremio.jpg",
  "src/img/Gremio.jpg",
  "src/img/Palmeiras.jpg",
  "src/img/Palmeiras.jpg",
  "src/img/Sao_Paulo.jpg",
  "src/img/Sao_Paulo.jpg",
  "src/img/Fluminense.jpg",
  "src/img/Fluminense.jpg",
];


let timer; // Armazena o intervalo do cronômetro
let seconds = 0; // Conta os segundos
let isTimerRunning = false; // Verifica se o cronômetro está rodando


function startTimer() {
  const timerElement = document.getElementById("timer");
  timer = setInterval(() => {
    seconds++;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    // Formata o tempo para "00:00"
    timerElement.textContent = 
      `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timer); // Para o cronômetro
}













let openCards = [];
let shuffleLogos = logos.sort(() => (Math.random() > 0.5 ? 2 : -1));

for (let i = 0; i < logos.length; i++) {
  let box = document.createElement("div");
  box.className = "item";

  // Cria uma imagem escondida dentro do box
  let img = document.createElement("img");
  img.src = shuffleLogos[i];
  img.style.display = "none"; // Esconde a imagem inicialmente
  
  box.appendChild(img);
  box.onclick = handleClick;
  document.querySelector(".game").appendChild(box);
}

function handleClick() {
  // Inicia o cronômetro no primeiro clique
  if (!isTimerRunning) {
    startTimer();
    isTimerRunning = true;
  }

  if (openCards.length < 2 && !this.classList.contains("boxOpen")) {
    this.classList.add("boxOpen");
    this.querySelector("img").style.display = "block"; // Mostra a imagem
    openCards.push(this);
  }

  if (openCards.length === 2) {
    setTimeout(checkMatch, 500);
  }
}


function checkMatch() {
  const img1 = openCards[0].querySelector("img").src;
  const img2 = openCards[1].querySelector("img").src;

  if (img1 === img2) {
    openCards[0].classList.add("boxMatch");
    openCards[1].classList.add("boxMatch");
  } else {
    openCards[0].classList.remove("boxOpen");
    openCards[1].classList.remove("boxOpen");

    // Esconde as imagens novamente
    openCards[0].querySelector("img").style.display = "none";
    openCards[1].querySelector("img").style.display = "none";
  }

  openCards = [];

  // Verifica se todas as cartas estão combinadas

if (document.querySelectorAll(".boxMatch").length === logos.length) {
  stopTimer(); // Para o cronômetro

  // Captura o tempo final
  const finalTime = document.getElementById("timer").textContent;

  // Cria a div do alerta
  const alertContainer = document.getElementById("alert-container");
  alertContainer.innerHTML = `
    <div class="alert alert-success" role="alert">
      🎉 Você venceu! Tempo: <strong>${finalTime}</strong>
    </div>
  `;
}

}

