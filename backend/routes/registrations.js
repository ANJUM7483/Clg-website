import { Router } from 'express';
import { createRegistration } from '../services/store.js';
export const registrationRoutes = Router();
registrationRoutes.post('/', async (req, res, next) => { try { const { name, email, phone, college, eventId } = req.body; if (!name || !email || !phone || !college || !eventId || !/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ error: 'Please provide a valid name, email, phone, college and event.' }); const result = await createRegistration({ name: name.trim(), email: email.trim().toLowerCase(), phone: phone.trim(), college: college.trim(), eventId }); result.error ? res.status(result.status).json({ error: result.error }) : res.status(201).json(result.data); } catch (error) { next(error); } });
