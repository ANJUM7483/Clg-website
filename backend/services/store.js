import { createClient } from '@supabase/supabase-js';
import { events, registrations } from '../data.js';

const hasSupabase = Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY);
const supabase = hasSupabase ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY) : null;

export async function listEvents() {
  if (supabase) {
    const { data, error } = await supabase.from('events').select('*').order('event_date');
    if (error) throw error;
    return addCounts(data);
  }
  return addCounts(events);
}
export async function getEvent(id) { const all = await listEvents(); return all.find(event => event.id === id); }
async function addCounts(items) {
  if (supabase) {
    return Promise.all(items.map(async event => { const { count, error } = await supabase.from('registrations').select('*', { count: 'exact', head: true }).eq('event_id', event.id); if (error) throw error; return { ...event, registered: count || 0, remaining: Math.max(0, event.max_slots - (count || 0)) }; }));
  }
  return items.map(event => { const registered = registrations.filter(item => item.event_id === event.id).length; return { ...event, registered, remaining: Math.max(0, event.max_slots - registered) }; });
}
export async function createRegistration(input) {
  const event = await getEvent(input.eventId);
  if (!event) return { error: 'That event could not be found.', status: 404 };
  if (event.remaining < 1) return { error: 'This event is already full.', status: 409 };
  const duplicateQuery = supabase ? supabase.from('registrations').select('id').eq('event_id', input.eventId).eq('email', input.email).maybeSingle() : null;
  const duplicate = duplicateQuery ? (await duplicateQuery).data : registrations.find(item => item.event_id === input.eventId && item.email === input.email);
  if (duplicate) return { error: 'This email is already registered for this event.', status: 409 };
  const registration = { registration_id: `FEST-2026-${String(Date.now()).slice(-6)}`, event_id: input.eventId, name: input.name, email: input.email, phone: input.phone, college: input.college, created_at: new Date().toISOString() };
  if (supabase) { const { data, error } = await supabase.from('registrations').insert(registration).select().single(); if (error) throw error; return { data: { ...data, event } }; }
  registrations.push(registration);
  return { data: { ...registration, event } };
}
export async function findRegistration(email) {
  if (supabase) { const { data, error } = await supabase.from('registrations').select('*, events(*)').eq('email', email).order('created_at', { ascending: false }).limit(1).maybeSingle(); if (error) throw error; return data ? { ...data, event: data.events } : null; }
  const registration = registrations.slice().reverse().find(item => item.email === email); return registration ? { ...registration, event: events.find(item => item.id === registration.event_id) } : null;
}
export async function totalParticipants() { const all = await listEvents(); return all.reduce((total, event) => total + event.registered, 0); }
