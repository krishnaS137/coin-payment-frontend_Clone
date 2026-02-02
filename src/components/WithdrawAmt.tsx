"use client";
import React, { useCallback } from 'react'

interface WithdrawAmtProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAmountSet: (amount: number) => void;
}

const WithdrawAmt = ({ value, onChange, onAmountSet }: WithdrawAmtProps) => {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(e); // Update local input
    
    // Convert to number and pass to parent
    const amount = parseInt(inputValue) || 0;
    onAmountSet(amount);
  },[onchange,onAmountSet]);

  return (
    <div>
        <div className='d-flex flex-column gap-3' style={{marginTop: '100px'}}>
          <label htmlFor="amount" className='fw-medium'>Enter Withdrawal Amount</label>
          <input 
            type="text" 
            placeholder='Enter Withdrawal Amount' 
            className='form-control' 
            value={value}
            onChange={handleChange}
            style={{
              backgroundColor: '#D9D9D942',
              border: '1px solid #e0e0e0',
              borderRadius: '25px',
              padding: '15px 20px',
              fontSize: '16px',
              height: '50px',
              width: '100%',
              borderColor: '#6B6868',
              maxWidth: '100%',
              boxSizing: 'border-box'
            }} 
          />
        </div>
    </div>
  )
}

export default WithdrawAmt