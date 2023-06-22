'use client';

import React from 'react';
import { SafeListing, SafeUser } from '../types';
import Container from '../components/Container';
import Heading from '../components/Heading';
import ListingCard from '../components/listings/ListingCard';

type FavoriteClientProps = {
  favorites: SafeListing[];
  currentUser?: SafeUser | null;
};

const FavoriteClient = ({ favorites, currentUser }: FavoriteClientProps) => {
  return (
    <Container>
      <Heading
        title='Favorites'
        subTitle='List of places you have favorited!'
      />
      <div
        className='mt-10 grid  grid-cols-1 sm:grid-cols-2 sm:px-3  md:grid-cols-2 lg:grid-cols-3
          xl:grid-cols-4  gap-7'
      >
        {favorites.map((favorite) => (
          <ListingCard
            key={favorite.id}
            data={favorite}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavoriteClient;
