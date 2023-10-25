function initGame() {
    const emojis = [
        "🐵", "🐵", "🐶", "🐶", "🐺", "🐺", "🐱", "🐱", "🦁", "🦁", "🐯", "🐯", "🦊", "🦊", "🐮", "🐮"
    ];
    let openCards = [];
    let shuffleEmojis = shuffleArray(emojis);
    let elapsedTime = 0;
    let timerInterval;
    let points = 0; // Inicializa os pontos em zero

    function shuffleArray(array) {
        return array.slice().sort(() => Math.random() - 0.5);
    }

    function startTimer() {
        timerInterval = setInterval(function() {
            elapsedTime++;
            updateElapsedTime();
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
    }

    function updateElapsedTime() {
        const elapsedTimeElement = document.getElementById("time");
        elapsedTimeElement.textContent = `Tempo: ${elapsedTime} segundos`;
    }

    function handleClick() {
        if (openCards.length < 2) {
            this.classList.add("boxOpen");
            openCards.push(this);
        }

        if (openCards.length === 2) {
            setTimeout(checkMatch, 500);
        }
    }

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

        if (document.querySelectorAll(".boxMatch").length === emojis.length) {
            stopTimer();
            alert("Você Venceu!");
        }
    }

    function updatePoints() {
        const pointsElement = document.getElementById("points");
        pointsElement.textContent = `Pontos: ${points}`;
    }

    // Crie caixas no jogo
    for (let i = 0; i < emojis.length; i++) {
        let box = document.createElement("div");
        box.className = "item";
        box.innerHTML = shuffleEmojis[i];
        box.onclick = handleClick;
        document.querySelector(".game").appendChild(box);
    }

    startTimer();
    updatePoints(); // Inicializa o elemento de pontos
}

initGame();