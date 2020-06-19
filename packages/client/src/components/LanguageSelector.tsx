import React from 'react';
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { LANGUAGE_OPTIONS } from '../context/i18n';

enum LanguageFlag {
  en = 'GB',
  pt = 'PT',
}

type Flag = keyof typeof LanguageFlag;

const ScLanguageSelector = styled(ReactFlagsSelect)`
  color: black;
  .country-flag > img {
    top: 0 !important;
  }
`;

const LanguageSelector = ({
  align = 'left',
  className,
}: {
  align?: string;
  className?: string;
}) => {
  const { i18n, t } = useTranslation();

  const onSelect = (country: string) => {
    const getLanguageByCountry = Object.keys(LanguageFlag).find(
      (key) => LanguageFlag[key as Flag] === country
    );

    i18n.changeLanguage(getLanguageByCountry!);
  };

  const languages = LANGUAGE_OPTIONS.map((language) => LanguageFlag[language.value as Flag]);
  const labels = LANGUAGE_OPTIONS.reduce((languagesMap, lang) => {
    (languagesMap as any)[LanguageFlag[lang.value as Flag]] = lang.label;
    return languagesMap;
  }, {});

  return (
    <ScLanguageSelector
      className={className}
      defaultCountry={LanguageFlag[i18n.language as Flag]}
      onSelect={onSelect}
      countries={languages}
      customLabels={labels}
      placeholder={t('LANGUAGE_SELECT_PLACEHOLDER')}
      showSelectedLabel={false}
      alignOptions={align}
    />
  );
};

export default LanguageSelector;
