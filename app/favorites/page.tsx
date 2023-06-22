import EmptyState from '../components/EmptyState';
import ClientOnly from '../components/ClientOnly';

import getCurrentUser from '../actions/getCurrentUser';
import getFavoriteListings from '../actions/getFavoriteListings';
import FavoriteClient from './FavoriteClient';

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();
  const favorites = await getFavoriteListings();

  if (favorites.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title='No favorites found'
          subTitle='Looks like you dont have no favorite listings.'
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavoriteClient favorites={favorites} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default FavoritesPage;
