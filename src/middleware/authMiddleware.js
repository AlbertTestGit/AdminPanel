import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    try {
        if (!req.headers.authorization) res.status(401).json({ message: 'Unauthorized' });
        
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
    }
}