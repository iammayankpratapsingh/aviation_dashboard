import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import KPICards from '../components/KPICards/KPICards';
import TimeLapseMap from '../components/TimeLapseMap/TimeLapseMap';
import TrendCharts from '../components/TrendCharts/TrendCharts';
import InsightsPanel from '../components/InsightsPanel/InsightsPanel';
import Footer from '../components/Footer/Footer';
import './Home.css';

// Mock data - Replace with actual API calls
const generateMockKPIData = () => [
  {
    title: 'Total Passengers Carried',
    value: '341.05',
    yoyGrowth: 12.5,
    unit: 'Million'
  },
  {
    title: 'Passenger Load Factor',
    value: '85.2',
    yoyGrowth: 2.3,
    unit: '%'
  },
  {
    title: 'Aircraft Movements',
    value: '2.8',
    yoyGrowth: 8.7,
    unit: 'Million'
  },
  {
    title: 'Total Revenue',
    value: '₹45,230',
    yoyGrowth: 15.4,
    unit: 'Crores'
  }
];

const generateMockMapData = () => {
  const airports = [
    { id: '1', name: 'Delhi (DEL)', lat: 28.5562, lng: 77.1000 },
    { id: '2', name: 'Mumbai (BOM)', lat: 19.0896, lng: 72.8656 },
    { id: '3', name: 'Bangalore (BLR)', lat: 13.1986, lng: 77.7066 },
    { id: '4', name: 'Hyderabad (HYD)', lat: 17.2403, lng: 78.4294 },
    { id: '5', name: 'Chennai (MAA)', lat: 12.9941, lng: 80.1709 },
    { id: '6', name: 'Kolkata (CCU)', lat: 22.6547, lng: 88.4467 },
    { id: '7', name: 'Pune (PNQ)', lat: 18.5822, lng: 73.9197 },
    { id: '8', name: 'Goa (GOI)', lat: 15.3808, lng: 73.8314 },
  ];

  const data: { [year: number]: any[] } = {};
  for (let year = 2019; year <= 2023; year++) {
    data[year] = airports.map(airport => ({
      ...airport,
      value: Math.floor(Math.random() * 5000000) + 1000000,
      yoyGrowth: (Math.random() * 30) - 5
    }));
  }
  return data;
};

const generateMockChartData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return {
    passengerData: months.map(month => ({
      month,
      passengers: Math.floor(Math.random() * 5000000) + 2000000
    })),
    utilizationData: months.map(month => ({
      month,
      utilization: Math.floor(Math.random() * 20) + 70
    })),
    askRpkData: months.map(month => ({
      month,
      ASK: Math.floor(Math.random() * 10000000) + 5000000,
      RPK: Math.floor(Math.random() * 8000000) + 4000000
    }))
  };
};

const generateMockInsights = (year: number) => [
  {
    type: 'growth' as const,
    title: 'Passenger Traffic Growth',
    value: '+12.5%',
    description: `Passenger traffic grew by 12.5% year-over-year in ${year}, indicating strong recovery post-pandemic.`
  },
  {
    type: 'top' as const,
    title: 'Top Performing Airport',
    value: 'Delhi (DEL)',
    description: 'Delhi Airport handled the highest passenger volume with 65.7 million passengers this year.'
  },
  {
    type: 'trend' as const,
    title: 'Load Factor Trend',
    value: '85.2%',
    description: 'Average passenger load factor improved by 2.3 percentage points, showing efficient capacity utilization.'
  }
];

const Home = () => {
  const [selectedYear, setSelectedYear] = useState(2023);
  const [indicator, setIndicator] = useState<'passengers' | 'revenue' | 'cargo'>('passengers');

  const handleIndicatorChange = (newIndicator: 'passengers' | 'revenue' | 'cargo') => {
    setIndicator(newIndicator);
  };

  const kpiData = useMemo(() => generateMockKPIData(), []);
  const mapData = useMemo(() => generateMockMapData(), []);
  const chartData = useMemo(() => generateMockChartData(), [selectedYear]);
  const insights = useMemo(() => generateMockInsights(selectedYear), [selectedYear]);

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

  return (
    <div className="home-dashboard">
      {/* Hero Section */}
      <motion.section 
        className="hero-section"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="hero-content">
          <h1 className="hero-title">India Civil Aviation Performance Dashboard</h1>
          <p className="hero-subtitle">
            Comprehensive visualization of passenger traffic, aircraft movements, revenue, 
            and infrastructure growth over time. Data sourced from DGCA and AAI.
          </p>
          <div className="data-badge">
            <span className="badge-label">Data Source:</span>
            <span className="badge-value">DGCA / AAI</span>
            <span className="badge-separator">•</span>
            <span className="badge-updated">Last Updated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </motion.section>

      {/* KPI Cards */}
      <div className="dashboard-section">
        <KPICards data={kpiData} />
      </div>

      {/* Time-Lapse Map */}
      <div className="dashboard-section">
        <TimeLapseMap 
          data={mapData} 
          indicator={indicator}
          onYearChange={handleYearChange}
          onIndicatorChange={handleIndicatorChange}
        />
      </div>

      {/* Trend Charts */}
      <div className="dashboard-section">
        <TrendCharts 
          passengerData={chartData.passengerData}
          utilizationData={chartData.utilizationData}
          askRpkData={chartData.askRpkData}
          selectedYear={selectedYear}
        />
      </div>

      {/* Insights Panel */}
      <div className="dashboard-section">
        <InsightsPanel insights={insights} />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
