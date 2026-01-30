import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Admin() {
  const [tab, setTab] = useState('finances');
  const [prop, setProp] = useState({});
  const [revenues, setRevenues] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { data: p } = await supabase.from('properties').select('*').single();
    if(p) setProp(p);
    const { data: r } = await supabase.from('revenues').select('*').order('month_year', {ascending: false});
    if(r) setRevenues(r);
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <nav className="w-64 bg-gray-900 text-white p-6 space-y-4">
        <button onClick={() => setTab('finances')} className="block w-full text-left p-2 hover:bg-gray-800 rounded">📊 Administratif</button>
        <button onClick={() => setTab('annonce')} className="block w-full text-left p-2 hover:bg-gray-800 rounded">🏠 Modifier l'annonce</button>
      </nav>
      <main className="flex-1 p-10">
        {tab === 'finances' ? (
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Revenus par plateforme</h2>
            <table className="w-full text-left border-collapse">
              <thead><tr className="border-b"><th>Mois</th><th>Source</th><th>Montant Net</th></tr></thead>
              <tbody>
                {revenues.map(rev => (
                  <tr key={rev.id} className="border-b"><td>{rev.month_year}</td><td>{rev.platform}</td><td className="font-bold">{rev.amount} €</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white p-6 rounded shadow max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Titre de l'annonce</h2>
            <input type="text" className="w-full border p-2 mb-4" value={prop.title || ''} onChange={(e) => setProp({...prop, title: e.target.value})} />
            <textarea className="w-full border p-2 mb-4" rows="4" value={prop.description || ''} onChange={(e) => setProp({...prop, description: e.target.value})}></textarea>
            <button onClick={async () => { await supabase.from('properties').update(prop).eq('id', prop.id); alert('Mis à jour !'); }} className="bg-rose-500 text-white px-4 py-2 rounded">Enregistrer</button>
          </div>
        )}
      </main>
    </div>
  );
}
