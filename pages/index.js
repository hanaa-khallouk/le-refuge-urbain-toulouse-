import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { MapPin, Users, Wifi } from 'lucide-react';

export default function Home() {
  const [prop, setProp] = useState(null);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('properties').select('*').single();
      if (data) setProp(data);
    }
    load();
  }, []);

  if (!prop) return <div className="h-screen flex items-center justify-center bg-stone-bg text-charcoal tracking-[0.4em] uppercase text-[10px]">Le Refuge Urbain...</div>;

  return (
    <div className="bg-stone-bg min-h-screen text-charcoal">
      <nav className="max-w-7xl mx-auto px-10 py-12 flex justify-between items-center font-bold tracking-[0.3em] uppercase text-xs">
        <span>Le Refuge Toulouse</span>
      </nav>

      <main className="max-w-7xl mx-auto px-10 pt-10 pb-32 grid lg:grid-cols-12 gap-20">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-charcoal/5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-10 text-bronze-accent">
            <MapPin size={10} /> {prop.location || 'Hypercentre'}
          </div>
          <h2 className="text-7xl font-light mb-8 italic leading-tight">L'art de vivre <br /> <span className="not-italic font-bold uppercase tracking-tighter">en plein cœur.</span></h2>
          <p className="text-gray-500 text-xl leading-relaxed max-w-lg mb-12 font-light">{prop.description}</p>
          <div className="flex gap-10 py-8 border-y border-charcoal/10 text-[10px] font-bold uppercase tracking-widest text-gray-400">
             <span>2 Voyageurs</span> <span>Studio Design</span> <span>Wifi Fibre</span>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="bg-white p-12 shadow-2xl sticky top-20 border-t-4 border-bronze-accent">
            <div className="mb-10">
              <span className="text-5xl font-bold tracking-tighter">{prop.price_per_night} €</span>
              <span className="text-[10px] text-gray-400 uppercase tracking-widest ml-3">/ nuitée</span>
            </div>
            <button className="w-full bg-charcoal text-white py-6 hover:bg-bronze-accent transition-all duration-700 uppercase text-[10px] font-bold tracking-[0.3em]">
              Demander une réservation
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
