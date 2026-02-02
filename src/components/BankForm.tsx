"use client";
import React from 'react'

interface BankDetails {
  bank_account_number: string;
  ifsc_code: string;
  bank_account_name: string;
}

interface BankFormProps {
  data: BankDetails;
  onChange: (data: BankDetails) => void;
}

const BankForm = ({ data, onChange }: BankFormProps) => {
  const handleInputChange = (field: keyof BankDetails, value: string) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  return (
    <div className='d-flex flex-column gap-md-3' style={{width: '100%'}}>
      <label htmlFor="name" className='fw-medium fs-6 fs-md-5'>Enter Name</label>
      <input 
        type="text" 
        placeholder='Enter Name' 
        className='form-control' 
        value={data.bank_account_name}
        onChange={(e) => handleInputChange('bank_account_name', e.target.value)}
        style={{
          backgroundColor: '#D9D9D942',
          border: '1px solid #e0e0e0',
          borderRadius: '25px',
          padding: '15px 20px',
          fontSize: '16px',
          height: '50px',
          width: '100%',
          borderColor: '#6B6868',
          marginBottom: '15px'
        }} 
      />
      
      <label htmlFor="accountNumber" className='fw-medium fs-6 fs-md-5'>Enter Account Number</label>
      <input 
        type="text" 
        placeholder='Enter Account Number' 
        className='form-control' 
        value={data.bank_account_number}
        onChange={(e) => handleInputChange('bank_account_number', e.target.value)}
        style={{
          backgroundColor: '#D9D9D942',
          border: '1px solid #e0e0e0',
          borderRadius: '25px',
          padding: '15px 20px',
          fontSize: '16px',
          height: '50px',
          width: '100%',
          borderColor: '#6B6868',
          marginBottom: '15px'
        }} 
      />
      
      <label htmlFor="ifscCode" className='fw-medium fs-6 fs-md-5'>Enter IFSC Code</label>
      <input 
        type="text" 
        placeholder='Enter IFSC Code' 
        className='form-control' 
        value={data.ifsc_code}
        onChange={(e) => handleInputChange('ifsc_code', e.target.value)}
        style={{
          backgroundColor: '#D9D9D942',
          border: '1px solid #e0e0e0',
          borderRadius: '25px',
          padding: '15px 20px',
          fontSize: '16px',
          height: '50px',
          width: '100%',
          borderColor: '#6B6868',
          marginBottom: '15px'
        }} 
      />
      
      <label htmlFor="bankBranch" className='fw-medium fs-6 fs-md-5'>Bank Branch</label>
      <input 
        type="text" 
        placeholder='Bank Branch' 
        className='form-control' 
        
          
        style={{
          backgroundColor: '#D9D9D942',
          border: '1px solid #e0e0e0',
          borderRadius: '25px',
          padding: '15px 20px',
          fontSize: '16px',
          height: '50px',
          width: '100%',
          borderColor: '#6B6868'
        }} 
      />
    </div>
  )
}

export default BankForm