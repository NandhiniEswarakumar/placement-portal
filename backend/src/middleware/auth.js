import jwt from 'jsonwebtoken';

export function authMiddleware(req, res, next) {
  const header = req.headers.authorization || '';
  const [, token] = header.split(' ');
  if (!token) {
    return res.status(401).json({ error: 'Missing auth token' });
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
    req.user = { id: payload.id, role: payload.role };
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
