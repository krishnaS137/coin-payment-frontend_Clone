"use client";
import React from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
const YourCoinsSection = ({ 
  coins = 5000, 
  showWithdraw = true, 
  onWithdrawClick 
}: { 
  coins: number, 
  showWithdraw: boolean, 
  onWithdrawClick: () => void 
}) => {
  const router = useRouter()

  const handleWithdrawClick = () => {
    console.log('Withdraw button clicked!')
    
    if (onWithdrawClick) {
      onWithdrawClick()
    } else {
      // Navigate to withdraw page using React Router
      router.push('/withdraw-coins')
    }
  }

  return (
    <div className="your-coins-section">
      <div className="your-coins-card">
        {/* Background logo - SIMPLIFIED AND VISIBLE */}
        <Image 
          src="/images/045a8d3f7b746d42cdcc8a7d57e6cee3ef515690.png"
          alt="Background Logo"
          className="logo-background-image"
        />

        {/* Main content */}
        <div className="your-coins-content">
          <div className="your-coins-label">Your Coins</div>
          <div className="your-coins-amount-container">
            <div className="coin-icon-container">
              <Image 
                src="/images/19331e9a326db2a70b77a1fb9b48481657d872a5.png"
                alt="Coin"
                className="coin-icon-image"
              />
            </div>
            <span className="coin-amount-text">{coins}</span>
          </div>
          {showWithdraw && (
            <button 
              className="withdraw-coins-btn"
              onClick={handleWithdrawClick}
              type="button"
            >
              Withdraw Coins
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default YourCoinsSection 