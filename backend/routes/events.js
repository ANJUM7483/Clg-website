import { Router } from 'express';
import { getEvent, listEvents } from '../services/store.js';
export const eventRoutes = Router();
eventRoutes.get('/', async (_req, res, next) => { try { res.json(await listEvents()); } catch (error) { next(error); } });
eventRoutes.get('/:id', async (req, res, next) => { try { const event = await getEvent(req.params.id); event ? res.json(event) : res.status(404).json({ error: 'Event not found.' }); } catch (error) { next(error); } });
eventRoutes.get('/:id/count', async (req, res, next) => { try { const event = await getEvent(req.params.id); event ? res.json({ registered: event.registered, max_slots: event.max_slots, remaining: event.remaining }) : res.status(404).json({ error: 'Event not found.' }); } catch (error) { next(error); } });
