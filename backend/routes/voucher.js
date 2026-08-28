import { Router } from 'express';
import { findRegistration } from '../services/store.js';
export const voucherRoutes = Router();
voucherRoutes.post('/', async (req, res, next) => { try { const email = String(req.body.email || '').trim().toLowerCase(); if (!/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ error: 'Enter a valid registration email.' }); const registration = await findRegistration(email); registration ? res.json(registration) : res.status(404).json({ error: 'No registration was found for this email.' }); } catch (error) { next(error); } });
