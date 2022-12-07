import React, { useState, useRef } from 'react';
import { Category } from '@commercetools/domain-types/product/Category';
import HeaderLogo from 'components/commercetools-ui/organisms/header/header-logo';
import HeaderNavigationDesktop from 'components/commercetools-ui/organisms/header/header-navigation/header-navigation-desktop';
import HeaderNavigationMobile from 'components/commercetools-ui/organisms/header/header-navigation/header-navigation-mobile';
import { HeaderProps } from 'components/commercetools-ui/organisms/header/types';
import UtilitySection from 'components/commercetools-ui/organisms/header/utility-section';
import MarketButton from 'components/commercetools-ui/organisms/market-button/market-button';

const Header: React.FC<HeaderProps> = ({
  links,
  logo,
  logoLink,
  tiles,
  emptyCartTitle,
  emptyCartSubtitle,
  emptyCartImage,
  emptyCartCategories,
  emptyWishlistTitle,
  emptyWishlistSubtitle,
  emptyWishlistImage,
  emptyWishlistCategories,
}) => {
  const [activeCategory, setActiveCategory] = useState<Category>(undefined);

  const showSubMenu = (category?: Category) => {
    setActiveCategory(category);
  };
  const hideSubMenu = () => {
    setActiveCategory(undefined);
  };

  const showTimeout = useRef<NodeJS.Timer>(null);

  const handleMouseIn = (category: Category) => {
    if (activeCategory) showSubMenu(category); //Already opened do not delay
    else showTimeout.current = setTimeout(() => showSubMenu(category), 300);
  };

  const handleMouseOut = () => {
    if (showTimeout.current) {
      clearTimeout(showTimeout.current);
      showTimeout.current = null;
    }
    hideSubMenu();
  };

  return (
    <header className="h-fit w-full border-b-[1.5px] border-neutral-400 bg-white">
      <div aria-label="Top" className="mx-5 flex h-60 items-center justify-between md:mx-22 md:h-80 lg:mx-10 xl:mx-50">
        <MarketButton />

        <HeaderNavigationMobile links={links} />

        <HeaderLogo logo={logo} logoLink={logoLink} />

        <UtilitySection
          emptyCartTitle={emptyCartTitle}
          emptyCartSubtitle={emptyCartSubtitle}
          emptyCartImage={emptyCartImage}
          emptyCartCategories={emptyCartCategories}
          emptyWishlistTitle={emptyWishlistTitle}
          emptyWishlistSubtitle={emptyWishlistSubtitle}
          emptyWishlistImage={emptyWishlistImage}
          emptyWishlistCategories={emptyWishlistCategories}
        />
      </div>

      <HeaderNavigationDesktop
        links={links}
        tiles={tiles}
        activeCategory={activeCategory}
        handleMouseIn={handleMouseIn}
        handleMouseOut={handleMouseOut}
        hideSubMenu={hideSubMenu}
      />
    </header>
  );
};
export default Header;
