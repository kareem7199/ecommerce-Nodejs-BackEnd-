import boom from '@hapi/boom'
import userService from '../services/userService.js'
import { validateUser } from '../validators/userValidator.js'
export const CreateUser = async (req, res, next) => {
    try {

        const data = validateUser(req.body);
        if(data.error) 
            next(boom.badRequest(data.error.details.map(err => err.message)))

        const checkEmail = await userService.getUserByEmail(req.body.email);
        
        if(checkEmail) {
            return next(boom.conflict('Email already exist'));
        }

        const user = await userService.createUser(req.body);

        res.status(201).send(user);

    } catch (error) {
        next(boom.internal());
    }
}