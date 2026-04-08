import express from 'express';
import cors from 'cors';
import { getRandom } from './controllers/randomController';
import { getRandomHour } from './controllers/hourController';

const app = express();
export default app;

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/random', getRandom);
app.get('/api/random-hour', getRandomHour);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
