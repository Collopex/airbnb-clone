'use client';
import Image from 'next/image';
import UserPlaceholder from '@/public/icons/UserPlaceholder';
import React from 'react';

type AvatarProps = {
  src: string | null | undefined;
  height: number;
  width: number;
};

const Avatar = ({ src, height, width }: AvatarProps) => {
  return (
    <Image
      className='rounded-full object-cover '
      height={height}
      width={width}
      unoptimized
      priority
      alt='Avatar'
      src={src || '/images/placeholder.jpg'}
    />
  );
};

export default Avatar;
