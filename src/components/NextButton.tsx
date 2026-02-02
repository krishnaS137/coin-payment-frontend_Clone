"use client";
import React from 'react'

const NextButton = ({ onClick, buttonText = "Next", disabled = false }: { onClick: () => void, buttonText?: string, disabled?: boolean }) => {
  return (
    <div className='d-flex justify-content-center' style={{marginTop: '50px',marginBottom: '50px'}}>
      <button 
        className='btn' 
        onClick={onClick}
        disabled={disabled}
        style={{
          backgroundColor: disabled ? '#ccc' : '#B68580', 
          color: '#fff',
          borderColor: '#6B6868',
          borderRadius: '25px',
          padding: '15px 20px',
          fontSize: '16px',
          height: '50px',
          width: '100%',
          maxWidth: '500px',
          border: '1px solid #6B6868',
          cursor: disabled ? 'not-allowed' : 'pointer'
        }}
      >
        {buttonText}
      </button>
    </div>
  )
}

export default NextButton