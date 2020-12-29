import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
  res.json([1, 2]);
});

router.get('/:id', (_req: Request, res: Response) => {
  res.json({});
});

router.post('/', (_req: Request, res: Response) => {
  res.json({});
});

router.put('/:id', (_req: Request, res: Response) => {
  res.json({});
});

router.delete('/:id', (_req: Request, res: Response) => {
  res.json(null);
});

export default router;
