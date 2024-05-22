import boom from '@hapi/boom'
import userService from '../services/userService.js'
import { validateUser , validateLogin } from '../validators/userValidator.js'
export const CreateUser = async (req, res, next) => {
    try {

        const data = validateUser(req.body);

        if(data.error) 
            next(boom.badRequest(data.error.details.map(err => err.message)))

        const checkEmail = await userService.getUserByEmail(req.body.email);
        
        if(checkEmail) {
            return next(boom.conflict('Email already exist'));
        }

        await userService.createUser(req.body);

        res.status(201).send({
            message : "User created successfully"
        });

    } catch (error) {
        next(boom.internal());
    }
}

export const Login = async(req , res , next) => {
    try {        

        const data = validateLogin(req.body);
        if(data.error) next(boom.badRequest(data.error.details.map(err => err.message)));

        const token = await userService.logIn(data.value.email , data.value.password);
        if(!token) return next(boom.unauthorized("Invalid credentials"));

        res.status(200).send({
            message : "User logged in successfully",
            token
        });

    } catch (error) {
        next(boom.internal());
    }
}