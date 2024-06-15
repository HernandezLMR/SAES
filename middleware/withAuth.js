import jwt from 'jsonwebtoken';
import session from '../lib/session';

export default function withAuth(requiredRole) {
  return async (req, res, next) => {
    await session(req, res);

    const token = req.session.get('token');

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded;

      if (requiredRole && req.user.user !== requiredRole) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
}
