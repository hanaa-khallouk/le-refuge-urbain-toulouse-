import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Home() {
  const [prop, setProp] = useState(null);
  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('properties').select('*').single();
      setProp(data);
    }
    load();
  }, []);

  if (!prop) return <div className="p-10">Chargement...</div>;

  return (
    <div className="min-h-screen bg-gray-50 font-sans p-6">
      <h1 className="text-3xl font-bold text-rose-500 mb-4">{prop.title}</h1>
      <p className="text-lg text-gray-700 mb-6">{prop.description}</p>
      <div className="bg-white p-6 rounded-2xl shadow-lg inline-block">
        <p className="text-2xl font-bold">{prop.price_per_night} € / nuit</p>
        <button className="mt-4 bg-rose-500 text-white px-6 py-2 rounded-lg font-bold">Réserver</button>
      </div>
    </div>
  );
}
