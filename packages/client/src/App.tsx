import React from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect, Route, Switch } from 'react-router';
import styled from 'styled-components/macro';
import Footer from './layouts/Footer';
import Header from './layouts/Header';
import About from './pages/About';
import Home from './pages/Home';

const App = () => {
  const { i18n } = useTranslation();

  return (
    <ScLayout>
      <Header />
      <ScContent>
        <Switch>
          <Route exact path="/:lng" component={Home} />
          <Route exact path="/:lng/about" component={About} />
          <Redirect from="*" to={`/${i18n.language}`} />
        </Switch>
      </ScContent>
      <Footer />
    </ScLayout>
  );
};

const ScLayout = styled.div`
  display: grid;
  height: 100%;
  grid-template-rows: auto 1fr auto;
`;

const ScContent = styled.div`
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

export default App;
