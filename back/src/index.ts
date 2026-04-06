import express, { Request, Response } from 'express';
import cors from 'cors';
import { getRandom } from './controllers/randomController';

const app = express();
export default app;

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/random', getRandom);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
