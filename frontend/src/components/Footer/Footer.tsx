import './Footer.css';

const Footer = () => {
  return (
    <footer className="dashboard-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Methodology</h4>
          <p>
            Data is compiled from DGCA (Directorate General of Civil Aviation) 
            and AAI (Airports Authority of India) official reports. Metrics are 
            calculated using standardized aviation industry formulas.
          </p>
        </div>
        <div className="footer-section">
          <h4>Data Sources</h4>
          <ul>
            <li>DGCA Monthly Traffic Reports</li>
            <li>AAI Airport Statistics</li>
            <li>Ministry of Civil Aviation</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Download</h4>
          <div className="download-buttons">
            <button className="download-btn">CSV</button>
            <button className="download-btn">Excel</button>
            <button className="download-btn">PDF Report</button>
          </div>
        </div>
        <div className="footer-section">
          <h4>About</h4>
          <p>
            This dashboard provides comprehensive insights into India's civil 
            aviation performance, helping stakeholders make data-driven decisions.
          </p>
          <p className="last-updated">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 National Transport Performance Dashboard. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

