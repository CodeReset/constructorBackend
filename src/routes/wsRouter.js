import Router from 'express';
import WebSocketService from '../stuff/websocket';

const router = new Router();

router.post('/sendPush', async (req, res) => {
  const { id } = req.body;
  WebSocketService.sendMessage(id);
  res.sendStatus(200)
});

export default router;
