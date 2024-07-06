import {
  Box,
  Button,
  Fade,
  FormControlLabel,
  MenuItem,
  Paper,
  Popper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';

const types = [
  {
    value: 'Contains',
    label: 'Contains',
  },
  {
    value: 'Does not contain',
    label: 'Does not contain',
  },
  {
    value: 'Starts with',
    label: 'Starts with',
  },
  {
    value: 'Ends with',
    label: 'Ends with',
  },
  {
    value: 'Does not equal',
    label: 'Does not equal',
  },
];

const PoperTable = ({
  id,
  open,
  fieldType,
  anchorEl,
  placement,
  searchChangeHandler,
  search,
  closeHandler,
  searchHandler,
}) => {
  return (
    <Popper
      id={id}
      sx={{ zIndex: 1200, width: '300px' }}
      open={open[fieldType]}
      anchorEl={anchorEl}
      placement={placement}
      transition
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper sx={{ padding: '5px 10px' }}>
            <Box sx={{ padding: '10px' }} display='flex' flexDirection='column'>
              <Typography
                variant='h5'
                component='h2'
                sx={{ fontWeight: 'bolder' }}
              >
                {fieldType}
              </Typography>
              <TextField
                id='outlined-select-currency'
                select
                defaultValue={search[fieldType].type1}
                sx={{ margin: '10px 0' }}
                onChange={(e) => searchChangeHandler(e, fieldType)}
                name='type1'
              >
                {types.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                defaultValue={search[fieldType].value1}
                onChange={(e) => searchChangeHandler(e, fieldType)}
                sx={{ marginBottom: '10px' }}
                variant='filled'
                size='small'
                name='value1'
              />

              <RadioGroup
                aria-labelledby='demo-radio-buttons-group-label'
                defaultValue={search[fieldType].group}
                onChange={(e) => searchChangeHandler(e, fieldType)}
                name='group'
                sx={{ display: 'block', marginX: 'auto' }}
              >
                <FormControlLabel value='And' control={<Radio />} label='And' />
                <FormControlLabel value='Or' control={<Radio />} label='Or' />
              </RadioGroup>

              <TextField
                id='outlined-select-currency'
                select
                defaultValue={search[fieldType].type2}
                sx={{ margin: '10px 0' }}
                onChange={(e) => searchChangeHandler(e, fieldType)}
                name='type2'
              >
                {types.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                name='value2'
                defaultValue={search[fieldType].value2}
                onChange={(e) => searchChangeHandler(e, fieldType)}
                sx={{ marginBottom: '10px' }}
                variant='filled'
                size='small'
              />

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  variant='contained'
                  onClick={() => searchHandler(fieldType)}
                >
                  Search
                </Button>
                <Button
                  sx={{
                    backgroundColor: 'red',
                    '&:hover': {
                      backgroundColor: 'darkred',
                    },
                  }}
                  variant='contained'
                  onClick={() => closeHandler(fieldType)}
                >
                  Close
                </Button>
              </Box>
            </Box>
          </Paper>
        </Fade>
      )}
    </Popper>
  );
};

export default PoperTable;
