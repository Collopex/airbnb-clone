'use client';
import React, { useMemo } from 'react';
import useCountries from '@/app/hooks/useCountries';
import useSearchModal from '@/app/hooks/useSearchModal';
import { useSearchParams } from 'next/navigation';
import { BiSearch } from 'react-icons/bi';
import { difference } from 'next/dist/build/utils';
import { differenceInDays } from 'date-fns';

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useCountries();

  const locationValue = params?.get('locationValue');
  const startDate = params?.get('startDate');
  const endDate = params?.get('endDate');
  const guestCount = params?.get('guestCount');

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }

    return 'Anywhere';
  }, [getByValue, locationValue]);

  const intervalLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);

      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return `${diff} days`;
    }

    return 'Any week';
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }

    return 'Add Guests';
  }, [guestCount]);

  return (
    <div
      onClick={searchModal.onOpen}
      className='border-[1px] border-gray-300 lg:ml-16 w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer'
    >
      <div className='flex flex-row items-center justify-between'>
        <div className='text-sm font-bold px-4'>{locationLabel}</div>
        <div className='hidden md:block text-sm font-bold px-4 border-x-[1px] text-center whitespace-nowrap'>
          {intervalLabel}
        </div>
        <div className='text-sm pl-3 pr-[6px] text-gray-600 flex flex-row items-center gap-3'>
          <div className='hidden md:block whitespace-nowrap'>{guestLabel}</div>
          <div className='p-2 bg-[#FF385C] rounded-full text-white'>
            <BiSearch size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
