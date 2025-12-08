import React, { useEffect, useState } from 'react';
import Card from '../../components/ui/card';

export default function BadgeWidget() {
  const [badge, setBadge] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('selectedBadge');
      if (raw) setBadge(JSON.parse(raw));
    } catch {}
  }, []);

  if (!badge) return null; // no badge selected yet

  return (
    <Card className="p-4 shadow-soft rounded-xl border border-gray-200 flex items-center gap-3 min-h-[72px]">
      <img src={badge.image} alt={badge.name} className="w-10 h-10 object-contain" />
      <div className="text-sm">
        <div className="font-semibold text-gray-800">{badge.name}</div>
        {badge.tier ? (
          <div className="text-xs text-gray-500">Tier {badge.tier}</div>
        ) : null}
      </div>
    </Card>
  );
}
