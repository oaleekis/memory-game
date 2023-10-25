function initGame() {
    // Define um array de emojis para o jogo
    const emojis = [
        "🐵", "🐵", "🐶", "🐶", "🐺", "🐺", "🐱", "🐱", "🦁", "🦁", "🐯", "🐯", "🦊", "🦊", "🐮", "🐮"
    ];

    // Inicializa um array vazio para acompanhar as cartas abertas
    let openCards = [];

    // Embaralha o array de emojis
    let shuffleEmojis = shuffleArray(emojis);

    // Inicializa variáveis para tempo decorrido, intervalo de tempo e pontos
    let elapsedTime = 0;
    let timerInterval;
    let points = 0;

    // Função para embaralhar um array
    function shuffleArray(array) {
        return array.slice().sort(() => Math.random() - 0.5);
    }

    // Função para iniciar o cronômetro do jogo
    function startTimer() {
        timerInterval = setInterval(function() {
            elapsedTime++;
            updateElapsedTime();
        }, 1000);
    }

    // Função para parar o cronômetro do jogo
    function stopTimer() {
        clearInterval(timerInterval);
    }

    // Função para atualizar o tempo decorrido exibido
    function updateElapsedTime() {
        const elapsedTimeElement = document.getElementById("time");
        elapsedTimeElement.textContent = `Tempo: ${elapsedTime} segundos`;
    }

    // Função para lidar com eventos de clique nas cartas
    function handleClick() {
        if (openCards.length < 2) {
            this.classList.add("boxOpen");
            openCards.push(this);
        }

        if (openCards.length === 2) {
            setTimeout(checkMatch, 500);
        }
    }

    // Função para verificar se duas cartas abertas coincidem
    function checkMatch() {
        if (openCards[0].innerHTML === openCards[1].innerHTML) {
            openCards[0].classList.add("boxMatch");
            openCards[1].classList.add("boxMatch");
            points += 100;
            updatePoints(); // Atualiza os pontos exibidos no elemento HTML
        } else {
            openCards[0].classList.remove("boxOpen");
            openCards[1].classList.remove("boxOpen");
        }

        openCards = [];

        // Verifica se todas as cartas estão combinadas, para o cronômetro e exibe um alerta de vitória
        if (document.querySelectorAll(".boxMatch").length === emojis.length) {
            stopTimer();
            alert("Você Venceu!");
        }
    }

    // Função para atualizar os pontos exibidos
    function updatePoints() {
        const pointsElement = document.getElementById("points");
        pointsElement.textContent = `Pontos: ${points}`;
    }

    // Cria e inicializa caixas no jogo
    for (let i = 0; i < emojis.length; i++) {
        let box = document.createElement("div");
        box.className = "item";
        box.innerHTML = shuffleEmojis[i];
        box.onclick = handleClick;
        document.querySelector(".game").appendChild(box);
    }

    // Inicia o cronômetro do jogo e inicializa o elemento de pontos
    startTimer();
    updatePoints(); // Inicializa o elemento de pontos
}


initGame();