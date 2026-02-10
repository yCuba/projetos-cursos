import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import routes from './routes'


dotenv.config();

const app = express();

app.use(express.json());

app.use(routes);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
    console.log(`🚀 Server perito rodando em http://localhost:${PORT}`);
});