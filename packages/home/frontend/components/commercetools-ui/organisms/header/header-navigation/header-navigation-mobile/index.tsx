import React, { FC, useState } from 'react';
import { Category } from '@commercetools/domain-types/product/Category';
import { Bars3Icon } from '@heroicons/react/24/outline';
import Button from 'components/commercetools-ui/atoms/button';
import Drawer from 'components/commercetools-ui/atoms/drawer';
import MobileMenu from 'components/commercetools-ui/organisms/header/header-navigation/header-navigation-mobile/menu-mobile';
import MarketButtonMobile from 'components/commercetools-ui/organisms/market-button/market-button-mobile';
import { useFormat } from 'helpers/hooks/useFormat';

export interface Props {
  links: Category[];
}

const HeaderNavigationMobile: FC<Props> = ({ links }) => {
  const [category, setCategory] = useState<Category[]>([]);
  const [showMenu, setShowMenu] = useState(false);

  const { formatMessage } = useFormat({ name: 'common' });

  const showHeaderMenu = () => {
    setShowMenu(true);
  };

  const hideHeaderMenu = () => {
    setShowMenu(false);
    setCategory([]);
  };

  return (
    <div className="flex md:w-109 lg:hidden">
      <Button
        variant="secondary"
        size="icon"
        onClick={showHeaderMenu}
        title={formatMessage({ id: 'header.menu.open', defaultMessage: 'Open side menu' })}
      >
        <Bars3Icon className="w-30 text-secondary-black" />
      </Button>

      <Drawer isOpen={showMenu} direction="left" className="w-4/5" onClose={hideHeaderMenu}>
        <MobileMenu links={links} hideHeaderMenu={hideHeaderMenu} category={category} setCategory={setCategory} />
        {category.length <= 0 && <MarketButtonMobile />}
      </Drawer>
    </div>
  );
};

export default HeaderNavigationMobile;
