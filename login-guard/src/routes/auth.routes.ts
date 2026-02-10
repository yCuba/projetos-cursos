import Router from 'express'
import { AuthController } from '../controllers/AuthController'

const authRouter = Router()
const authController = new AuthController()


authRouter.post('/register', (req, res) => {
    return authController.register(req, res)
});

export { authRouter };