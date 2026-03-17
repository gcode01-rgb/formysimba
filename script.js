// 1. АУЫСАТЫН СТИКЕРЛЕР МЕН МӘТІНДЕР ТІЗІМІ
const kissSteps = [
    { 
        img: "https://media.tenor.com/VcR7PqtHqkkAAAA1/besos.webp", 
        text: "Тағы да сүйші! 😘" 
    },
    { 
        img: "https://media.tenor.com/8PoO4kc08gAAAAAm/dudu-kiss-dudu-kiss-hand.webp", 
        text: "Қандай тәтті... ✨" 
    },
    { 
        img: "https://media.tenor.com/TReOhQcXVuEAAAAm/kiss.webp", 
        text: "Тоқтама, ұнап жатыр! ❤️" 
    },
    { 
        img: "https://media.tenor.com/cCJohJfASEwAAAA1/h.webp", 
        text: "Сені қатты жақсы көрем! 🥰" 
    }
];

let kissIndex = 0;

const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const sticker = document.getElementById('mainSticker');
const title = document.getElementById('title');
const container = document.querySelector('.button-container');

// 2. ЖОҚ БАТЫРМАСЫ ҚАШАДЫ
noBtn.addEventListener('mouseover', () => {
    noBtn.style.position = 'fixed';
    const maxX = window.innerWidth - noBtn.offsetWidth - 20;
    const maxY = window.innerHeight - noBtn.offsetHeight - 20;
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
});

// 3. ИӘ БАСЫЛҒАНДА: СҮЮ БАТЫРМАСЫНА ӨТУ
yesBtn.addEventListener('click', () => {
    sticker.src = "https://media.tenor.com/r0VCmLiA3mEAAAAm/sseeyall-bubu-dudu.webp";
    title.innerText = "менде жақсы көрем! 🥰";
    
    container.innerHTML = `
        <button id="kissBtn" style="background-color: #fd79a8; color: white; padding: 20px 40px; font-size: 22px;">
             сүю 💋
        </button>
    `;

    const kissBtn = document.getElementById('kissBtn');
    
    // ОСЫ ЖЕРДЕГІ ФУНКЦИЯНЫ ТЕКСЕР:
    kissBtn.addEventListener('click', () => {
        createKissEffect(); // Анимацияны қосу

        // Стикер мен Мәтінді ауыстыру логикасы
        sticker.src = kissSteps[kissIndex].img;
        title.innerText = kissSteps[kissIndex].text;

        // Келесі қадамға өту
        kissIndex++;
        if (kissIndex >= kissSteps.length) {
            kissIndex = 0; // Тізім бітсе, басына қайта келеді
        }
    });
});

// 4. СҮЮ АНИМАЦИЯСЫ (Сенің нұсқаң)
function createKissEffect() {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
    setTimeout(() => overlay.style.opacity = '1', 10);

    const bigKiss = document.createElement('div');
    bigKiss.className = 'intimate-kiss';
    bigKiss.innerText = '💋';
    document.body.appendChild(bigKiss);
    bigKiss.style.animation = 'heartPulse 1.5s ease-out forwards';

    for (let i = 0; i < 15; i++) {
        const miniHeart = document.createElement('div');
        miniHeart.style.position = 'fixed';
        miniHeart.style.left = '50%';
        miniHeart.style.top = '50%';
        miniHeart.innerText = '❤️';
        miniHeart.style.fontSize = '30px';
        miniHeart.style.zIndex = '999';
        document.body.appendChild(miniHeart);

        const destX = (Math.random() - 0.5) * 600;
        const destY = (Math.random() - 0.5) * 600;

        miniHeart.animate([
            { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
            { transform: `translate(${destX}px, ${destY}px) scale(0)`, opacity: 0 }
        ], { duration: 2000, easing: 'ease-out' });

        setTimeout(() => miniHeart.remove(), 2000);
    }

    setTimeout(() => {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.remove();
            bigKiss.remove();
        }, 500);
    }, 1500);
}
function sendNotification() {
    const token = "8632015616:AAFSbYJClMyktInbsI5rDZekv1ezC-sQ5ik"; // Осы жерге BotFather берген токенді қой
    const chat_id = "8130655129"; // Осы жерге өз ID-іңді қой
    const message = "Сүйіктім 'Беттен сүю' батырмасын басты! 😍💋";

    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${encodeURIComponent(message)}`;

    fetch(url)
        .then(response => console.log("Хабарлама жіберілді!"))
        .catch(error => console.error("Қате кетті:", error));
}