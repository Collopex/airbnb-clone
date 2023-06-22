'use client';

import React, { useCallback, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import MenuItems from './MenuItems';
import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useRentModal from '@/app/hooks/useRentModal';
import { SafeUser } from '@/app/types';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type UserMenuProps = {
  currentUser?: SafeUser | null;
};

const UserMenu = ({ currentUser }: UserMenuProps) => {
  const router = useRouter();

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const rentModal = useRentModal();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    // Open the rent modal
    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  return (
    <div className='relative'>
      <div className='flex flex-row items-center px-2'>
        <div
          onClick={onRent}
          className='hidden md:block text-sm font-bold 
          py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer whitespace-nowrap'
        >
          Airbnb your home
        </div>

        <div
          onClick={toggleOpen}
          className='p-4 lg:py-1 lg:px-2 border-[1px] border-neutral-200 flex flex-row 
        items-center gap-3 rounded-full cursor-pointer hover:shadow-sm transition ml-1'
        >
          <AiOutlineMenu />
          <div className='hidden lg:block '>
            <Avatar src={currentUser?.image} height={30} width={30} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className='absolute rounded-xl shadow-lg w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-14 text-sm'>
          <div className='flex flex-col cursor-pointer'>
            {currentUser ? (
              <>
                <MenuItems
                  onClick={() => router.push('/trips')}
                  label='My trips'
                />
                <MenuItems
                  onClick={() => router.push('/favorites')}
                  label='My favorites'
                />
                <MenuItems
                  onClick={() => router.push('/reservations')}
                  label='My reservations'
                />
                <MenuItems
                  onClick={() => router.push('/properties')}
                  label='My properties'
                />
                <MenuItems
                  onClick={() => rentModal.onOpen()}
                  label='Airbnb my home'
                />
                <hr />
                <MenuItems onClick={() => signOut()} label='Log out' />
              </>
            ) : (
              <>
                <MenuItems onClick={loginModal.onOpen} label='Login' />
                <MenuItems onClick={registerModal.onOpen} label='Sign up' />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
