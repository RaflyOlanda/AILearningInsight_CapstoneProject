import React from 'react'
import Header from '../components/Layout/Header'
import Sidebar from '../components/Layout/Sidebar'
import CardContainer from '../components/Dashboard/Shared/CardContainer'
import LineChart from '../components/Dashboard/Statistics/LineChart'
import PerformanceGauge from '../components/Dashboard/Statistics/PerformanceGauge'
import RecommendationCard from '../components/Dashboard/RecommendationCard'
import ClassList from '../components/Dashboard/Classes/ClassList'
import HistorySection from '../components/Dashboard/LearningHistory/HistorySection'

export default function StudentDashboard() {
  return (
    <div className="dashboard-app">
      <Header />

      <div className="dashboard-body">
        <Sidebar />

        <main className="dashboard-main dashboard-content">
          <div className="top-row">
            <CardContainer title="Statistik Siswa" className="chart-card">
              <LineChart />
            </CardContainer>

            <div className="right-column">
              <CardContainer title="Skor Kinerja Belajar" className="gauge-card">
                <PerformanceGauge value={73.5} />
              </CardContainer>
              <RecommendationCard />
            </div>
          </div>

          <section className="live-classes">
            <h3>Kelas yang berlangsung</h3>
            <CardContainer>
              <div style={{ padding: 12 }}>
                Designing a Learning Portal
              </div>
            </CardContainer>
          </section>

          <section className="class-list-section">
            <h3>Daftar Kelas</h3>
            <ClassList />
          </section>

          <div className="bottom-row">
            <HistorySection />
          </div>
        </main>
      </div>
    </div>
  )
}
