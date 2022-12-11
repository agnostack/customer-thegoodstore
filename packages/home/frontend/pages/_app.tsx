import React from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { appWithTranslation } from 'next-i18next';
import Toaster from 'components/commercetools-ui/atoms/toaster';
import { SDK } from 'sdk';
import { FrontasticProvider } from 'frontastic';
import 'tailwindcss/tailwind.css';
import '../styles/components/facet-dropdown.css';
import '../styles/app.css';

function FrontasticStarter({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();

  SDK.configure(locale);

  return (
    <FrontasticProvider>
      <Component {...pageProps} />
      <Toaster />
    </FrontasticProvider>
  );
}

export default appWithTranslation(FrontasticStarter);
