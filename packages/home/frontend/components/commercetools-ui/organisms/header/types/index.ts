import { Account } from '@commercetools/domain-types/account/Account';
import { Category } from '@commercetools/domain-types/product/Category';
import { Reference } from 'types/reference';
import { NextFrontasticImage } from 'frontastic/lib/image';

export interface Link {
  name: string;
  reference: Reference;
}
export interface Market {
  region: string;
  flag: string;
  locale: string;
  currency: string;
  currencyCode: string;
}

export interface Tile {
  tileCategory: string;
  tileImage: NextFrontasticImage;
  tileHeaderText: string;
  tileButtonLabel: string;
  tileButtonLink: Reference;
}

export interface HeaderProps {
  links: Category[];
  markets: Market[];
  market: Market;
  wishlistItemCount?: number;
  logo: NextFrontasticImage;
  logoLink: Reference;
  account: Account;
  accountLink: Reference;
  tiles?: Tile[];
  handleMarket: (market: Market) => void;
}
