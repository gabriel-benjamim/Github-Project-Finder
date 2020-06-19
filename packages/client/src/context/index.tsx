import { createMuiTheme, MuiThemeProvider, StylesProvider } from '@material-ui/core';
import React, { ReactNode, Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from '../components/ErrorBoundary';
import { PRIMARY_COLOR, PRIMARY_COLOR_PALLETE, SECONDARY_COLOR_PALLETE } from '../utils/constants';
import './i18n'; // import i18n so that it gets bundled
import { RepositoriesProvider } from './providers/RepositoriesProvider';

const MuiWrapper = ({ children }: any) => {
  const globalTheme = createMuiTheme({
    overrides: {
      MuiOutlinedInput: {
        root: {
          '& $notchedOutline': {
            borderWidth: '1px',
            borderRadius: '0',
            borderColor: SECONDARY_COLOR_PALLETE[2],
          },
          '&:hover $notchedOutline': {
            borderColor: PRIMARY_COLOR,
          },
          '&$focused $notchedOutline': {
            borderColor: PRIMARY_COLOR_PALLETE[5],
          },
          color: SECONDARY_COLOR_PALLETE[0],
        },
        notchedOutline: {},
      },
    },
  });

  //The injectFirst prop is necessary in order to have styled-components working with Material UI without conflicts
  return (
    <MuiThemeProvider theme={globalTheme}>
      <StylesProvider injectFirst>{children}</StylesProvider>
    </MuiThemeProvider>
  );
};

export const AppProviders = ({ children }: { children: ReactNode }) => {
  //TODO: ADD LOADING AS FALLBACK
  return (
    <Suspense fallback={<div />}>
      <Helmet titleTemplate="Github Project Finder"></Helmet>
      <MuiWrapper>
        <ErrorBoundary>
          <BrowserRouter>
            <RepositoriesProvider>{children}</RepositoriesProvider>
          </BrowserRouter>
        </ErrorBoundary>
      </MuiWrapper>
    </Suspense>
  );
};
