import {
  Avatar,
  Button,
  Chip,
  IconButton,
  InputAdornment,
  Link,
  OutlinedInput,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  useTheme,
} from '@material-ui/core';
import { TablePaginationActionsProps } from '@material-ui/core/TablePagination/TablePaginationActions';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { isEmpty } from 'lodash';
import moment from 'moment';
import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { FiSearch } from 'react-icons/fi';
import styled from 'styled-components/macro';
import { getRepositories } from '../api/github';
import { useRepositories } from '../context/providers/RepositoriesProvider';
import { PRIMARY_COLOR, PRIMARY_COLOR_PALLETE } from '../utils/constants';

const Home = () => {
  const { t } = useTranslation();
  const {
    searchResult,
    searchParams,
    tableParams,
    setSearchResult,
    setSearchParams,
  } = useRepositories();

  const onSubmitSearch = () => {
    const { query, queryBy, sortBy, orderBy } = searchParams;
    const { page, rowsPerPage } = tableParams;

    getRepositories({
      query,
      queryBy,
      sortBy,
      orderBy,
      page,
      limit: rowsPerPage,
    })
      .then((repositories) => {
        console.log('repositories => ', repositories);
        if (repositories && repositories.items) {
          setSearchResult({
            count: repositories.total_count,
            repositories: repositories.items,
          });
        }
      })
      .catch((e) => console.log('ERRO', e));
  };

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({
      ...searchParams,
      query: e.target.value,
    });
  };

  return (
    <div>
      <Helmet>
        <title>{t('HOME__TITLE')}</title>
      </Helmet>
      <ScSearch>
        <ScSearchInput
          onChange={onChangeSearchInput}
          placeholder={t(`Type the repository's name to search`)}
          startAdornment={
            <InputAdornment position="start" disablePointerEvents>
              <FiSearch />
            </InputAdornment>
          }
        />
        <ScSearchBtn onClick={onSubmitSearch}>{t('SEARCH__SUBMIT')}</ScSearchBtn>
      </ScSearch>
      {!isEmpty(searchResult.repositories) && (
        <ScResults>
          <RepositoriesTable />
        </ScResults>
      )}
    </div>
  );
};

const RepositoriesTable = () => {
  const { t } = useTranslation();
  const { searchResult, tableParams, setTableParams } = useRepositories();

  const emptyRows: number = useMemo(() => {
    const { page, rowsPerPage } = tableParams;
    return rowsPerPage - Math.min(rowsPerPage, searchResult.count - page * rowsPerPage);
  }, [searchResult.count, tableParams]);

  const onChangePage = (event: any, newPage: number) => {
    setTableParams({ ...tableParams, page: newPage });
  };

  const onChangeRowsPerPage = (event: any) => {
    setTableParams({
      page: 0,
      rowsPerPage: parseInt(event.target.value, 10),
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('Repository Name')}</TableCell>
            <TableCell>{t('Language')}</TableCell>
            <TableCell>{t('Owner')}</TableCell>
            <TableCell>{t('Created At')}</TableCell>
            <TableCell align="right">{t('Stars')}</TableCell>
            <TableCell align="right">{t('Forks')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {searchResult.repositories.map((repository) => {
            return (
              <TableRow key={repository.id}>
                <TableCell>
                  <Link href={repository.url} target="_blank" rel="noopener">
                    {repository.full_name}
                  </Link>
                </TableCell>
                <TableCell>
                  {repository.language && <Chip label={repository.language} variant="outlined" />}
                </TableCell>
                <TableCell>
                  <Link target="_blank" rel="noopener noreferrer" href={repository.owner.url}>
                    <Avatar src={repository.owner.avatar_url} alt="Repository Owner Avatar" />
                  </Link>
                </TableCell>
                <TableCell>{moment(repository.created_at).toDate().toLocaleString()}</TableCell>
                <TableCell align="right">{repository.stargazers_count || 0}</TableCell>
                <TableCell align="right">{repository.forks || 0}</TableCell>
              </TableRow>
            );
          })}
          {emptyRows > 0 && (
            <TableRow style={{ height: 68 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              colSpan={6}
              count={searchResult.count}
              rowsPerPage={tableParams.rowsPerPage}
              page={tableParams.page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              rowsPerPageOptions={[]}
              onChangePage={onChangePage}
              onChangeRowsPerPage={onChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

const TablePaginationActions = (props: TablePaginationActionsProps) => {
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <ScTablePaginationActions>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0}>
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0}>
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </ScTablePaginationActions>
  );
};

const ScSearch = styled(Paper)`
  display: flex;
  background-color: white;
  padding: 20px;
  vertical-align: middle;
`;

const ScSearchBtn = styled(Button)`
  background-color: ${PRIMARY_COLOR_PALLETE[1]};
  color: white;
  margin-left: 10px;
  padding: 10px;
  :hover {
    background-color: ${PRIMARY_COLOR};
  }
`;

const ScResults = styled.div`
  margin-top: 10px;
  width: 100%;
`;

const ScSearchInput = styled(OutlinedInput)`
  width: 40%;
  height: 44px;
`;

const ScTablePaginationActions = styled.div`
  flex-shrink: 0;
`;

export default Home;
