"use client";
import React from 'react'

const PackageCard = ({ 
  packageName = "Package Name 1", 
  originalPrice = "₹5120", 
  currentPrice = "₹3840", 
  coins = "2000", 
  discount = "25%", 
  isBestSeller = false,
  onBuyNow,
  id
}:{
  packageName:string;
  originalPrice:string;
  currentPrice:string;
  coins:string;
  discount:string;
  isBestSeller:boolean;
  onBuyNow:(id:string)=>void;
  id:string;
}) => {
  return (
    <div className="package-card">
      {/* Best Seller Tag */}
      {isBestSeller && (
        <div className="best-seller-tag">
          Best Seller
        </div>
      )}
      
      {/* Package Name */}
      <div className="package-name">
        {packageName}
      </div>
      
      {/* Discount and Original Price */}
      <div className="package-discount">
        <span className="discount-text">{discount} Off</span>
        <span className="original-price">{originalPrice}</span>
      </div>
      
      {/* Price and Coins Container - SIDE BY SIDE */}
      <div className="package-price-container">
        <div className="package-price">
          {currentPrice}
        </div>
        <div className="package-coins">
          {coins} Coins
        </div>
      </div>
      
      {/* Buy Now Button */}
      <button className="package-buy-btn" onClick={()=>onBuyNow(id)}>
        Buy Now
      </button>
    </div>
  )
}

export default PackageCard