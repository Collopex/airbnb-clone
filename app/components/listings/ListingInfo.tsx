'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import useCountries from '@/app/hooks/useCountries';
import { SafeUser } from '@/app/types';
import { IconType } from 'react-icons';
import Avatar from '../Avatar';
import ListingCategory from './ListingCategory';

type ListingInfoProps = {
  user: SafeUser;
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
  locationValue: string;
};

const Map = dynamic(() => import('../Map'), {
  ssr: false,
});

const ListingInfo = ({
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  category,
  locationValue,
}: ListingInfoProps) => {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className='col-span-4 flex flex-col gap-8'>
      <div className=' flex flex-col '>
        <div className='text-lg font-semibold flex flex-row items-center'>
          <div className='flex-1'>Hosted by {user?.name}</div>
          <Avatar src={user?.image} height={60} width={60} />
        </div>
        <div className='flex flex-row items-center gap-2 text-[#2e2e2e] -mt-[6px]'>
          <div> {guestCount} guests</div>
          <div> · {roomCount} rooms</div>
          <div> · {bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className='flex flex-col '>
        <div className='text-lg text-[#2e2e2e] font-semibold'>
          Short Description
        </div>
        <div className='text-lg font-light text-neutral-500'>{description}</div>
      </div>
      <hr />
      <span className='text-lg text-[#2e2e2e] font-semibold'>Location</span>
      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
