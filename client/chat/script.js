const socket = io('http://localhost:3000');

const sendBtn = document.getElementById('sendBtn');
const messageInput = document.getElementById('messageInput');
const messagesDiv = document.getElementById('messages');
const typingDiv = document.getElementById('typing');

sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('input', startTyping);
messageInput.addEventListener('keyup', stopTyping);

function sendMessage() {
    const message = messageInput.value;
    if (!message) return;
    socket.emit('sendMessage', message);
    addMessageToUI(message, 'sent');
    messageInput.value = '';
}

socket.on('messageSent', (message) => {
    console.log('Message:', message);
    addMessageToUI(message, 'received');
});

function addMessageToUI(message, type) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', type);
    msgDiv.textContent = message;
    messagesDiv.appendChild(msgDiv);
    messagesDiv.scrollTo(0, document.body.scrollHeight);
}

function startTyping() {
    socket.emit('startTyping');
}

function stopTyping() {
    socket.emit('stopTyping');
}

socket.on('typingStarted', () => {
    typingDiv.textContent = 'typing...';
});

socket.on('typingStopped', () => {
    setTimeout(() => {
        typingDiv.textContent = '';
    }, 1000);
});
