import React from 'react';
import Card from '../../components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useUser } from '../../context/usercontext';
import { useFetch } from '../../hooks/usefetch';

const COLORS = ['#22C55E', '#3B82F6', '#F59E0B'];
const CATEGORIES = ['fast', 'normal', 'slow'];


const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, index, data }) => {
  const RADIAN = Math.PI / 180;
  
  
  const outerRadiusLine = outerRadius * 1.05; 
  const lineToX = cx + outerRadiusLine * Math.cos(-midAngle * RADIAN);
  const lineToY = cy + outerRadiusLine * Math.sin(-midAngle * RADIAN);
  
  
  const labelRadius = outerRadius * 1.2; 
  const finalX = cx + labelRadius * Math.cos(-midAngle * RADIAN);
  const finalY = cy + labelRadius * Math.sin(-midAngle * RADIAN);

  const textAnchor = finalX > cx ? 'start' : 'end';
  const textX = finalX + (finalX > cx ? 5 : -5);
  const textY = finalY;

  return (
    <g>
      <line x1={lineToX} y1={lineToY} x2={finalX} y2={finalY} stroke="#333" strokeWidth={1} />
      <text 
        x={textX} 
        y={textY} 
        fill="#333" 
        textAnchor={textAnchor} 
        dominantBaseline="central"
        className="text-sm font-medium"
      >
        {data[index].name}
      </text>
    </g>
  );
};

const LearnerTypeWidget = () => {
  const { userId } = useUser();
  const { data: profile, loading } = useFetch(
    userId ? `/dashboard/learning-profile/${userId}` : null
  );
  const [open, setOpen] = React.useState(false);

  const strengths = Array.isArray(profile?.strengths) && profile.strengths.length
    ? profile.strengths.slice(0, 3)
    : ['Strength 1', 'Strength 2', 'Strength 3'];

  
  
  const dist = profile?.distribution;
  const baseValues = [34, 33, 33];
  const values = dist
    ? [dist.fast ?? 0, dist.normal ?? 0, dist.slow ?? 0]
    : baseValues;
  const sum = values.reduce((a, b) => a + (Number(b) || 0), 0);
  const normalized = sum > 0 ? values.map((v) => Math.max(0, Math.round((v / sum) * 100))) : baseValues;
  const pieData = CATEGORIES.map((name, idx) => ({ name, value: normalized[idx] || 0 }));

  
  const insight = {
    fast: {
      title: 'Fast',
      desc: 'Kamu menyelesaikan materi lebih cepat dari rata-rata pada bagian ini.',
      tips: [
        'Pertahankan ritme; ambil materi lanjutan atau proyek mini.',
        'Tantang diri dengan soal tingkat menengah/lanjutan.',
      ],
    },
    normal: {
      title: 'Normal',
      desc: 'Ritme belajar stabil dan konsisten pada bagian ini.',
      tips: [
        'Pertahankan konsistensi; coba targetkan peningkatan kecil tiap minggu.',
        'Gabungkan latihan singkat (quiz) untuk memperkuat konsep.',
      ],
    },
    slow: {
      title: 'Slow',
      desc: 'Kamu butuh waktu lebih lama; ini wajar untuk topik yang kompleks.',
      tips: [
        'Pisahkan materi sulit menjadi sub-topik kecil dan ulangi.',
        'Catat konsep yang menghambat dan cari referensi alternatif.',
      ],
    },
  };

  
  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null;
    const p = payload[0];
    const key = (p?.name || '').toLowerCase(); // fast | normal | slow
    const colorFromName = (() => {
      const idx = CATEGORIES.indexOf(key);
      return idx >= 0 ? COLORS[idx] : undefined;
    })();
    const color = colorFromName || p?.color || p?.fill || '#999';
    const value = Number(p?.value) || 0;
    const info = insight[key] || { title: key, desc: '', tips: [] };
    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-lg p-3 max-w-[280px]">
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }}></span>
          <div className="text-sm font-semibold text-gray-800">{info.title} • {value}%</div>
        </div>
        <p className="text-[12px] text-gray-600 leading-snug mb-2">{info.desc}</p>
        {info.tips?.length > 0 && (
          <ul className="list-disc ml-4 space-y-1">
            {info.tips.map((t, i) => (
              <li key={i} className="text-[12px] text-gray-600 leading-snug">{t}</li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  const InnerContent = () => (
    <div className="flex flex-col gap-4 h-full">
      
      <div className="w-full flex flex-col items-center">
        <div className="w-full h-48 md:h-52">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                innerRadius={52}
                outerRadius={96}
                paddingAngle={2}
                dataKey="value"
                labelLine={false}
                label={false}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-1.5 flex items-center justify-center gap-4 text-[12px] text-gray-600">
          {CATEGORIES.map((label, idx) => (
            <div key={label} className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx] }}></span>
              <span className="capitalize">{label}</span>
            </div>
          ))}
        </div>
      </div>

      
      <div>
        <h2 className="text-[18px] font-semibold text-gray-800 mb-1.5">
          {loading
            ? 'Memuat profil belajar...'
            : `Kamu adalah tipe ${profile?.learner_type || 'Learner'}, ${profile?.display_name || ''}!`}
        </h2>
        <p className="text-[13px] leading-snug text-gray-600 mb-3">
          {loading
            ? 'Menyiapkan insight personal...'
            : (profile?.description || 'Insight personal berdasarkan aktivitas belajarmu.')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          <div>
            <h3 className="font-semibold text-gray-700 mb-1">Kelebihan</h3>
            <ol className="text-[13px] leading-snug text-gray-600 list-decimal ml-4 space-y-1">
              {(profile?.strengths || ['Cepat memahami konsep baru','Mudah beradaptasi dengan perubahan','Efisien dalam belajar dan memecahkan masalah']).map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-1">Kekurangan</h3>
            <ol className="text-[13px] leading-snug text-gray-600 list-decimal ml-4 space-y-1">
              {(profile?.weaknesses || ['Cenderung mengabaikan detail kecil','Cepat bosan jika materi terlalu lambat','Retensi jangka panjang bisa lebih lemah']).map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Card className="p-5 shadow-soft rounded-xl border border-border min-h-[400px] max-h-[420px] relative overflow-hidden">
      <InnerContent />
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-10"
        style={{ backgroundImage: 'linear-gradient(to top, var(--background), rgba(0,0,0,0))' }}
      ></div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="absolute bottom-3 right-3 text-[11px] px-2.5 py-1 rounded-md border border-border bg-secondary hover:bg-muted text-foreground shadow-sm cursor-pointer"
      >
        View All
      </button>
      {open && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)}></div>
          <div className="relative bg-card text-card-foreground rounded-xl shadow-2xl border border-border w-[90vw] max-w-3xl max-h-[80vh] overflow-auto p-5 z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold">Learning Profile</div>
              <button
                onClick={() => setOpen(false)}
                className="text-[12px] px-2 py-1 rounded-md border border-border hover:bg-muted"
              >
                Close
              </button>
            </div>
            <InnerContent />
          </div>
        </div>
      )}
    </Card>
  );
};
export default LearnerTypeWidget;