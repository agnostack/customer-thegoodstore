import React, { createElement, Fragment, ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useClassNames from 'helpers/hooks/useClassNames';
import { useFormat } from 'helpers/hooks/useFormat';
import { TypographyProps } from './types';

const Typography: React.FC<TypographyProps> = ({
  medium,
  children,
  underline,
  className,
  translation,
  as = 'p',
  fontSize = 16,
  align = 'left',
  fontFamily = 'inter',
  lineHeight = 'normal',
  ...props
}) => {
  const router = useRouter();
  const { formatMessage } = useFormat({ name: translation?.file });
  const [text, setText] = useState<TypographyProps['children']>(children);

  useEffect(() => {
    // Check if the children has different locales
    if (typeof children !== 'string') {
      // Update text based on locale
      const locale = router?.locale || router?.defaultLocale;
      setText(children[locale]);
    }

    // Check if there is translation
    if (translation) {
      const content = formatMessage({ id: translation.id, defaultMessage: children });
      setText(content);
    }
  }, [children, formatMessage, router?.defaultLocale, router?.locale, translation]);

  const fontFamiliesRef = {
    inter: 'body',
    libre: 'heading',
  };

  // Constructing classnames of the element
  const elementClassName = useClassNames([
    { underline },
    `text-${align}`,
    `text-${fontSize}`,
    `text-${fontSize}`,
    `leading-${lineHeight}`,
    { 'font-medium': medium },
    `font-${fontFamiliesRef[fontFamily]}`,
    className,
  ]);

  // Constructing default props of the element
  const elementProps: ReactElement['props'] = {
    className: elementClassName,
    ...props,
  };

  const TypographyElement = createElement(as == 'fragment' ? Fragment : as, elementProps, text);

  return TypographyElement;
};

export default Typography;
