import React from 'react';
import { Route, Switch } from 'react-router';
import styled from 'styled-components/macro';
import { AppProviders } from './context';
import Footer from './layouts/Footer';
import Header from './layouts/Header';
import Home from './pages/Home';
import { SECONDARY_COLOR_PALLETE } from './utils/constants';

const App = () => {
  return (
    <AppProviders>
      <ScLayout>
        <Header />
        <ScContent>
          <Switch>
            <Route path="/" component={Home} />
          </Switch>
        </ScContent>
        <Footer />
      </ScLayout>
    </AppProviders>
  );
};

const ScLayout = styled.div`
  display: grid;
  height: 100%;
  grid-template-rows: auto 1fr auto;
  background-color: ${SECONDARY_COLOR_PALLETE[SECONDARY_COLOR_PALLETE.length - 1]};
`;

const ScContent = styled.div`
  padding: 10px;
  box-sizing: border-box;
  width: 1200px;
  margin: 0 auto;
`;

export default App;
