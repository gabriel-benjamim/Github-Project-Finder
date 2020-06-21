import { AppBar, Toolbar } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaGithub } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import LanguageSelector from '../components/LanguageSelector';
import { PRIMARY_COLOR_PALLETE } from '../utils/constants';

const Header = () => {
  const { i18n } = useTranslation();
  const history = useHistory();

  return (
    <ScAppBar position="static">
      <ScToolbar onClick={() => history.push(`/${i18n.language}`)}>
        <ScGithubIcon />
        <ScTitle>Github Project Finder</ScTitle>
      </ScToolbar>
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

const ScToolbar = styled(Toolbar)`
  cursor: pointer;
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
