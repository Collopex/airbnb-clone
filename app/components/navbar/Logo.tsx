'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import AirbnbLogo from '@/public/icons/AirbnbLogo';

const Logo = () => {
  const router = useRouter();
  return (
    <div className='cursor-pointer' onClick={() => router.push('/')}>
      <AirbnbLogo />
    </div>
  );
};

export default Logo;
