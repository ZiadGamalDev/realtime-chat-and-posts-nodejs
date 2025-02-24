import dotenv from 'dotenv';
import app, { connectSocket } from './src/app.js';
import connectDB from './src/db/connection.js';
import { Server } from 'socket.io';

dotenv.config();

connectDB();

const PORT = process.env.PORT || 3000;

let server = app.listen(PORT, () => console.log(`Server is running on port ${PORT}`) );

const io = new Server(server, { cors: '*' });

io.on('connection', (socket) => connectSocket(socket, io));
