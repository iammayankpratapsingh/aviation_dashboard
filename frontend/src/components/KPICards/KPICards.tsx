import React from 'react';
import { motion } from 'framer-motion';
import './KPICards.css';

interface KPIData {
  title: string;
  value: string;
  yoyGrowth: number;
  unit?: string;
}

interface KPICardsProps {
  data: KPIData[];
}

const KPICards: React.FC<KPICardsProps> = ({ data }) => {
  return (
    <div className="kpi-cards-container">
      {data.map((kpi, index) => (
        <motion.div
          key={index}
          className="kpi-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className="kpi-header">
            <h3 className="kpi-title">{kpi.title}</h3>
          </div>
          <div className="kpi-content">
            <div className="kpi-value">
              {kpi.value}
              {kpi.unit && <span className="kpi-unit">{kpi.unit}</span>}
            </div>
            <div className={`kpi-growth ${kpi.yoyGrowth >= 0 ? 'positive' : 'negative'}`}>
              <span className="growth-icon">{kpi.yoyGrowth >= 0 ? '↑' : '↓'}</span>
              {Math.abs(kpi.yoyGrowth).toFixed(1)}% YoY
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default KPICards;

