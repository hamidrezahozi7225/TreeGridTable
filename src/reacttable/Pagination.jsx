import { Box, MenuItem, Pagination, TextField } from '@mui/material';
import React from 'react';

const PaginationTable = ({ total, pageSize, changeHandler }) => (
  <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
    <Box>
      <Pagination
        count={Math.ceil(total / pageSize)}
        onChange={(e, value) => changeHandler(e, value)}
        variant='outlined'
        shape='rounded'
      />
    </Box>
    <Box>
      <TextField
        value={pageSize}
        select
        onChange={(e) => changeHandler(e, 'page')}
      >
        <MenuItem value={10}>P / 10</MenuItem>
        <MenuItem value={20}>P / 20</MenuItem>
        <MenuItem value={30}>P / 30</MenuItem>
      </TextField>
    </Box>
  </Box>
);

export default PaginationTable;
