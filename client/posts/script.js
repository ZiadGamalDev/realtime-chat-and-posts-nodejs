const socket = io('http://localhost:3000');

const postsContainer = document.getElementById('postsContainer');
const titleInput = document.getElementById('titleInput');
const bodyInput = document.getElementById('bodyInput');
const submitBtn = document.getElementById('submitBtn');
const searchInput = document.getElementById('searchInput');

submitBtn.addEventListener('click', submitPost);
searchInput.addEventListener('input', searchPosts);

socket.on('postCreated', fetchPosts);
socket.on('postDeleted', fetchPosts);
socket.on('postsFiltered', posts => loadPosts(posts));

async function fetchPosts() {
    const response = await fetch('http://localhost:3000/posts');
    const posts = await response.json();

    if (!response.ok) {
        console.log('Failed to fetch posts:', posts.message);
        return;
    }

    loadPosts(posts);
}

function loadPosts(posts) {
    postsContainer.innerHTML = '';

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post-card');
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.body}</p>
            <button class="delete-btn" onclick="deletePost('${post._id}')">Delete</button>
        `;

        postsContainer.appendChild(postElement);
    });
}

function submitPost() {
    const title = titleInput.value;
    const body = bodyInput.value;

    if (!title || !body) {
        alert('Please fill in all fields');
        return;
    }

    const post = { title, body };

    socket.emit('createPost', post);

    titleInput.value = '';
    bodyInput.value = '';
}

function deletePost(postId) {
    socket.emit('deletePost', postId);
}

function searchPosts() {
    const search = searchInput.value.toLowerCase();
    socket.emit('filterPosts', search);
}

// on page loading
fetchPosts();
