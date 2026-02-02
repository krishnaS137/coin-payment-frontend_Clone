"use client";
import React from 'react'

const CoinPill = () => {
  return (
    <div 
      className="coin-pill position-absolute d-flex align-items-center justify-content-center text-white fw-medium"
    >
      <div className="d-flex align-items-center">
        <img
          src="/images/19331e9a326db2a70b77a1fb9b48481657d872a5.png"
          alt="Coin"
          className="coin-image me-2"
          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
            // Fallback if image doesn't load
            (e.target as HTMLImageElement).style.display = 'none';
            const nextElement = (e.target as HTMLImageElement).nextSibling as HTMLElement;
            if (nextElement) {
              nextElement.textContent = ' 100';
            }
          }}
        />
        <span>100</span>
        <span className="ms-1">+</span>
      </div>
    </div>
  )
}

export default CoinPill