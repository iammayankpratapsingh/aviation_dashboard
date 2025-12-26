import React from 'react';
import { motion } from 'framer-motion';
import './InsightsPanel.css';

interface Insight {
  type: 'growth' | 'top' | 'trend';
  title: string;
  value: string;
  description: string;
}

interface InsightsPanelProps {
  insights: Insight[];
}

const InsightsPanel: React.FC<InsightsPanelProps> = ({ insights }) => {
  return (
    <div className="insights-panel">
      <h3 className="insights-title">Key Insights</h3>
      <div className="insights-list">
        {insights.map((insight, index) => (
          <motion.div
            key={index}
            className="insight-item"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="insight-icon">
              {insight.type === 'growth' && '📈'}
              {insight.type === 'top' && '🏆'}
              {insight.type === 'trend' && '📊'}
            </div>
            <div className="insight-content">
              <h4 className="insight-title">{insight.title}</h4>
              <p className="insight-value">{insight.value}</p>
              <p className="insight-description">{insight.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default InsightsPanel;

