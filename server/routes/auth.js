import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/login', async (req, res) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ error: 'Password required' });

  const match = await bcrypt.compare(password, process.env.ADMIN_HASH);
  if (!match) return res.status(401).json({ error: 'Invalid password' });

  const token = jwt.sign({ admin: true }, process.env.JWT_SECRET, { expiresIn: '24h' });
  res.json({ token });
});

export default router;
