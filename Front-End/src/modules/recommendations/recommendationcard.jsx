import React from 'react';
import Card from '../../components/ui/card';

const RecommendationCard = () => {
  return (
    <Card className="p-6 card-shadow rounded-xl">
      <h3 className="text-sm font-semibold text-gray-800 mb-2">Rekomendasi Belajar</h3>
      <p className="text-xs text-gray-600 leading-relaxed">
        Sebagai Fast Learner, kamu cenderung cepat memahami konsep baru dan mudah beradaptasi dengan materi yang berbeda. Untuk memaksimalkan potensi, AI merekomendasikan agar kamu mengambil kelas dengan tingkat
        tantangan yang lebih tinggi atau materi yang memiliki kompleksitas konsep, praktik langsung, dan problem solving agar proses belajarmu tetap menarik dan tidak monoton.
      </p>
    </Card>
  );
};

export default RecommendationCard;
