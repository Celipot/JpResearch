import { Router } from 'express';
import { getRandom } from '../controllers/randomController';
import { getRandomHour } from '../controllers/hourController';
import { getRandomDate } from '../controllers/dateController';
import { getRandomAdjective } from '../controllers/adjectiveController';
import { getRandomVerb } from '../controllers/verbController';
import { checkAnswer } from '../controllers/checkAnswerController';

const apiRouter = Router();

apiRouter.get('/random', getRandom);
apiRouter.get('/random-hour', getRandomHour);
apiRouter.get('/random-date', getRandomDate);
apiRouter.get('/random-adjective', getRandomAdjective);
apiRouter.get('/random-verb', getRandomVerb);
apiRouter.post('/check-answer', checkAnswer);

export default apiRouter;
