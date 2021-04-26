const port = process.env.WEB_SOCKET_PORT || 3028;

let socket;

class WebSocketService {
  start() {
    const express = require('express');
    const http = require('http');
    const app = express();
    const server = http.createServer(app);
    socket = require('socket.io')(server, {
      cors: {
        origin: 'http://localhost:4001',
        methods: ['GET', 'POST']
      }
    });
    server.listen(port);
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
