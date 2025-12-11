import React from 'react';
import Card from '../../components/ui/card';
import { useFetch } from '../../hooks/usefetch';
import { useUser } from '../../context/usercontext';

const OverviewRecommendation = () => {
  const { userId } = useUser();
  const { data, loading } = useFetch(
    userId ? `/dashboard/recommendations/${userId}` : null
  );

  const recommendationText = (data && typeof data.rekomendasi === 'string' && data.rekomendasi.length > 0)
    ? data.rekomendasi
    : 'Sesuaikan dengan preferensi belajarmu untuk mendapatkan rekomendasi yang lebih personal.';

  return (
    <Card className="p-5 shadow-soft rounded-xl border border-gray-200 min-h-[128px]">
      <h3 className="text-sm font-semibold text-gray-800 mb-2">Rekomendasi Belajar</h3>
      {loading ? (
        <div className="h-16 bg-gray-100 rounded animate-pulse"></div>
      ) : (
        <p className="text-xs text-gray-600 leading-relaxed">
          {recommendationText}
        </p>
      )}
    </Card>
  );
};

export default OverviewRecommendation;
