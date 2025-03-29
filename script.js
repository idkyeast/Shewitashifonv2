// Gallery Configuration
const galleryImages = [
    { 
        url: "images/IMG_20240209_183944_080.jpg", 
        alt: "Yellow Ethiopian Traditional Chiffon Dress" 
    },
    { 
        url: "images/Lem_chiffon.jpeg", 
        alt: "Orange Ethiopian Traditional Chiffon Dress" 
    },
    // Add your remaining images here...
    
    // Temporary placeholders (remove when adding your images)
    { 
        url: "https://source.unsplash.com/random/800x1200/?dress,african", 
        alt: "Placeholder 1" 
    },
    { 
        url: "https://source.unsplash.com/random/800x1200/?habesha,clothing", 
        alt: "Placeholder 2" 
    }
];

// Gallery Functions
function createGalleryItems() {
    const galleryContainer = document.getElementById('galleryContainer');
    galleryContainer.innerHTML = '';
    
    galleryImages.forEach(image => createImageElement(image, galleryContainer));
    galleryImages.forEach(image => createImageElement(image, galleryContainer));
}

function createImageElement(image, container) {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    const img = document.createElement('img');
    img.src = image.url;
    img.alt = image.alt;
    galleryItem.appendChild(img);
    container.appendChild(galleryItem);
}

function adjustSpeed(multiplier) {
    const gallery = document.querySelector('.gallery-container');
    gallery.style.animationDuration = `${20 / multiplier}s`;
}

// Navbar Toggle
const toggleBtn = document.getElementById('toggleBtn');
const navLinks = document.querySelector('.nav-links');

toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('active');
    toggleBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
});

document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && 
        !e.target.closest('.nav-container') && 
        navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        toggleBtn.textContent = '☰';
    }
});

// Review System
let currentRating = 0;

document.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', () => {
        currentRating = parseInt(star.dataset.value);
        document.querySelectorAll('.star').forEach((s, index) => {
            s.textContent = index < currentRating ? '★' : '☆';
            s.classList.toggle('active', index < currentRating);
        });
    });
});

function postComment() {
    const commentText = document.getElementById('commentText').value;
    if (!commentText || currentRating === 0) {
        alert('Please add both a rating and comment');
        return;
    }

    const comment = {
        id: Date.now(),
        text: commentText,
        rating: currentRating,
        likes: 0,
        date: new Date().toLocaleString()
    };

    addCommentToDOM(comment);
    saveComment(comment);
    document.getElementById('commentText').value = '';
    currentRating = 0;
    resetStars();
}

function addCommentToDOM(comment) {
    const commentsList = document.getElementById('commentsList');
    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment-card';
    commentDiv.innerHTML = `
        <div class="comment-header">
            <div>
                ${'★'.repeat(comment.rating)}${'☆'.repeat(5 - comment.rating)}
                <span>${comment.date}</span>
            </div>
        </div>
        <p>${comment.text}</p>
        <div class="comment-actions">
            <button onclick="likeComment(${comment.id})">
                ❤️ ${comment.likes}
            </button>
        </div>
    `;
    commentsList.prepend(commentDiv);
}

function likeComment(commentId) {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    const commentIndex = comments.findIndex(c => c.id === commentId);
    if (commentIndex !== -1) {
        comments[commentIndex].likes++;
        localStorage.setItem('comments', JSON.stringify(comments));
        document.querySelector(`button[onclick="likeComment(${commentId})"]`)
            .innerHTML = `❤️ ${comments[commentIndex].likes}`;
    }
}

function saveComment(comment) {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.push(comment);
    localStorage.setItem('comments', JSON.stringify(comments));
}

function loadComments() {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.forEach(comment => addCommentToDOM(comment));
}

function resetStars() {
    document.querySelectorAll('.star').forEach(star => {
        star.textContent = '☆';
        star.classList.remove('active');
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createGalleryItems();
    loadComments();
});
