import React from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Bar } from 'recharts';
import './TrendCharts.css';

interface TrendChartsProps {
  passengerData: Array<{ month: string; passengers: number }>;
  utilizationData: Array<{ month: string; utilization: number }>;
  askRpkData: Array<{ month: string; ASK: number; RPK: number }>;
  selectedYear: number;
}

const TrendCharts: React.FC<TrendChartsProps> = ({ 
  passengerData, 
  utilizationData, 
  askRpkData
}) => {
  return (
    <div className="trend-charts-container">
      <div className="chart-grid">
        <div className="chart-card">
          <h3 className="chart-title">Monthly Passenger Traffic</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={passengerData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis 
                dataKey="month" 
                stroke="rgba(255, 255, 255, 0.7)"
                tick={{ fill: 'rgba(255, 255, 255, 0.7)' }}
              />
              <YAxis 
                stroke="rgba(255, 255, 255, 0.7)"
                tick={{ fill: 'rgba(255, 255, 255, 0.7)' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0, 0, 0, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Legend 
                wrapperStyle={{ color: 'rgba(255, 255, 255, 0.7)' }}
              />
              <Line 
                type="monotone" 
                dataKey="passengers" 
                stroke="#646cff" 
                strokeWidth={3}
                dot={{ fill: '#646cff', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3 className="chart-title">Aircraft Utilization</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={utilizationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis 
                dataKey="month" 
                stroke="rgba(255, 255, 255, 0.7)"
                tick={{ fill: 'rgba(255, 255, 255, 0.7)' }}
              />
              <YAxis 
                stroke="rgba(255, 255, 255, 0.7)"
                tick={{ fill: 'rgba(255, 255, 255, 0.7)' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0, 0, 0, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="utilization" 
                stroke="#4ade80" 
                fill="#4ade80"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card full-width">
          <h3 className="chart-title">ASK vs RPK Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={askRpkData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis 
                dataKey="month" 
                stroke="rgba(255, 255, 255, 0.7)"
                tick={{ fill: 'rgba(255, 255, 255, 0.7)' }}
              />
              <YAxis 
                yAxisId="left"
                stroke="rgba(255, 255, 255, 0.7)"
                tick={{ fill: 'rgba(255, 255, 255, 0.7)' }}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right"
                stroke="rgba(255, 255, 255, 0.7)"
                tick={{ fill: 'rgba(255, 255, 255, 0.7)' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0, 0, 0, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Legend 
                wrapperStyle={{ color: 'rgba(255, 255, 255, 0.7)' }}
              />
              <Bar 
                yAxisId="left"
                dataKey="ASK" 
                fill="#fbbf24" 
                fillOpacity={0.7}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="RPK" 
                stroke="#f87171" 
                strokeWidth={3}
                dot={{ fill: '#f87171', r: 4 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default TrendCharts;

