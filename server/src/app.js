import express from 'express';
import cors from 'cors';
import postRoutes from './modules/post/post.routes.js';
import postSocket from './modules/post/post.socket.js';
import chatSocket from './modules/chat/chat.socket.js';
import { CronJob } from 'cron';

const app = express();

app.use(cors());
app.use(express.json());

// Rsource Routes
app.use('/posts', postRoutes);

// Socket.io
export const connectSocket = (socket, io) => {
    console.log('User connected with id:', socket.id);

    // Sockets
    chatSocket(socket, io);
    postSocket(socket, io);

    socket.on('disconnect', () => console.log('User disconnected with id:', socket.id));
};

// Cron jobs
const job1 = new CronJob('*/3 * * * * *', () => {
    console.log('This runs every 3 seconds!');
});

const job2 = new CronJob('*/5 * * * * *', () => {
    console.log('This runs every 5 seconds!');
});

// job1.start();
// job2.start();

export default app;
