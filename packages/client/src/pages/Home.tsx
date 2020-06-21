import {
  Button,
  CircularProgress,
  InputAdornment,
  InputBase,
  NativeSelect,
  OutlinedInput,
  Paper,
} from '@material-ui/core';
import toast from 'cogo-toast';
import { get, has, isEmpty } from 'lodash';
import React, { useLayoutEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { FiSearch } from 'react-icons/fi';
import styled from 'styled-components/macro';
import RepositoriesTable from '../components/repositories/RepositoriesTable';
import {
  defaultSearchFilter,
  StatusType,
  useRepositories,
} from '../context/providers/RepositoriesProvider';
import { BREAKPOINTS, PRIMARY_COLOR, PRIMARY_COLOR_PALLETE, QueryBy } from '../utils/constants';

const Home = () => {
  const { t } = useTranslation();
  const searchInputRef = useRef();
  const { searchResult, searchFilter, status, setSearchFilter } = useRepositories();

  const onSearchSubmit = () => {
    const query: string = get(searchInputRef, 'current.value', '');
    if (query) {
      setSearchFilter({
        ...defaultSearchFilter,
        queryBy: searchFilter.queryBy,
        query,
      });
    }
  };

  const onChangeQueryBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchFilter({
      ...searchFilter,
      queryBy: e.target.value as QueryBy,
    });

    if (has(searchInputRef, 'current.value')) {
      (searchInputRef.current as any).value = '';
    }
  };

  useLayoutEffect(() => {
    if (status === StatusType.error) {
      toast.error(
        <div>
          <strong>{t('ERROR_BOUNDARY__TITLE')}</strong>
          <p>{t('ERROR_BOUNDARY__TEXT')}</p>
        </div>
      );
    }
  }, [status, t]);

  const queryByOptions = [
    { value: QueryBy.name, label: t('REPOSITORIES__QUERY_BY_NAME') },
    { value: QueryBy.description, label: t('REPOSITORIES__QUERY_BY_DESCRIPTION') },
    { value: QueryBy.user, label: t('REPOSITORIES__QUERY_BY_OWNER') },
  ];

  return (
    <div>
      <Helmet>
        <title>{t('PAGES_HOME__TITLE')}</title>
      </Helmet>
      <ScSearch>
        <ScNativeSelect
          value={searchFilter.queryBy}
          onChange={onChangeQueryBy}
          input={<InputBase />}
        >
          {queryByOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </ScNativeSelect>
        <ScSearchInput
          inputRef={searchInputRef}
          placeholder={t('REPOSITORIES__SEARCH_INPUT_PLACEHOLDER')}
          onKeyPress={(event) => {
            if (event.charCode === 13 && status !== StatusType.loading) {
              event.preventDefault();
              onSearchSubmit();
            }
          }}
          startAdornment={
            <InputAdornment position="start" disablePointerEvents>
              <FiSearch />
            </InputAdornment>
          }
        />
        <ScSearchBtn disabled={status === StatusType.loading} onClick={onSearchSubmit}>
          {status === StatusType.loading ? (
            <ScCircularProgress />
          ) : (
            t('REPOSITORIES__BUTTON_LABEL_SUBMIT')
          )}
        </ScSearchBtn>
      </ScSearch>
      {!isEmpty(searchResult.repositories) && (
        <ScResults>
          <RepositoriesTable />
        </ScResults>
      )}

      {status === StatusType.success && !searchResult.count && (
        <ScNoResults>
          <p>{t('REPOSITORIES__NO_RESULTS')}</p>
        </ScNoResults>
      )}
    </div>
  );
};

const ScSearch = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-row-gap: 5px;
  padding: 10px 0;
  @media screen and (min-width: ${BREAKPOINTS.md}px) {
    margin-bottom: 1.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
`;

const ScSearchInput = styled(OutlinedInput)`
  width: 100%;
  height: 44px;
  background-color: white;
  @media screen and (min-width: ${BREAKPOINTS.md}px) {
    width: 40%;
  }
`;

const ScSearchBtn = styled(Button)<{ disabled: boolean }>`
  background-color: ${(props) =>
    props.disabled ? PRIMARY_COLOR_PALLETE[2] : PRIMARY_COLOR_PALLETE[1]};
  color: white;
  padding: 10px;
  height: 44px;
  margin: 0;
  :hover {
    background-color: ${PRIMARY_COLOR};
  }
  @media screen and (min-width: ${BREAKPOINTS.md}px) {
    margin-left: 10px;
  }
`;

const ScCircularProgress = styled(CircularProgress)`
  width: auto;
  height: 100%;
  color: white !important;
`;

const ScResults = styled.div`
  margin-top: 10px;
  width: 100%;
`;

const ScNoResults = styled(Paper)`
  margin-top: 10px;
  padding: 30px;

  p {
    font-size: 1.5rem;
    color: ${PRIMARY_COLOR_PALLETE[1]};
  }
`;

const ScNativeSelect = styled(NativeSelect)`
  height: 44px;
  select {
    padding: 10px;
    color: ${PRIMARY_COLOR_PALLETE[PRIMARY_COLOR_PALLETE.length - 1]};
  }
  svg {
    fill: ${PRIMARY_COLOR_PALLETE[PRIMARY_COLOR_PALLETE.length - 1]};
    margin-right: 5px;
  }
  background-color: ${PRIMARY_COLOR_PALLETE[2]};
`;

export default Home;
