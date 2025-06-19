require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app); // Needed for Socket.IO
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Frontend origin
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const authMiddleware = require('./middleware/auth');
const userRoute = require('./routes/user');
const uploadProfilePicture = require('./routes/uploadProfilePicture');
const FetchAndStoreHealthMetrics = require('./routes/healthMetrices');
const healthTrendsRouter = require('./routes/healthTrends');
const chatRoutes = require("./routes/chat");
const PORT = 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

// Routes
app.use('/api/register', registerRoute);
app.use('/api/login', loginRoute);
app.use('/api/user', userRoute);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/upload-profile-picture', uploadProfilePicture);
app.use('/api/health-metrics', FetchAndStoreHealthMetrics);
app.use('/api/health-trends', healthTrendsRouter);
app.use("/api/chat", chatRoutes);

// ✅ Protected test route with JWT
app.get('/api/protected', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'This is a protected route', user: req.user });
});

// ✅ Socket.IO setup
io.on('connection', (socket) => {
  console.log('🔌 New client connected:', socket.id);

  socket.on('send_message', (data) => {
    // Broadcast to all other clients
    socket.broadcast.emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('❌ Client disconnected:', socket.id);
  });
});

// ✅ Start server with WebSocket support
server.listen(PORT, () => {
  console.log(`✅ Server running with Socket.IO on http://localhost:${PORT}`);
});
