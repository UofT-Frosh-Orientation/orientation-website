const http = require('http');
const { Server } = require('socket.io');
const mongoLoader = require('./loaders/mongoLoader');
const passportLoader = require('./loaders/passportLoader');
const errorResponseMiddleware = require('./middlewares/errorResponseMiddleware');
const routerLoader = require('./loaders/routerLoader');
const app = require('./app');

const swaggerLoader = require('./loaders/swaggerLoader');

mongoLoader(app).then(() => {
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: { origin: '*', methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] },
  });
  passportLoader(app);
  routerLoader(app);
  swaggerLoader(app);
  app.use(errorResponseMiddleware);

  const ws = io.of('/ws');
  ws.on('connection', (socket) => {
    console.log('User connected!');
    socket.on('disconnect', () => {
      console.log('User disconnected!');
    });
  });

  server.listen(process.env.PORT || 5001, () => {
    console.log(`Server is running on port: http://localhost:5001`);
  });
});
