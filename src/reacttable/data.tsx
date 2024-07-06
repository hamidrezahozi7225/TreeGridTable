import { Cell } from '@table-library/react-table-library/table';
import React from 'react';

const DataRow = ({ item, hiddenColumns }) => {
  const rowData = [
    { name: 'FILE', data: item.name },
    { name: 'ORGANIZATION', data: item.organization.name },
    { name: 'ASSET_CLASS', data: item.id },
    { name: 'LOCATIONS', data: item.assetClass.name },
    { name: 'SYSTEMS', data: item.assetClass.id },
    { name: 'ASSET_NAME', data: item.assetClass.name },
  ];

  return (
    <>
      {rowData.map((itm) => (
        <Cell hide={hiddenColumns.includes(itm.name)}>{itm.data}</Cell>
      ))}
    </>
  );
};

export default DataRow;
