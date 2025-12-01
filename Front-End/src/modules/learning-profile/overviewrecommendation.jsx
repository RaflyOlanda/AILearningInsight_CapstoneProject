import React from 'react';
import Card from '../../components/ui/card';
import { useFetch } from '../../hooks/usefetch';
import { useUser } from '../../context/usercontext';

const OverviewRecommendation = () => {
  const { userId } = useUser();
  const { data: recommendations, loading } = useFetch(
    userId ? `/dashboard/recommendations/${userId}` : null
  );

  const topRecommendation = (recommendations && Array.isArray(recommendations) && recommendations.length > 0)
    ? recommendations[0]
    : null;

  const recommendationText = topRecommendation
    ? `Kami merekomendasikan kamu untuk belajar "${topRecommendation.title}" pada level ${topRecommendation.difficulty || 'Intermediate'} dengan estimasi waktu ${topRecommendation.estimated_time}. Kursus ini akan memberikan ${topRecommendation.xp_reward} XP.`
    : 'Sesuaikan dengan preferensi belajarmu untuk mendapatkan rekomendasi yang lebih personal.';

  return (
    <Card className="p-5 shadow-soft rounded-xl border border-gray-200 min-h-[128px]">
      <h3 className="font-semibold text-sm text-gray-700 mb-2">Rekomendasi Belajar</h3>
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
