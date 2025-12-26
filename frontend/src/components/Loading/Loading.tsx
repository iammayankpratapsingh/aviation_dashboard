import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import './Loading.css';

interface LoadingProps {
  isVisible: boolean;
}

const Loading: React.FC<LoadingProps> = ({ isVisible }) => {
  return (
    <div className={`loading-container ${!isVisible ? 'hidden' : ''}`}>
      <DotLottieReact
        src="https://lottie.host/51fd8853-869c-496b-9f4b-7e4800dbc8e1/c7X5YHbGsE.lottie"
        loop
        autoplay
      />
    </div>
  );
};

export default Loading;

