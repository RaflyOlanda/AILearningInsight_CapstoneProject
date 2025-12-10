import React, { useEffect, useState } from 'react';
import Card from '../../components/ui/card';
import { useUser } from '../../context/usercontext';
import { findBadgeById } from '../../lib/badges';
import { readBadgeForUser, PREFERENCE_EVENT } from '../../lib/preferences';

export default function BadgeWidget() {
  const [badge, setBadge] = useState(null);
  const { userId, token } = useUser();

  useEffect(() => {
    const ownerKey = userId || token || null;
    const keysToCheck = [];
    if (ownerKey) keysToCheck.push(ownerKey);
    if (token && ownerKey && token !== ownerKey) keysToCheck.push(token);

    const loadBadge = () => {
      if (!keysToCheck.length) {
        setBadge(null);
        return;
      }

      let savedId = null;
      for (const key of keysToCheck) {
        const candidate = readBadgeForUser(key);
        if (candidate) {
          savedId = candidate;
          break;
        }
      }

      const found = savedId ? findBadgeById(savedId) : null;
      setBadge(found || null);
    };

    loadBadge();

    if (!keysToCheck.length) return undefined;

    const handler = (event) => {
      const detail = event?.detail || {};
      const targetId = detail.userId ?? null;
      if (targetId && !keysToCheck.includes(targetId)) return;
      loadBadge();
    };

    window.addEventListener(PREFERENCE_EVENT, handler);
    return () => window.removeEventListener(PREFERENCE_EVENT, handler);
  }, [userId, token]);

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
