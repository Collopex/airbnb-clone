'use client';

import React, { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { SafeListing, SafeReservation, SafeUser } from '../../types';
import useCountries from '../../hooks/useCountries';
import { format } from 'date-fns';
import Image from 'next/image';
import HeartButton from '../HeartButton';
import Button from '../Button';

type ListingCardProps = {
  data: SafeListing;
  reservation?: SafeReservation | null;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
};

const ListingCard = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  currentUser,
}: ListingCardProps) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) return null;

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, 'PP')} -  ${format(end, 'PP')}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className='cursor-pointer'
    >
      <div className='flex flex-col overflow-hidden '>
        <div className='w-full  h-[310px] relative overflow-hidden rounded-xl'>
          <Image
            fill
            sizes='auto'
            alt='Listings'
            src={data.imageSrc}
            className='object-cover relative'
            priority
          />
          <div className='absolute top-3 right-3'>
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className='mt-2 font-semibold text-base text-[#3b3b3b] '>
          {location?.region}, {location?.label}
        </div>
        <div className='font-light text-[#717171]'>
          {reservationDate || data.category}
        </div>
        <div className='flex flex-row items-center gap-1 mt-1 mb-1'>
          <div className='font-semibold '>$ {price}</div>
          {!reservation && (
            <div className='font-light text-[#5d5d5d]'>night</div>
          )}
        </div>

        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
