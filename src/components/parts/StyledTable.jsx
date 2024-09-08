import React from 'react';
import { Table } from 'antd';
import styled from 'styled-components';

const StyledAntTable = styled(Table)`
  .ant-table-thead > tr > th {
    font-size: 15px;
    font-weight: 100;
    color: #888888;
  }
`;

const StyledTable = (props) => (
    <StyledAntTable {...props} />
);

export default StyledTable;