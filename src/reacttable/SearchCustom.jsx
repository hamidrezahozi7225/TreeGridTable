import {
  Box,
  Button,
  Fade,
  MenuItem,
  Paper,
  Popper,
  TextField,
} from '@mui/material';
import React from 'react';
import closeImage from '../assets/icons8-close.svg';
import dropDownImage from '../assets/down-arrow-svgrepo-com.svg';

const SearchCustom = ({ list, setList, searchHandler }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();

  const currencies = [
    {
      value: 'AND',
      label: 'And',
    },
    {
      value: 'OR',
      label: 'Or',
    },
    {
      value: 'NOT AND',
      label: 'Not And',
    },
    {
      value: 'NOT OR',
      label: 'Not Or',
    },
  ];

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
  const addSarchHandler = () => {
    setList((list) => ({
      ...list,
      Search: [
        ...list.Search,
        {
          column: 'NAME',
          type: 'Contains',
          value: '',
          group: '',
        },
      ],
    }));
  };

  const searchChangeHAndler = (e, value) => {
    list.Search[value][e.target.name] = e.target.value;
    const newList = list.Search;
    setList((list) => ({ ...list, Search: newList }));

    console.log('list', list);
  };

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const removeHandler = (index) => {
    setOpen(false);
    console.log('liii', list.Search);
    const newList = list.Search;
    newList.splice(index, 1);

    setList((list) => ({ ...list, Search: newList }));
    setTimeout(() => setOpen(true), 500);
  };
  return (
    <>
      <Box>
        <Button
          onClick={handleClick('bottom-end')}
          sx={{
            backgroundColor: 'inherit',
            height: '33px',
            marginX: '5px',
            border: '1px solid gray',
            minWidth: '40px',
          }}
        >
          <img src={dropDownImage} width='20px' />
        </Button>
        <TextField id='outlined-basic' size='small' variant='outlined' />
      </Box>
      <Popper
        // Note: The following zIndex style is specifically for documentation purposes and may not be necessary in your application.
        sx={{ zIndex: 1200 }}
        open={open}
        anchorEl={anchorEl}
        placement={placement}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper sx={{ padding: '5px 10px' }}>
              <Box
                sx={{
                  margin: '10px',
                  width: 'max-content',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {list.Search.map((item, index) => (
                  <>
                    <Box
                      sx={{
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'center',
                        margin: '10px',
                      }}
                    >
                      <TextField
                        id='outlined-select-currency'
                        select
                        defaultValue={item.column}
                        // value={item.column}
                        onChange={(e) => searchChangeHAndler(e, index)}
                        name='column'
                      >
                        <MenuItem value='NAME'>NAME</MenuItem>
                        {list.colCustom.map((col) => (
                          <MenuItem key={col.id} value={col.fieldType}>
                            {col.fieldType}
                          </MenuItem>
                        ))}
                      </TextField>

                      <TextField
                        id='outlined-select-currency'
                        select
                        defaultValue={item.type}
                        // value={item.type}
                        onChange={(e) => searchChangeHAndler(e, index)}
                        name='type'
                      >
                        {types.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>

                      <TextField
                        id='standard-basic'
                        onChange={(e) => searchChangeHAndler(e, index)}
                        size='small'
                        variant='filled'
                        defaultValue={item.value}
                        value={item.value}
                        name='value'
                      />
                      <TextField
                        id='outlined-select-currency'
                        select
                        sx={{ width: 'max-content' }}
                        onChange={(e) => searchChangeHAndler(e, index)}
                        defaultValue={item.group}
                        // value={item.group}
                        name='group'
                      >
                        {currencies.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                      <img
                        src={closeImage}
                        style={{ cursor: 'pointer' }}
                        onClick={() => removeHandler(index)}
                        width='20px'
                      />
                    </Box>
                  </>
                ))}
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant='contained' onClick={addSarchHandler}>
                  +
                </Button>
                <Box>
                  <Button
                    variant='contained'
                    onClick={() => setOpen(false)}
                    sx={{
                      backgroundColor: 'red',
                      marginX: '5px',
                      '&:hover': {
                        backgroundColor: 'darkred',
                      },
                    }}
                  >
                    close
                  </Button>
                  <Button variant='contained' onClick={searchHandler}>
                    search
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default SearchCustom;
