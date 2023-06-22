import { useCallback, useMemo } from 'react';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

import { SafeUser } from '../types';

import useLoginModal from './useLoginModal';

type FavoriteProps = {
  listingId: string;
  currentUser?: SafeUser | null;
};

const useFavorite = ({ listingId, currentUser }: FavoriteProps) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let request;

        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
          toast.success('Successful deleted from favorites');
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
          toast.success('Successful added to favorites');
        }

        await request();
        router.refresh();
      } catch (error) {
        toast.error('Something went wrong while adding to favorites!');
      }
    },
    [currentUser, hasFavorited, listingId, loginModal, router]
  );

  return { hasFavorited, toggleFavorite };
};

export default useFavorite;
