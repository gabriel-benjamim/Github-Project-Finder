import { createMuiTheme, MuiThemeProvider, StylesProvider } from '@material-ui/core';
import React, { ReactNode, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from '../components/ErrorBoundary';
import { Loading } from '../components/Loading';
import { PRIMARY_COLOR, PRIMARY_COLOR_PALLETE } from '../utils/constants';
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
            borderColor: PRIMARY_COLOR_PALLETE[4],
          },
          '&:hover $notchedOutline': {
            borderColor: PRIMARY_COLOR_PALLETE[3],
          },
          '&$focused $notchedOutline': {
            borderColor: PRIMARY_COLOR_PALLETE[2],
          },
          color: PRIMARY_COLOR_PALLETE[2],
        },
        notchedOutline: {},
      },
      MuiCircularProgress: {
        colorPrimary: {
          color: PRIMARY_COLOR,
        },
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
  return (
    <Suspense fallback={<Loading />}>
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
