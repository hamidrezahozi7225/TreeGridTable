import { Box } from '@mui/material';
import { HeaderCellSort } from '@table-library/react-table-library/sort';
import React from 'react';

const ColumnTable = ({ item, hiddenColumns }) => {
  return (
    <>
      <HeaderCellSort
        hide={hiddenColumns.includes(item.fieldType)}
        sortKey='TASK'
      >
        <Box display='flex' flexDirection='column'>
          {item.fieldName}
        </Box>
      </HeaderCellSort>
    </>
  );
};

export default ColumnTable;
