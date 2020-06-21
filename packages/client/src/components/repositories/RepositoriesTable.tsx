import {
  Avatar,
  Chip,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from '@material-ui/core';
import moment from 'moment';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import TablePaginationActions from '../../components/repositories/TablePaginationActions';
import { useRepositories } from '../../context/providers/RepositoriesProvider';
import { OrderBy, ROWS_PER_PAGE, SortBy } from '../../utils/constants';
import { Repository } from '../../utils/types';

const RepositoriesTable = ({ className }: { className?: string }) => {
  const { t } = useTranslation();
  const { searchResult, searchFilter, setSearchFilter } = useRepositories();

  const emptyRows: number = useMemo(() => {
    const { rowsPerPage } = searchFilter;
    return rowsPerPage - Math.min(rowsPerPage, searchResult.repositories.length);
  }, [searchFilter, searchResult.repositories.length]);

  const onChangePage = (e: any, newPage: number) => {
    setSearchFilter({ ...searchFilter, page: newPage });
  };

  const onChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFilter({
      ...searchFilter,
      page: 0,
      rowsPerPage: parseInt(e.target.value, 10),
    });
  };

  const onChangeSortBy = (sortBy: SortBy) => {
    setSearchFilter({
      ...searchFilter,
      orderBy: searchFilter.orderBy === OrderBy.asc ? OrderBy.desc : OrderBy.asc,
      sortBy,
    });
  };

  return (
    <TableContainer component={Paper} className={className}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('REPOSITORIES__HEADER_NAME')}</TableCell>
            <TableCell>{t('REPOSITORIES__HEADER_LANGUAGE')}</TableCell>
            <TableCell>{t('REPOSITORIES__HEADER_OWNER')}</TableCell>
            <TableCell>{t('REPOSITORIES__HEADER_CREATED_AT')}</TableCell>
            <TableCell align="right">
              {t('REPOSITORIES__HEADER_STARS')}
              <TableSortLabel
                onClick={() => onChangeSortBy(SortBy.stars)}
                active={searchFilter.sortBy === SortBy.stars}
                direction={searchFilter.orderBy}
              />
            </TableCell>
            <TableCell align="right">
              {t('REPOSITORIES__HEADER_FORKS')}
              <TableSortLabel
                onClick={() => onChangeSortBy(SortBy.forks)}
                active={searchFilter.sortBy === SortBy.forks}
                direction={searchFilter.orderBy}
              />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {searchResult.repositories.map((repository: Repository) => {
            return (
              <TableRow key={repository.id}>
                <TableCell>
                  <Link href={repository.url} target="_blank" rel="noopener">
                    {repository.name}
                  </Link>
                </TableCell>
                <TableCell>
                  {repository.language && <Chip label={repository.language} variant="outlined" />}
                </TableCell>
                <TableCell>
                  <Link target="_blank" rel="noopener noreferrer" href={repository.ownerUrl}>
                    <Avatar src={repository.ownerAvatarUrl} alt="Owner's Avatar" />
                  </Link>
                </TableCell>
                <TableCell>{moment(repository.createdAt).toDate().toLocaleString()}</TableCell>
                <TableCell align="right">{repository.stars || 0}</TableCell>
                <TableCell align="right">{repository.forks || 0}</TableCell>
              </TableRow>
            );
          })}
          {emptyRows > 0 && (
            <TableRow style={{ height: 40 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, ROWS_PER_PAGE, 25, 50, 100]}
              colSpan={6}
              count={searchResult.count}
              rowsPerPage={searchFilter.rowsPerPage}
              page={searchFilter.page}
              labelRowsPerPage={t('REPOSITORIES__PAGINATION_ROWS_PER_PAGE')}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
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

export default RepositoriesTable;
