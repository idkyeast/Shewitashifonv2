
const galleryImages = [
    { 
        url: "https://th.bing.com/th/id/OIP.JQ4TeiKbYroZ-JfG8FESqwHaLG?rs=1&pid=ImgDetMain", 
        alt: "Yellow Ethiopian Traditional Chiffon Dress" 
    },
    { 
        url: "https://idkyeast.github.io/IMG_20250116_120040_902.jpg", 
        alt: "Orange Ethiopian Traditional Chiffon Dress" 
    },
       { 
        url: "https://idkyeast.github.io/IMG_20240214_114307_491.jpg", 
        alt: "Yellow Ethiopian Traditional Chiffon Dress" 
    },
    { 
        url: "https://idkyeast.github.io/IMG_20250129_210834_844.jpg", 
        alt: "Orange Ethiopian Traditional Chiffon Dress" 
    },
       { 
        url: "https://idkyeast.github.io/Lem%20chiffon%20__%20%E1%88%88%E1%88%9D%20%E1%88%BD%E1%8D%8E%E1%8A%95%20Adres;-22,%E1%88%98%E1%88%AD%E1%8A%AB%E1%89%B6,%E1%89%A6%E1%88%8C%20phone;-0955455017_0994414419%20Nb;-%E1%8B%8D%E1%8C%AD%20%E1%88%80%E1%8C%88%E1%88%AD%20%E1%8A%93%20%E1%8A%AD%E1%8D%8D%E1%88%8D%E1%88%80%E1%8C%88%E1%88%AD%20%E1%88%8B%E1%88%89%20%E1%8B%B0%E1%8A%95%E1%89%A0%E1%8A%9E%E1%89%BD%20%E1%8A%A5%E1%8A%95%E1%88%8D%E1%8A%AB%E1%88%88%E1%8A%95!!!.jpeg", 
        alt: "Yellow Ethiopian Traditional Chiffon Dress" 
    },
    { 
        url: "https://idkyeast.github.io/IMG_20240209_183944_080.jpg", 
        alt: "Orange Ethiopian Traditional Chiffon Dress" 
    },
   
    
    { 

];


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


document.addEventListener('DOMContentLoaded', () => {
    createGalleryItems();
    loadComments();
});
