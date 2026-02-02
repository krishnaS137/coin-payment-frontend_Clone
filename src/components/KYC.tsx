"use client";
import Image from 'next/image';
import React from 'react'

interface KYCDetails {
  aadhar_front_file: File | null;
  aadhar_back_file: File | null;
  pan_card_file: File | null;
}

interface KYCProps {
  data: KYCDetails;
  onChange: (data: KYCDetails) => void;
}

const cameraFilter = 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)';

const KYC = ({ data, onChange }: KYCProps) => {
  const handleFileUpload = (field: keyof KYCDetails, file: File | null) => {
    onChange({
      ...data,
      [field]: file
    });
  };

  const triggerFileInput = (inputId: string) => {
    const input = document.getElementById(inputId) as HTMLInputElement;
    if (input) {
      input.click();
    }
  };

  return (
    <div style={{
      marginTop: '50px',
      padding: '0 5vw',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <div className='d-flex flex-column gap-5 w-100'>
        
        {/* Aadhar Card Section */}
        <div className='d-flex flex-column gap-3 w-100'>
          <label className='fw-medium fs-6'>Upload Aadhar Card<span style={{color: 'red'}}>*</span></label>
          <div className='d-flex w-100 gap-4 flex-row justify-content-start flex-wrap'>
            {/* Front Upload Box */}
            <div className='d-flex flex-column align-items-center justify-content-center'
                 style={{
                   backgroundColor: '#fff',
                   borderRadius: '20px',
                   padding: '40px 20px',
                   border: '1px solid #e0e0e0',
                   boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
                   minHeight: '200px',
                   flex: '1 1 200px',
                   maxWidth: '250px',
                   minWidth: '180px',
                   cursor: 'pointer'
                 }}
                 onClick={() => triggerFileInput('aadhar-front')}>
              
              <input
                id="aadhar-front"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  if (file && file.type.startsWith('image/')) {
                    handleFileUpload('aadhar_front_file', file);
                  } else {
                    alert('Please select a valid image file');
                  }
                }}
              />
              
              {data.aadhar_front_file ? (
                <div className='text-center'>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '10px',
                    backgroundImage: `url(${URL.createObjectURL(data.aadhar_front_file)}`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    marginBottom: '10px'
                  }}></div>
                  <span className='fw-medium' style={{color: '#B68580', fontSize: '14px'}}>
                    {data.aadhar_front_file.name}
                  </span>
                </div>
              ) : (
                <>
                  <Image
                    src="/images/861cd136c87bcf2918b0a1491efef519fa191b4f.png"
                    alt="Camera"
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'contain',
                      marginBottom: '18px',
                      filter: cameraFilter
                    }}
                  />
                  <span className='fw-medium' style={{color: '#000', fontSize: '18px'}}>Front</span>
                </>
              )}
            </div>
            
            {/* Back Upload Box */}
            <div className='d-flex flex-column align-items-center justify-content-center'
                 style={{
                   backgroundColor: '#fff',
                   borderRadius: '20px',
                   padding: '40px 20px',
                   border: '1px solid #e0e0e0',
                   boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
                   minHeight: '200px',
                   flex: '1 1 200px',
                   maxWidth: '250px',
                   minWidth: '180px',
                   cursor: 'pointer'
                 }}
                 onClick={() => triggerFileInput('aadhar-back')}>
              
              <input
                id="aadhar-back"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  if (file && file.type.startsWith('image/')) {
                    handleFileUpload('aadhar_back_file', file);
                  } else {
                    alert('Please select a valid image file');
                  }
                }}
              />
              
              {data.aadhar_back_file ? (
                <div className='text-center'>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '10px',
                    backgroundImage: `url(${URL.createObjectURL(data.aadhar_back_file)}`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    marginBottom: '10px'
                  }}></div>
                  <span className='fw-medium' style={{color: '#B68580', fontSize: '14px'}}>
                    {data.aadhar_back_file.name}
                  </span>
                </div>
              ) : (
                <>
                  <Image
                    src="/images/861cd136c87bcf2918b0a1491efef519fa191b4f.png"
                    alt="Camera"
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'contain',
                      marginBottom: '18px',
                      filter: cameraFilter
                    }}
                  />
                  <span className='fw-medium' style={{color: '#000', fontSize: '18px'}}>Back</span>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* PAN Card Section */}
        <div className='d-flex flex-column gap-3 w-100'>
          <label className='fw-medium fs-6'>Upload PAN Card<span style={{color: 'red'}}>*</span></label>
          <div className='d-flex w-100 gap-4 flex-wrap justify-content-start'>
            <div className='d-flex flex-column align-items-center justify-content-center'
                 style={{
                   backgroundColor: '#fff',
                   borderRadius: '20px',
                   padding: '40px 20px',
                   border: '1px solid #e0e0e0',
                   boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
                   minHeight: '200px',
                   flex: '1 1 200px',
                   maxWidth: '250px',
                   minWidth: '180px',
                   cursor: 'pointer'
                 }}
                 onClick={() => triggerFileInput('pan-front')}>
              
              <input
                id="pan-front"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  if (file && file.type.startsWith('image/')) {
                    handleFileUpload('pan_card_file', file);
                  } else {
                    alert('Please select a valid image file');
                  }
                }}
              />
              
              {data.pan_card_file ? (
                <div className='text-center'>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '10px',
                    backgroundImage: `url(${URL.createObjectURL(data.pan_card_file)}`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    marginBottom: '10px'
                  }}></div>
                  <span className='fw-medium' style={{color: '#B68580', fontSize: '14px'}}>
                    {data.pan_card_file.name}
                  </span>
                </div>
              ) : (
                <>
                  <Image
                    src="/images/861cd136c87bcf2918b0a1491efef519fa191b4f.png"
                    alt="Camera"
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'contain',
                      marginBottom: '18px',
                      filter: cameraFilter
                    }}
                  />
                  <span className='fw-medium' style={{color: '#000', fontSize: '18px'}}>Front</span>
                </>
              )}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default KYC