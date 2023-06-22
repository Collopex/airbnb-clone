'use client';

import React from 'react';
import { SafeUser } from '../types';
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';
import useFavorite from '../hooks/useFavorite';

type HeartButtonProps = {
  listingId: string;
  currentUser?: SafeUser | null;
};

const HeartButton = ({ listingId, currentUser }: HeartButtonProps) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
  });

  return (
    <div
      onClick={toggleFavorite}
      className='relative hover:opacity-80 transition cursor-pointer'
    >
      <IoMdHeartEmpty
        size={30}
        color='white'
        className='absolute -top-[2px] -left-[2px]'
      />
      <IoMdHeart
        size={26}
        className={hasFavorited ? 'fill-[#FF385C]' : 'fill-neutral-950/60'}
      />
    </div>
  );
};

export default HeartButton;
