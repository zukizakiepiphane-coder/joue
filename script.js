// Navigation entre pages
const giftBox = document.getElementById('giftBox');
const giftPage = document.getElementById('giftPage');
const photoPage = document.getElementById('photoPage');
const closeBtn = document.getElementById('closeBtn');
const audio = document.getElementById('birthdayAudio');

// Variables pour le défilement automatique des photos
let currentPhotoIndex = 0;
const photos = document.querySelectorAll('.circle-img');
const totalPhotos = photos.length;

// Ouvrir la page des photos AU CLIC
giftBox.addEventListener('click', () => {
    giftPage.classList.remove('active');
    photoPage.classList.add('active');
    
    // Jouer le son
    audio.currentTime = 0;
    audio.volume = 1;
    audio.play().catch(() => console.log('Audio autoplay prevented'));
    
    // Démarrer le défilement automatique des photos
    startPhotoSlideshow();
});

// Fermer la page des photos
closeBtn.addEventListener('click', () => {
    photoPage.classList.remove('active');
    giftPage.classList.add('active');
    audio.pause();
    audio.currentTime = 0;
    stopPhotoSlideshow();
});

// === SLIDESHOW PHOTOS LENT === 
let slideshowInterval;

function startPhotoSlideshow() {
    // Changer de photo tous les 5 secondes (lentement)
    slideshowInterval = setInterval(() => {
        // Enlever la classe active de la photo actuelle
        photos.forEach(photo => photo.classList.remove('active'));
        
        // Aller à la photo suivante
        currentPhotoIndex = (currentPhotoIndex + 1) % totalPhotos;
        
        // Ajouter la classe active à la nouvelle photo
        photos[currentPhotoIndex].classList.add('active');
    }, 5000);
}

function stopPhotoSlideshow() {
    clearInterval(slideshowInterval);
    currentPhotoIndex = 0;
    photos.forEach(photo => photo.classList.remove('active'));
    photos[0].classList.add('active');
}

// Gestion du toucher (swipe) pour changer de photo
let touchStartX = 0;
let touchEndX = 0;

const photoCircle = document.getElementById('photoCircle');

photoCircle.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

photoCircle.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const threshold = 50;
    
    if (touchStartX - touchEndX > threshold) {
        // Swipe vers la gauche - photo suivante
        currentPhotoIndex = (currentPhotoIndex + 1) % totalPhotos;
    } else if (touchEndX - touchStartX > threshold) {
        // Swipe vers la droite - photo précédente
        currentPhotoIndex = (currentPhotoIndex - 1 + totalPhotos) % totalPhotos;
    }
    
    // Mettre à jour l'affichage
    photos.forEach(photo => photo.classList.remove('active'));
    photos[currentPhotoIndex].classList.add('active');
}

// Navigation au clavier
document.addEventListener('keydown', (e) => {
    if (photoPage.classList.contains('active')) {
        if (e.key === 'ArrowLeft') {
            currentPhotoIndex = (currentPhotoIndex - 1 + totalPhotos) % totalPhotos;
            photos.forEach(photo => photo.classList.remove('active'));
            photos[currentPhotoIndex].classList.add('active');
        } else if (e.key === 'ArrowRight') {
            currentPhotoIndex = (currentPhotoIndex + 1) % totalPhotos;
            photos.forEach(photo => photo.classList.remove('active'));
            photos[currentPhotoIndex].classList.add('active');
        } else if (e.key === 'Escape') {
            closeBtn.click();
        }
    }
});

// Clic sur le poème pour rejouer l'animation des lignes
const poemContent = document.getElementById('poemContent');
const poemLines = document.querySelectorAll('.poem-line');

poemContent.addEventListener('click', () => {
    poemLines.forEach(line => {
        line.style.animation = 'none';
        setTimeout(() => {
            line.style.animation = '';
        }, 10);
    });
});

console.log('✨ Page d\'anniversaire avec cercle multicolor prête! 🎉');

