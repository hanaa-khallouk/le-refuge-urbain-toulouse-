import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { BarChart3, Settings, Calendar } from 'lucide-react';

export default function Admin() {
  const [tab, setTab] = useState('finances');
  const [revenues, setRevenues] = useState([]);

  useEffect(() => {
    async function getStats() {
      const { data } = await supabase.from('revenues').select('*').order('month_year', {ascending: false});
      if(data) setRevenues(data);
    }
    getStats();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#FDFDFD] font-sans">
      <aside className="w-64 border-r border-gray-100 p-10 space-y-12">
        <div className="font-bold text-[10px] tracking-[0.4em] uppercase text-bronze-accent">Admin.</div>
        <nav className="space-y-8">
          <button onClick={() => setTab('finances')} className={`flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest ${tab === 'finances' ? 'text-charcoal' : 'text-gray-300'}`}>
            <BarChart3 size={16} /> Finances
          </button>
          <button onClick={() => setTab('sync')} className={`flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest ${tab === 'sync' ? 'text-charcoal' : 'text-gray-300'}`}>
            <Calendar size={16} /> Flux iCal
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-20">
        {tab === 'finances' && (
          <div className="max-w-4xl">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-300 mb-12">Reporting Mensuel</h2>
            <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-[9px] font-bold uppercase tracking-widest text-gray-400 border-b">
                  <tr><th className="p-6">Période</th><th className="p-6">Source</th><th className="p-6 text-right">Montant</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {revenues.map(r => (
                    <tr key={r.id} className="text-sm italic font-serif">
                      <td className="p-6 text-charcoal uppercase text-xs font-sans not-italic font-bold">{r.month_year}</td>
                      <td className="p-6 text-gray-400 uppercase text-[9px] font-sans not-italic tracking-widest">{r.platform}</td>
                      <td className="p-6 text-right font-bold text-charcoal">{r.amount} €</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
