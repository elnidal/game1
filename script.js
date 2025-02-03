const dino = document.getElementById('dino');
const cactus = document.getElementById('cactus');
const scoreSpan = document.getElementById('scoreSpan');
let score = 0;
let isJumping = false;

function jump() {
    if (!isJumping) {
        isJumping = true;
        let position = 0;
        let upInterval = setInterval(() => {
            if (position >= 100) {
                clearInterval(upInterval);
                let downInterval = setInterval(() => {
                    if (position <= 0) {
                        clearInterval(downInterval);
                        isJumping = false;
                    } else {
                        position -= 3;
                        dino.style.bottom = position + 'px';
                    }
                }, 20);
            } else {
                position += 3;
                dino.style.bottom = position + 'px';
            }
        }, 20);
    }
}

function moveCactus() {
    let position = 580;
    setInterval(() => {
        if (position <= -20) {
            position = 580;
            score += 1;
            scoreSpan.textContent = score;
        } else {
            position -= 2;
            cactus.style.left = position + 'px';
        }
    }, 20);
}

function checkCollision() {
    setInterval(() => {
        let dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue('bottom'));
        let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue('left'));
        
        if (cactusLeft < 50 && cactusLeft > 0 && dinoBottom <= 40) {
            alert('Game Over! Score: ' + score);
            score = 0;
            scoreSpan.textContent = score;
        }
    }, 10);
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        jump();
    }
});

moveCactus();
checkCollision();
