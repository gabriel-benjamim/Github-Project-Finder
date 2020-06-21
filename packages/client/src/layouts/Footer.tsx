import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PRIMARY_COLOR_PALLETE } from '../utils/constants';

const now = new Date();
const currentYear = now.getFullYear();

const ScFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 25px;
  background-color: ${PRIMARY_COLOR_PALLETE[1]};
  color: white;
`;

const ScMenuNavigation = styled.div`
  margin-left: auto;

  a:not(:last-child) {
    margin-right: 10px;
    :after {
      margin-left: 10px;
      content: '|';
    }
  }
`;

const ScLink = styled(Link)`
  color: white;
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`;

const Footer = () => {
  const { t, i18n } = useTranslation();

  return (
    <ScFooter>
      <div>© {currentYear} Adentis</div>
      <ScMenuNavigation>
        <ScLink to={`/${i18n.language}`}>{t('NAVIGATION__HOME')}</ScLink>
        <ScLink to={`/${i18n.language}/about`}>{t('NAVIGATION__ABOUT')}</ScLink>
      </ScMenuNavigation>
    </ScFooter>
  );
};

export default Footer;
