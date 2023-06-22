'use client';

import React from 'react';
import { BarLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div className='h-[70vh] flex flex-col justify-center items-center'>
      <BarLoader width={300} color='#FF385C' />
    </div>
  );
};

export default Loader;
