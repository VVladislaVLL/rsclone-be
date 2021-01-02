import express, {
  Request, Response, NextFunction,
} from 'express';
import passport from 'passport';
import { gameSchema } from './game.model';
import gamesService from './game.service';
import { validateJoi, validateUuid } from '../../validation/validate';
import schemas from './game.schemas';
import { ErrorHandler } from '../../errors/error';

const router = express.Router();

interface RequestWithUser extends Request {
  user: {
    id: string,
    login: string
  }
}
router
  .route('/')
  .all(passport.authenticate('jwt', { session: false }))
  .get(async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const games = await gamesService.getGames();
      res.json(games.map(gameSchema.statics.toResponse));
    } catch (error) {
      next(error);
    }
  })
  .post(
    validateJoi(schemas.post),
    async (req: RequestWithUser, res: Response, next: NextFunction) => {
      try {
        const newgame = await gamesService.createGame({ ...req.body, user: req.user.id });
        res.json(gameSchema.statics.toResponse(newgame));
      } catch (error) {
        next(error);
      }
    },
  );

router
  .route('/mine')
  .get(passport.authenticate('jwt', { session: false }), async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const games = await gamesService.getAllGamesByParams({ user: req.user.id });
      if (games) {
        res.json(games.map(gameSchema.statics.toResponse));
      } else {
        throw new ErrorHandler(404, 'game not found');
      }
    } catch (error) {
      next(error);
    }
  });

router
  .route('/:id')
  .all(validateUuid(), passport.authenticate('jwt', { session: false }))
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const game = await gamesService.getOneGameById(req.params.id);
      if (game) {
        res.json(gameSchema.statics.toResponse(game));
      } else {
        throw new ErrorHandler(404, 'game not found');
      }
    } catch (error) {
      next(error);
    }
  })
  .put(validateJoi(schemas.put), async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedGame = { ...req.body, id: req.params.id };
      const updated = await gamesService.updateGame(updatedGame);
      if (updated) {
        res.json(gameSchema.statics.toResponse(updatedGame));
      } else {
        throw new ErrorHandler(404, 'game not found');
      }
    } catch (error) {
      next(error);
    }
  })
  .delete(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const gameDeleted = await gamesService.deleteGame(req.params.id);
      if (gameDeleted === 1) {
        res.status(204).send('The game has been deleted');
      } else {
        throw new ErrorHandler(404, 'game not found');
      }
    } catch (error) {
      next(error);
    }
  });

export default router;
