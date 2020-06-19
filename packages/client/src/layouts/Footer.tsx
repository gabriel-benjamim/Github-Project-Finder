import React from 'react';
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

const Footer = () => <ScFooter>© {currentYear} Adentis</ScFooter>;

export default Footer;
