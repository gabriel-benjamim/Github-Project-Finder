import { CircularProgress } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components/macro';
import { PRIMARY_COLOR } from '../utils/constants';

const ScWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ScLoader = styled(CircularProgress)`
  color: ${PRIMARY_COLOR};
`;

export const Loading = ({ className }: { className?: string }) => {
  return (
    <ScWrapper className={className}>
      <ScLoader />
    </ScWrapper>
  );
};
