import React, { useMemo } from 'react';
import { Product } from '@commercetools/frontend-domain-types/product/Product';
import { SwiperOptions } from 'swiper';
import Slider from 'components/commercetools-ui/atoms/slider';
import Subtitle, { SubtitleProps } from 'components/commercetools-ui/atoms/subtitle';
import Typography from 'components/commercetools-ui/atoms/typography';
import Link from 'components/commercetools-ui/organisms/content/link';
import Wrapper, { WrapperVariant } from 'components/commercetools-ui/organisms/content/wrapper';
import useTouchDevice from 'helpers/hooks/useTouchDevice';
import { mediumDesktop, tablet } from 'helpers/utils/screensizes';
import { Reference } from 'types/reference';
import Tile from '../tile';
import useTrack from './useTrack';

export interface Props extends Partial<SwiperOptions> {
  products: Product[];
  title: string;
  titleVariant?: 'sm' | 'lg';
  subline?: string;
  subtitleVariant?: SubtitleProps['variant'];
  ctaLabel?: string;
  ctaLink?: Reference;
  wrapperVariant?: WrapperVariant;
  clearDefaultWrapperStyles?: boolean;
  slidesPerView?: number;
}

export default function ProductSlider({
  products,
  title,
  subline,
  ctaLabel,
  ctaLink,
  titleVariant = 'lg',
  subtitleVariant = 'lg',
  wrapperVariant = 'left-padding-only',
  clearDefaultWrapperStyles = false,
  breakpoints = {},
  ...props
}: Props) {
  const { isTouchDevice } = useTouchDevice();

  const { trackClick } = useTrack();

  const titleClassName = useMemo(() => {
    return {
      sm: 'md:text-18 lg:text-22',
      lg: 'md:text-22 lg:text-28',
    }[titleVariant ?? 'lg'];
  }, [titleVariant]);

  return (
    <Wrapper background="neutral-200" variant={wrapperVariant} clearDefaultStyles={clearDefaultWrapperStyles}>
      <div>
        <Typography className={`mb-12 ${titleClassName}`} fontSize={20} as="h3" fontFamily="libre">
          {title}
        </Typography>
        {(subline || ctaLink) && (
          <div className="mt-8 flex items-center justify-between md:mt-16 lg:mt-14">
            {subline && <Subtitle subtitle={subline} variant={subtitleVariant} />}
            {ctaLink && (
              <div className="hidden lg:block">
                <Link target={ctaLink} withArrow>
                  <span className="font-medium leading-[24px] text-secondary-black">{ctaLabel}</span>
                </Link>
              </div>
            )}
          </div>
        )}
        {ctaLink && (
          <div className="mt-20 block md:mt-16 lg:hidden">
            <Link target={ctaLink} withArrow>
              <span className="font-medium leading-[24px] text-secondary-black">{ctaLabel}</span>
            </Link>
          </div>
        )}
      </div>
      <div className="mt-20 md:mt-24 lg:mt-20">
        <div className="relative mt-6 w-full">
          <Slider
            slidesPerView={isTouchDevice ? 2.3 : 1.3}
            slidesPerGroup={1}
            dots={false}
            arrows
            nextButtonStyles={{ transform: 'translateY(-250%) rotateZ(-45deg)' }}
            prevButtonStyles={{ transform: 'translateY(-250%) rotateZ(135deg)' }}
            allowTouchMove
            spaceBetween={8}
            breakpoints={{
              [tablet]: {
                slidesPerView: 2.3,
                spaceBetween: 25,
                ...(breakpoints[tablet] ?? {}),
              },
              [mediumDesktop]: {
                slidesPerView: 4,
                slidesPerGroup: 4,
                spaceBetween: 25,
                ...(breakpoints[mediumDesktop] ?? {}),
              },
            }}
            {...props}
          >
            {products.map((product, index) => (
              <Tile key={product.productId} product={product} onClick={() => trackClick(product, index + 1)} />
            ))}
          </Slider>
        </div>
      </div>
    </Wrapper>
  );
}
