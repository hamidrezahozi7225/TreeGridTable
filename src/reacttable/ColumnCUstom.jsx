import {
  Box,
  Checkbox,
  Dialog,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import React from 'react';
import MyImageSvg from '../assets/gear-svgrepo-com.svg';

const ColumnCustom = ({
  open,
  setOpen,
  hiddenColumns,
  toggleColumn,
  colCustom,
}) => (
  <Box sx={{ marginTop: '15px' }}>
    <img
      id='demo-multiple-checkbox-label'
      onClick={() => setOpen((list) => ({ ...list, open: true }))}
      width='20px'
      src={MyImageSvg}
      alt='mySvgImage'
    />
    <Dialog
      sx={{ width: '400px', heigth: '200px' }}
      onClose={() => setOpen((list) => ({ ...list, open: false }))}
      scroll='paper'
      open={open}
    >
      <FormGroup>
        <FormControlLabel
          sx={{
            margin: '8px 16px',
            padding: '8px',
            width: '85%',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
          }}
          control={
            <Checkbox
              checked={true}
              // onChange={() => toggleColumn('NAME')}
            />
          }
          label='Name'
        />
        {colCustom.map((col) => (
          <FormControlLabel
            sx={{
              margin: '8px 16px',
              width: '85%',
              padding: '8px',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
            control={
              <Checkbox
                checked={!hiddenColumns.includes(col.fieldType)}
                onChange={() => toggleColumn(col.fieldType)}
              />
            }
            label={col.fieldType}
          />
        ))}
      </FormGroup>
    </Dialog>
  </Box>
);

export default ColumnCustom;
