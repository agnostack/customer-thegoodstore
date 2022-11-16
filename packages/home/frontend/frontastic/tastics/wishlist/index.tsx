import React from 'react';
import WishList from 'components/commercetools-ui/organisms/wishlist';
import { LineItem } from '@commercetools/domain-types/wishlist/LineItem';
import { useWishlist } from 'frontastic/provider';

const WishlistTastic = ({ data }) => {
  const { data: wishlist, removeLineItem } = useWishlist();

  const removeLineItems = async (item: LineItem) => {
    await removeLineItem(wishlist, item);
  };

  return (
    <WishList
      pageTitle={data.pageTitle}
      emptyStateImage={data.emptyStateImage}
      emptyStateTitle={data.emptyStateTitle}
      emptyStateSubtitle={data.emptyStateSubtitle}
      emptyStateCTALabel={data.emptyStateCTALabel}
      emptyStateCTALink={data.emptyStateCTALink}
      items={wishlist}
      removeLineItems={removeLineItems}
    />
  );
};

export default WishlistTastic;
