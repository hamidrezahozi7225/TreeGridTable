const downloadAsCsv = (columns, data, filename) => {
  const csvData = makeCsvData(columns, data);
  const csvFile = new Blob([csvData], { type: 'text/csv' });
  const downloadLink = document.createElement('a');

  downloadLink.display = 'none';
  downloadLink.download = filename;
  downloadLink.href = window.URL.createObjectURL(csvFile);
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};

const makeCsvData = (columns, data) => {
  return data.reduce((csvString, rowItem) => {
    return (
      csvString +
      columns
        .map(({ accessor }) => escapeCsvCell(accessor(rowItem)))
        .join(',') +
      '\r\n'
    );
  }, columns.map(({ name }) => escapeCsvCell(name)).join(',') + '\r\n');
};
const escapeCsvCell = (cell) => {
  if (cell == null) {
    return '';
  }
  const sc = cell.toString().trim();
  if (sc === '' || sc === '""') {
    return sc;
  }
  if (
    sc.includes('"') ||
    sc.includes(',') ||
    sc.includes('\n') ||
    sc.includes('\r')
  ) {
    return '"' + sc.replace(/"/g, '""') + '"';
  }
  return sc;
};

function onSortChange(action, state) {
  console.log('help', action, state);
}

const handleRowClick = (item, e) => {
  e.stopPropagation();
  if (
    e.target.id == 'svg-icon-chevron-single-down' ||
    e.target.id == 'svg-icon-chevron-single-right'
  ) {
    console.log('collapse');
  } else {
    console.log('item', item, e.target);
    console.log('Row clicked');
  }
};

const getLastInDepth = (item) => {
  const data = (item?.nodes || []).reduce(
    (_, value) => getLastInDepth(value),
    item
  );
  return data;
};

export { downloadAsCsv, onSortChange, handleRowClick, getLastInDepth };
