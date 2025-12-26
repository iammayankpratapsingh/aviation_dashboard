import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './TimeLapseMap.css';

interface AirportData {
  id: string;
  name: string;
  lat: number;
  lng: number;
  value: number;
  yoyGrowth: number;
}

interface TimeLapseMapProps {
  data: { [year: number]: AirportData[] };
  indicator: 'passengers' | 'revenue' | 'cargo';
  onYearChange?: (year: number) => void;
  onIndicatorChange?: (indicator: 'passengers' | 'revenue' | 'cargo') => void;
}

const TimeLapseMap: React.FC<TimeLapseMapProps> = ({ data, indicator, onYearChange, onIndicatorChange }) => {
  const [currentYear, setCurrentYear] = useState<number>(2023);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedAirport, setSelectedAirport] = useState<AirportData | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [viewport, setViewport] = useState({
    latitude: 20.5937,
    longitude: 78.9629,
    zoom: 4.5,
    bearing: 0,
    pitch: 0,
  });

  const years = Object.keys(data).map(Number).sort((a, b) => a - b);
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentYear((prev) => {
          const next = prev + 1;
          if (next > maxYear) {
            setIsPlaying(false);
            return minYear;
          }
          return next;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, minYear, maxYear]);

  useEffect(() => {
    onYearChange?.(currentYear);
  }, [currentYear, onYearChange]);

  const getMarkerSize = (value: number) => {
    const maxValue = Math.max(...(data[currentYear] || []).map(d => d.value));
    const minValue = Math.min(...(data[currentYear] || []).map(d => d.value));
    const normalized = (value - minValue) / (maxValue - minValue || 1);
    return Math.max(8, Math.min(50, 8 + normalized * 42));
  };

  const getMarkerColor = (yoyGrowth: number) => {
    if (yoyGrowth > 10) return '#4ade80';
    if (yoyGrowth > 0) return '#86efac';
    if (yoyGrowth > -10) return '#fbbf24';
    return '#f87171';
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentYear(Number(e.target.value));
    setIsPlaying(false);
  };

  const currentData = data[currentYear] || [];
  const totalValue = currentData.reduce((sum, airport) => sum + airport.value, 0);
  const avgGrowth = currentData.length > 0 
    ? currentData.reduce((sum, airport) => sum + airport.yoyGrowth, 0) / currentData.length 
    : 0;
  const topAirport = currentData.length > 0 
    ? currentData.reduce((max, airport) => airport.value > max.value ? airport : max, currentData[0])
    : null;

  return (
    <div className="time-lapse-map-container">
      <div className="map-content-wrapper">
        <div className="map-text-content">
          <h3 className="text-title">Aviation Performance Overview</h3>
          <div className="text-stats">
            <div className="stat-item">
              <div className="stat-label">Total {indicator === 'passengers' ? 'Passengers' : indicator === 'revenue' ? 'Revenue' : 'Cargo'}</div>
              <div className="stat-value">{totalValue.toLocaleString()}</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Average YoY Growth</div>
              <div className={`stat-value ${avgGrowth >= 0 ? 'positive' : 'negative'}`}>
                {avgGrowth >= 0 ? '+' : ''}{avgGrowth.toFixed(1)}%
              </div>
            </div>
            {topAirport && (
              <div className="stat-item">
                <div className="stat-label">Top Performing Airport</div>
                <div className="stat-value">{topAirport.name}</div>
                <div className="stat-subvalue">{topAirport.value.toLocaleString()} {indicator === 'passengers' ? 'passengers' : indicator === 'revenue' ? 'revenue' : 'cargo'}</div>
              </div>
            )}
          </div>
          <div className="text-description">
            <p>
              The interactive map on the right displays airport-wise aviation data across India. 
              Each marker represents an airport, with size indicating volume and color representing 
              year-over-year growth performance.
            </p>
            <p>
              <strong>Marker Colors:</strong>
            </p>
            <ul className="legend-list">
              <li><span className="legend-color" style={{ backgroundColor: '#4ade80' }}></span> Strong Growth (10%+)</li>
              <li><span className="legend-color" style={{ backgroundColor: '#86efac' }}></span> Positive Growth (0-10%)</li>
              <li><span className="legend-color" style={{ backgroundColor: '#fbbf24' }}></span> Moderate Decline (-10% to 0%)</li>
              <li><span className="legend-color" style={{ backgroundColor: '#f87171' }}></span> Significant Decline (-10%+)</li>
            </ul>
            <p>
              Use the play button to animate through the years, or drag the slider to explore 
              specific time periods. Click on any airport marker to view detailed statistics.
            </p>
          </div>
        </div>

        <div className="map-wrapper">
        {mapError ? (
          <div className="map-error">
            <p>{mapError}</p>
            <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', opacity: 0.7 }}>
              Please add a valid Mapbox token in your .env file as VITE_MAPBOX_TOKEN
            </p>
          </div>
        ) : (
          <Map
            {...viewport}
            onMove={(evt) => setViewport(evt.viewState)}
            onError={(e) => {
              console.error('Map error:', e);
              setMapError('Failed to load map. Please check your Mapbox token.');
            }}
            mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN || 'pk.eyJ1IjoiaWFtbWF5YW5rcHJhdGFwc2luZ2giLCJhIjoiY21maHZrOHpuMDQ1ZjJrcXJ5MWtheWRleiJ9.seoT3jNUrxES2GwhXN0XHg'}
            style={{ width: '100%', height: '100%' }}
            mapStyle="mapbox://styles/mapbox/dark-v10"
          >
          <AnimatePresence>
            {currentData.map((airport) => (
              <Marker
                key={airport.id}
                latitude={airport.lat}
                longitude={airport.lng}
              >
                <motion.div
                  className="airport-marker"
                  style={{
                    width: getMarkerSize(airport.value),
                    height: getMarkerSize(airport.value),
                    backgroundColor: getMarkerColor(airport.yoyGrowth),
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelectedAirport(airport)}
                />
              </Marker>
            ))}
          </AnimatePresence>

          {selectedAirport && (
            <Popup
              latitude={selectedAirport.lat}
              longitude={selectedAirport.lng}
              onClose={() => setSelectedAirport(null)}
              closeButton={true}
            >
              <div className="airport-popup">
                <h4>{selectedAirport.name}</h4>
                <p>Value: {selectedAirport.value.toLocaleString()}</p>
                <p className={selectedAirport.yoyGrowth >= 0 ? 'positive' : 'negative'}>
                  YoY: {selectedAirport.yoyGrowth >= 0 ? '+' : ''}{selectedAirport.yoyGrowth.toFixed(1)}%
                </p>
              </div>
            </Popup>
          )}
          </Map>
        )}
        <div className="map-controls">
          <div className="control-group">
            <button className="play-pause-btn" onClick={handlePlayPause}>
              {isPlaying ? '⏸' : '▶'}
            </button>
            <div className="year-display">{currentYear}</div>
          </div>
          <div className="slider-group">
            <input
              type="range"
              min={minYear}
              max={maxYear}
              value={currentYear}
              onChange={handleYearChange}
              className="year-slider"
            />
            <div className="year-labels">
              <span>{minYear}</span>
              <span>{maxYear}</span>
            </div>
          </div>
          <select 
            className="indicator-select"
            value={indicator}
            onChange={(e) => {
              const newIndicator = e.target.value as 'passengers' | 'revenue' | 'cargo';
              onIndicatorChange?.(newIndicator);
            }}
          >
            <option value="passengers">Passengers</option>
            <option value="revenue">Revenue</option>
            <option value="cargo">Cargo</option>
          </select>
        </div>
        </div>
      </div>
    </div>
  );
};

export default TimeLapseMap;

