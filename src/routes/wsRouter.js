import Router from 'express';
import webSocketService from '../stuff/websocket';

const router = new Router();

router.post('/sendPush', async (req, res) => {
  const { id, data } = req.body;
  await webSocketService.sendMessage(id,data);
  res.sendStatus(200)
});

export default router;
