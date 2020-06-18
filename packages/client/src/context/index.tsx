// import { UrlQueryProvider } from '@hypercharge/digitaldealer-commons/lib/providers/router/UrlQueryProvider';
// import { SearchParamsProvider } from '@hypercharge/digitaldealer-commons/lib/providers/search/SearchParamsProvider';
import React, { ReactNode, Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from '../components/ErrorBoundary';
import './i18n'; // import i18n just so that it gets bundled

export const AppProviders = ({ children }: { children: ReactNode }) => {
  //TODO: ADD LOADING AS FALLBACK
  return (
    <Suspense fallback={<div />}>
      <Helmet titleTemplate="Github Project Finder"></Helmet>

      <ErrorBoundary>
        <BrowserRouter>{children}</BrowserRouter>
      </ErrorBoundary>
    </Suspense>
  );
};
