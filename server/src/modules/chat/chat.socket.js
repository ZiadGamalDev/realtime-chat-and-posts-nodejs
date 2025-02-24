const chatSocket = (socket, io) => {
    socket.on('sendMessage', (message) => {
        socket.broadcast.emit('messageSent', message);
    });

    socket.on('startTyping', () => {
        socket.broadcast.emit('typingStarted');
    });

    socket.on('stopTyping', () => {
        socket.broadcast.emit('typingStopped');
    });
};

export default chatSocket;

/** Broadcast Types
 * io.emit() - Broadcast message to all connected clients
 * socket.emit() - Send message to the sender only
 * socket.broadcast.emit() - Broadcast message to all connected clients except the sender
 * socket.broadcast.to('room1').emit() - Send message to all clients in a specific room except the sender
 * io.to(socket.id).emit() - Send message to a specific client
 */
