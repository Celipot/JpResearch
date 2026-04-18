import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { getRandom } from './controllers/randomController';
import { getRandomHour } from './controllers/hourController';
import { getRandomDate } from './controllers/dateController';
import { getRandomAdjective } from './controllers/adjectiveController';
import { checkAnswer } from './controllers/checkAnswerController';

const app = express();
export default app;

const PORT = process.env.PORT || 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());
app.use(express.json());

// API routes
app.get('/api/random', getRandom);
app.get('/api/random-hour', getRandomHour);
app.get('/api/random-date', getRandomDate);
app.get('/api/random-adjective', getRandomAdjective);
app.post('/api/check-answer', checkAnswer);

// Serve static frontend files
const frontendDistPath = path.join(__dirname, '../../front/dist');
app.use(express.static(frontendDistPath));

// SPA fallback: serve index.html for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendDistPath, 'index.html'));
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
