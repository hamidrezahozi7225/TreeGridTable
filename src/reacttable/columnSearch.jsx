import { Box, Button, TextField } from '@mui/material';
import { HeaderCell } from '@table-library/react-table-library';
import React, { useEffect } from 'react';
import PoperTable from './PoperTable';
import filterImage from '../assets/filter-svgrepo-com.svg';

const ColumnSearch = ({
  open,
  closeHandler,
  anchorEl,
  placement,
  item,
  hiddenColumns,
  search,
  setSearch,
  clickHandler,
  searchChangeHandler,
}) => {
  useEffect(() => {
    setSearch((search) => ({ ...search, Name: {}, [item.fieldType]: {} }));
  }, []);

  const searchHandler = () => {
    console.log('ddd', search);
  };
  const id = open[item.fieldType] ? 'simple-popper' : undefined;
  return (
    <>
      <HeaderCell hide={hiddenColumns.includes(item.fieldType)} sortKey='TASK'>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <TextField
            defaultValue={
              search && search[item.fieldType] && search[item.fieldType].value1
            }
            value={
              search && search[item.fieldType] && search[item.fieldType].value1
            }
            onChange={(e) => searchChangeHandler(e, item.fieldType, 'search')}
            sx={{ marginBottom: '10px', width: '150px' }}
            variant='filled'
            size='small'
            name='value1'
          />

          <img
            aria-describedby={id}
            onClick={(e) => clickHandler(e, item.fieldType, 'bottom')}
            src={filterImage}
            style={{ cursor: 'pointer' }}
            width='15px'
          />
        </Box>
      </HeaderCell>

      <PoperTable
        id={id}
        open={open}
        fieldType={item.fieldType}
        anchorEl={anchorEl}
        placement={placement}
        searchChangeHandler={searchChangeHandler}
        search={search}
        closeHandler={closeHandler}
        searchHandler={searchHandler}
      />
    </>
  );
};

export default ColumnSearch;
