import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) return res.send('Forbidden');
        /* const decodedData = jwt.verify(token, process.env.SECRET);
        req.userId = decodedData?.id;
        next(); */ // same as the next 4 lines (lines 11 - 14)
        await jwt.verify(token, process.env.SECRET, (err, payload) => {
            // if (err) throw new Error('token not verified');
            if (err) throw err;
            req.user = payload;
            next();
        });
    } catch (err) {
        console.log(err);
        res.status(403).json({ message: err.message });
    }
}
