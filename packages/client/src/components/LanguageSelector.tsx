import React from 'react';
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { LANGUAGE_OPTIONS } from '../context/i18n';
import { FALLBACK_LANGUAGE } from '../utils/constants';

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
  const { i18n } = useTranslation();
  const history = useHistory();

  const getLocalizedUrl = (currentUrl: string, currentLanguage: string, newLanguage: string) => {
    const currentLangPath = `/${currentLanguage}`;

    if (currentUrl.indexOf(currentLangPath) !== -1) {
      return currentUrl.replace(currentLangPath, `/${newLanguage}`);
    } else {
      return currentUrl;
    }
  };

  const onSelect = async (country: string) => {
    //Get language by country
    const newLanguage =
      Object.keys(LanguageFlag).find((key) => LanguageFlag[key as Flag] === country) ||
      FALLBACK_LANGUAGE;

    if (newLanguage !== i18n.language) {
      const { pathname } = history.location;
      const newUrl = getLocalizedUrl(`${pathname}`, i18n.language, newLanguage);

      await i18n.changeLanguage(newLanguage);
      history.push(newUrl);
    }
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
      showSelectedLabel={false}
      alignOptions={align}
    />
  );
};

export default LanguageSelector;
