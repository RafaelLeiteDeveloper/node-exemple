import { Router } from 'express';

const router = Router();

router.post('/shortener-serveless', (req, res) => {
  return res.send(req);
});

export default router;
