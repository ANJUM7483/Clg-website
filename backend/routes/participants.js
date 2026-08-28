import { Router } from 'express';
import { totalParticipants } from '../services/store.js';
export const participantRoutes = Router();
participantRoutes.get('/count', async (_req, res, next) => { try { res.json({ count: await totalParticipants() }); } catch (error) { next(error); } });
