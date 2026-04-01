const shapes = ['circle', 'square', 'rectangle', 'triangle'];
const shapeNames = {
    'circle': 'Círculo',
    'square': 'Quadrado',
    'rectangle': 'Retângulo',
    'triangle': 'Triângulo'
};

const colors = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#FFD433', '#33FFF6', '#FF8C33', '#8D33FF'];

let score = 0;
let targetShape = '';
let timeLeft = 30;
let timerInterval;
let highScore = parseInt(localStorage.getItem('highScore')) || 0;

function startGame() {
    score = 0;
    timeLeft = 30;
    document.getElementById('score').innerText = score;
    document.getElementById('timer').innerText = timeLeft;
    document.getElementById('high-score').innerText = highScore;
    
    // Limpa qualquer intervalo anterior antes de começar um novo
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
    
    initGame();
}

function updateTimer() {
    if (timeLeft <= 0) {
        timeLeft = 0;
        clearInterval(timerInterval);
        alert("O tempo acabou! Sua pontuação final foi: " + score);
    }
    document.getElementById('timer').innerText = timeLeft;
    timeLeft--;
}

function initGame() {
    const shapesArea = document.getElementById('shapes-area');
    shapesArea.innerHTML = '';
    
    // Escolhe uma forma aleatória para ser o alvo
    targetShape = shapes[Math.floor(Math.random() * shapes.length)];
    document.getElementById('target-shape').innerText = shapeNames[targetShape];

    // Embaralha e cria as formas na tela
    const shuffledShapes = [...shapes].sort(() => 0.5 - Math.random());
    
    shuffledShapes.forEach(shapeType => {
        const shapeDiv = document.createElement('div');
        shapeDiv.classList.add('shape', shapeType);

        // Escolhe uma cor aleatória da lista para esta forma
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        if (shapeType === 'triangle') {
            shapeDiv.style.borderBottomColor = randomColor;
        } else {
            shapeDiv.style.backgroundColor = randomColor;
        }

        shapeDiv.onclick = () => checkShape(shapeType);
        shapesArea.appendChild(shapeDiv);
    });
}

function checkShape(clickedShape) {
    if (timeLeft <= 0) return;

    const container = document.querySelector('.game-container');

    if (clickedShape === targetShape) {
        score++;
        timeLeft += 1; // Ganha 1 segundo

        if (score > highScore) {
            highScore = score;
            localStorage.setItem('highScore', highScore);
            document.getElementById('high-score').innerText = highScore;
        }
    } else {
        timeLeft -= 2; // Perde 2 segundos
        
        // Efeito de tremer
        container.classList.add('shake');
        setTimeout(() => container.classList.remove('shake'), 400);
    }

    // Atualiza interface imediatamente
    if (timeLeft < 0) timeLeft = 0;
    document.getElementById('score').innerText = score;
    document.getElementById('timer').innerText = timeLeft;
    
    initGame();
}

// Inicia o jogo ao carregar a página
window.onload = startGame;
