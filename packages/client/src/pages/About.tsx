import { Paper } from '@material-ui/core';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';

const About = () => {
  const { t } = useTranslation();

  return (
    <ScAbout>
      <Helmet>
        <title>{t('PAGES_ABOUT__TITLE')}</title>
      </Helmet>
      <h1>{t('PAGES_ABOUT__TITLE')}</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Vitae ultricies leo integer malesuada nunc vel. Pulvinar
        pellentesque habitant morbi tristique senectus et netus. Enim praesent elementum facilisis
        leo vel fringilla. Lorem mollis aliquam ut porttitor leo a diam sollicitudin. Tortor id
        aliquet lectus proin nibh nisl. Sollicitudin tempor id eu nisl nunc mi ipsum faucibus.
        Pharetra sit amet aliquam id diam maecenas. Ac turpis egestas maecenas pharetra convallis
        posuere.
      </p>
      <p>
        At consectetur lorem donec massa sapien faucibus et molestie ac. Massa placerat duis
        ultricies lacus sed turpis tincidunt id. Senectus et netus et malesuada fames ac. Aliquam
        sem fringilla ut morbi tincidunt augue interdum velit euismod. Nisl vel pretium lectus quam
        id leo in vitae turpis.
      </p>
      <p>
        Id leo in vitae turpis massa. Ultrices in iaculis nunc sed augue. Vel pretium lectus quam id
        leo in.
      </p>
    </ScAbout>
  );
};

const ScAbout = styled(Paper)`
  padding: 30px;
`;

export default About;
