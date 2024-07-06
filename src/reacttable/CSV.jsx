import { Button } from '@mui/material';
import React from 'react';

const CSV = ({ handleDownloadCsv }) => (
  <Button
    variant='outlined'
    type='button'
    onClick={handleDownloadCsv}
    sx={{ marginBottom: '30px' }}
  >
    Download as CSV
  </Button>
);

export default CSV;
