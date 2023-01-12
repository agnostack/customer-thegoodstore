import React, { useRef, useState } from 'react';
import Link from 'components/commercetools-ui/atoms/link';
import Typography from 'components/commercetools-ui/atoms/typography';
import HeaderNavigationButtonDesktop from 'components/commercetools-ui/organisms/header/header-navigation/header-navigation-desktop/header-navigation-button';
import { Tile } from 'components/commercetools-ui/organisms/header/types';
import useClassNames from 'helpers/hooks/useClassNames';
import useScrollDirection from 'helpers/hooks/useScrollDirection';
import { Category } from 'types/category';

export interface Props {
  links: Category[];
  tiles: Tile[];
}

const HeaderNavigationDesktop: React.FC<Props> = ({ links, tiles }) => {
  const [activeCategory, setActiveCategory] = useState<Category>();

  const showSubMenu = (category?: Category) => {
    setActiveCategory(category);
  };
  const hideSubMenu = () => {
    setActiveCategory(undefined);
  };

  const showTimeout = useRef<NodeJS.Timer | null>(null) as React.MutableRefObject<NodeJS.Timer | null>;

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

  const scrollDirection = useScrollDirection(5, -1);
  const navigationClassNames = useClassNames([
    'relative hidden items-center justify-start lg:flex transition-all duration-150 px-24 md:px-36 lg:px-56',
    scrollDirection === 'down' ? 'h-0 opacity-0 pointer-events-none' : 'h-fit opacity-1 pointer-events-auto',
  ]);

  return (
    <>
      {links && (
        <>
          <div onMouseLeave={handleMouseOut} className={navigationClassNames}>
            {links.map((link) => (
              <>
                {link?.subCategories.length > 0 ? (
                  <div
                    key={link?.categoryId}
                    onMouseEnter={() => {
                      handleMouseIn(link);
                    }}
                  >
                    <HeaderNavigationButtonDesktop
                      show={link.categoryId === activeCategory?.categoryId}
                      link={link}
                      updateSubMenu={hideSubMenu}
                      tiles={tiles}
                    />
                  </div>
                ) : (
                  <Link link={link.slug ?? link.path} title={link?.name} className="cursor-pointer py-12 pr-30">
                    <Typography as="span" fontSize={16} className="border-primary-black py-4 hover:border-b-[1.5px]">
                      {link?.name}
                    </Typography>
                  </Link>
                )}
              </>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default HeaderNavigationDesktop;
