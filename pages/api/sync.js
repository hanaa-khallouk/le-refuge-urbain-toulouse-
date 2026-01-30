import ical from 'node-ical';
import { supabase } from '../../lib/supabase';

export default async function handler(req, res) {
  const { data: settings } = await supabase.from('settings').select('*').single();
  const sources = [
    { name: 'airbnb', url: settings.airbnb_ical_url },
    { name: 'booking', url: settings.booking_ical_url }
  ];
  await supabase.from('reservations').delete().neq('source', 'site');
  for (const source of sources) {
    if (!source.url) continue;
    const events = await ical.fromURL(source.url);
    for (let k in events) {
      if (events[k].type === 'VEVENT') {
        await supabase.from('reservations').insert({ 
          start_date: events[k].start, 
          end_date: events[k].end, 
          source: source.name 
        });
      }
    }
  }
  res.status(200).json({ message: 'Synchronisation terminée' });
}
