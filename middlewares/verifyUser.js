import  jwt from 'jsonwebtoken'
import userService from '../services/userService.js'
import boom from '@hapi/boom';

const verifyUser = async (req, res, next) => {
    const token = req.header('Authorization')?.split(" ")[1];

    console.log(token);

    if (!token)
        next(boom.unauthorized('Access denied. No token provided.'));

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userService.getUser(decoded.userId)

        if (!user)
            next(boom.unauthorized("Access denied. Invalid token."))

        req.user = user; // Attach the user object to the request for later use
        next(); // Pass control to the next middleware or route handler

    } catch (error) {
        next(boom.unauthorized('Access denied. Invalid token.'))
    }
};

export default verifyUser;
