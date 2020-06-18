import { createMuiTheme, MuiThemeProvider, StylesProvider } from '@material-ui/core/styles';
import React from 'react';
import { Route, Switch } from 'react-router';
import { AppProviders } from './context';
import Home from './pages/Home';

const MuiWrapper = ({ children }: any) => {
  const globalTheme = createMuiTheme({
    overrides: {},
  });

  //The injectFirst prop is necessary in order to have styled-components working with Material UI without conflicts
  return (
    <MuiThemeProvider theme={globalTheme}>
      <StylesProvider injectFirst>{children}</StylesProvider>
    </MuiThemeProvider>
  );
};

const App: React.FC = () => {
  return (
    <MuiWrapper>
      <AppProviders>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </AppProviders>
    </MuiWrapper>
  );
};

export default App;
