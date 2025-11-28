import React from 'react';
import Card from '../../components/ui/card';

const CenterFill = () => {
  return (
    <Card className="p-5 shadow-soft rounded-xl border border-gray-200">
      <h3 className="font-semibold text-sm text-gray-700 mb-2">Insight Belajar</h3>
      <p className="text-xs text-gray-600 leading-relaxed">
        Berdasarkan aktivitas terakhir, kamu lebih konsisten mengerjakan tugas pada pertengahan pekan.
        Cobalah menjadwalkan sesi belajar tambahan di awal pekan untuk menjaga ritme dan
        meningkatkan retensi materi. Fokus pada latihan praktikal dan rangkuman poin penting
        agar pemahaman tetap stabil hingga akhir minggu.
      </p>
    </Card>
  );
};

export default CenterFill;
