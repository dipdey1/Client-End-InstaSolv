import React from 'react';
import './LoadingPage.scss';

const LoadingPage = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <div className="loading-image"></div>
    </div>
  );
};

export default LoadingPage;