import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Loading from './components/Loading/Loading';
import Home from './pages/Home';
import Map from './pages/Map';
import Trends from './pages/Trends';
import Airports from './pages/Airports';
import Insights from './pages/Insights';
import Downloads from './pages/Downloads';
import About from './pages/About';
import './App.css';
import backgroundImage from './assets/background2.png';

function App() {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = backgroundImage;
    
    img.onload = () => {
      setIsImageLoaded(true);
    };
    
    img.onerror = () => {
      // Even if image fails to load, hide loading after a timeout
      setTimeout(() => {
        setIsImageLoaded(true);
      }, 2000);
    };

    // Fallback timeout in case image takes too long
    const timeout = setTimeout(() => {
      setIsImageLoaded(true);
    }, 10000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <Loading isVisible={!isImageLoaded} />
      <div className={`app-content ${isImageLoaded ? 'fade-in' : ''}`}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/trends" element={<Trends />} />
          <Route path="/airports" element={<Airports />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
