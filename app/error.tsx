'use client';

import { useEffect } from 'react';
import EmptyState from './components/EmptyState';

type ErrorStateProp = {
  error: Error;
};

const ErrorState = ({ error }: ErrorStateProp) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <EmptyState title='Oh Nooo!' subTitle='Something went wrong!' />;
};

export default ErrorState;
