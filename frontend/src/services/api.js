const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const fallbackEvents = [
  { id: 'code-sprint', title: 'Code Sprint', category: 'Coding', description: 'A fast-paced build challenge for practical problem solvers.', event_date: '2026-09-15T10:30:00+05:30', venue: 'Innovation Lab', max_slots: 100, registered: 37, remaining: 63 },
  { id: 'pixel-punch', title: 'Pixel Punch', category: 'Design', description: 'Design a bold interface around a surprise prompt.', event_date: '2026-09-15T14:00:00+05:30', venue: 'Design Studio', max_slots: 80, registered: 22, remaining: 58 },
  { id: 'bot-arena', title: 'Bot Arena', category: 'Technical', description: 'Race, repair and rethink your autonomous machine.', event_date: '2026-09-15T16:30:00+05:30', venue: 'Central Ground', max_slots: 60, registered: 41, remaining: 19 },
  { id: 'neon-quiz', title: 'Neon Quiz', category: 'Quiz', description: 'Culture, science and tech in one electric quiz night.', event_date: '2026-09-16T10:00:00+05:30', venue: 'Main Auditorium', max_slots: 120, registered: 64, remaining: 56 },
  { id: 'frame-by-frame', title: 'Frame By Frame', category: 'Photography', description: 'Capture the spirit of the fest through a single story.', event_date: '2026-09-16T12:30:00+05:30', venue: 'Media Lab', max_slots: 50, registered: 18, remaining: 32 },
  { id: 'afterglow', title: 'Afterglow', category: 'Music', description: 'A live campus stage for the final night.', event_date: '2026-09-16T19:00:00+05:30', venue: 'Amphitheatre', max_slots: 300, registered: 142, remaining: 158 }
];
async function request(path, options) { const response = await fetch(`${API_URL}${path}`, { headers: { 'Content-Type': 'application/json' }, ...options }); const body = await response.json(); if (!response.ok) throw new Error(body.error || 'The API could not complete that request.'); return body; }
export const getEvents = () => request('/events');
export const getParticipantCount = () => request('/participants/count');
export const registerForEvent = payload => request('/registrations', { method: 'POST', body: JSON.stringify(payload) });
export const findVoucher = email => request('/voucher', { method: 'POST', body: JSON.stringify({ email }) });
