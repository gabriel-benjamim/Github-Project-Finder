import { AppBar, Toolbar } from '@material-ui/core';
import React from 'react';
import { FaGithub } from 'react-icons/fa';
import styled from 'styled-components/macro';
import LanguageSelector from '../components/LanguageSelector';
import { PRIMARY_COLOR_PALLETE } from '../utils/constants';

const Header = () => {
  return (
    <ScAppBar position="static">
      <Toolbar>
        <ScGithubIcon />
        <ScTitle>Github Project Finder</ScTitle>
      </Toolbar>
      <ScLanguageSelectorWrapper>
        <ScLanguageSelector />
      </ScLanguageSelectorWrapper>
    </ScAppBar>
  );
};

const ScAppBar = styled(AppBar)`
  display: grid;
  grid-template-columns: 1fr auto;
  background-color: ${PRIMARY_COLOR_PALLETE[1]};
  box-shadow: none;
`;

const ScTitle = styled.h1`
  font-size: 1.5rem;
`;

const ScGithubIcon = styled(FaGithub)`
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 8px;
`;

const ScLanguageSelectorWrapper = styled.div`
  padding: 10px;
`;

const ScLanguageSelector = styled(LanguageSelector)`
  .flag-select__btn {
    cursor: pointer;
    :after {
      border-top-color: white;
      border-bottom-color: white;
    }
  }
`;

export default Header;
