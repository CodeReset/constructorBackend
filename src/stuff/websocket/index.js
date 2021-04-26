const port = process.env.WEB_SOCKET_PORT || 3028;

let socket;

class WebSocketService {
  start() {
    const ioServer = require('http').createServer(require('express'));
    socket = require('socket.io')(ioServer, {
      cors: {
        origin: 'http://localhost:4001',
        methods: ['GET', 'POST']
      }
    });
    ioServer.listen(port);
    socket.sockets.on('connection', (client) => {
      client.on('connect_user', (data) => {
        client.join(data);
      });
    });
  }
  async sendMessage(id) {
    console.log(id)
    socket.to(id).emit('push_message', { text: '123' });
  }
  get connection() {
    return socket;
  }
}

export default new WebSocketService();
