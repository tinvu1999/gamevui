const dino = document.querySelector('.dino');
const cactus = document.querySelector('.cactus');
let isJumping = false;
let isGameOver = false;

// Xử lý nhảy
function jump() {
    if (isJumping) return;
    isJumping = true;

    let upInterval = setInterval(() => {
        let dinoBottom = parseInt(window.getComputedStyle(dino).bottom);

        if (dinoBottom >= 150) {
            clearInterval(upInterval);

            let downInterval = setInterval(() => {
                if (dinoBottom <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                }
                dino.style.bottom = dinoBottom - 5 + 'px';
                dinoBottom -= 5;
            }, 20);
        } else {
            dino.style.bottom = dinoBottom + 5 + 'px';
            dinoBottom += 5;
        }
    }, 20);
}

// Phát hiện va chạm
function checkCollision() {
    const dinoRect = dino.getBoundingClientRect();
    const cactusRect = cactus.getBoundingClientRect();

    if (
        dinoRect.left < cactusRect.right &&
        dinoRect.right > cactusRect.left &&
        dinoRect.bottom > cactusRect.top
    ) {
        isGameOver = true;
        cactus.style.animation = 'none';
        cactus.style.display = 'none';
        alert('Game Over!');
    }
}

// Lắng nghe sự kiện phím nhấn
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        jump();
    }
});

// Kiểm tra va chạm liên tục
setInterval(() => {
    if (!isGameOver) {
        checkCollision();
    }
}, 50);
