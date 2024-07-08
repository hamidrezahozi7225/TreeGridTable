import * as React from 'react';

import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  Cell,
  HeaderCell,
} from '@table-library/react-table-library/table';
import {
  useTree,
  CellTree,
  TreeExpandClickTypes,
} from '@table-library/react-table-library/tree';
import {
  findNodeById,
  recursiveMergeInsert,
} from '@table-library/react-table-library/common';
import { useTheme } from '@table-library/react-table-library/theme';
import {
  DEFAULT_OPTIONS,
  getTheme,
} from '@table-library/react-table-library/material-ui';
import { axiosInstance } from './axios/axiosInstance';
import {
  useSort,
  HeaderCellSort,
} from '@table-library/react-table-library/sort';
import PropTypes from 'prop-types';

import { useState } from 'react';
import ColumnTable from './reacttable/column';
import DataRow from './reacttable/data';
import {
  downloadAsCsv,
  getLastInDepth,
  handleRowClick,
  onSortChange,
} from './helper/helper';
import FetchMoreRow from './reacttable/FetchMoreRow';
import CSV from './reacttable/CSV';
import PaginationTable from './reacttable/Pagination';
import ColumnCustom from './reacttable/ColumnCUstom';
import { ltrTheme, rtlTheme } from './helper/theme';
import { Box, Button, MenuItem, TextField } from '@mui/material';
import SearchCustom from './reacttable/SearchCustom';
import ColumnSearch from './reacttable/columnSearch';
import PoperTable from './reacttable/PoperTable';
import filterImage from './assets/filter-svgrepo-com.svg';

const needsToFetch = (nodes, id) => {
  const item = findNodeById(nodes, id);

  return item && item.nodes && !item.nodes.length;
};
const insertTree = (targetId, nodes, pageInfo) => (state) => {
  if (!targetId) {
    return {
      pageInfo,
      nodes: [...nodes],
      id: 0,
    };
  }

  return {
    pageInfo: state.pageInfo,
    nodes: state.nodes.map(recursiveMergeInsert(targetId, nodes, { pageInfo })),
    id: 1,
  };
};

const ReactTable = ({ direction }) => {
  const [data, setData] = useState({
    nodes: [],
  });
  const [hiddenColumns, setHiddenColumns] = useState([]);
  const [loadMoreShow, setLoadMoreShow] = useState({});
  const [idsNested, setIdsNested] = useState([]);
  const [idsMore, setIdsMore] = useState([]);
  const [childPageNumber, setChildPageNumber] = useState({});
  const [search, setSearch] = useState({});
  const [open, setOpen] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [placement, setPlacement] = React.useState();
  const [list, setList] = useState({
    open: false,
    colCustom: [],
    pageSize: 20,
    pageNumber: 0,
    total: 1,
    Search: [
      {
        group: 'AND',
        column: 'NAME',
        type: 'Contains',
        value: '',
      },
    ],
  });

  const materialTheme = getTheme({
    ...DEFAULT_OPTIONS,
    highlightOnHover: true,
  });
  let customTheme;
  if (direction == 'rtl') {
    customTheme = rtlTheme;
  } else {
    customTheme = ltrTheme;
  }
  const theme = useTheme([materialTheme, customTheme]);

  const doGet = React.useCallback(async (params) => {
    const res = await axiosInstance.get(
      `http://185.79.156.67:4098/eam/api/asset/search-asset-level?pageNumber=${
        params && params.offset
          ? params.offset
          : params.pageNumber
          ? params.pageNumber
          : 0
      }&pageSize=${
        params && params.pageSize ? params.pageSize : 20
      }&assetSortType=&sortAscending=true&assetFieldId=&keyword=&trilogyType=ASSET&trilogyId=${
        params && params.id ? params.id : ''
      }`
    );
    if (!params.id) {
      const total = await res.data.totalCount;
      setList((list) => ({ ...list, total }));
    } else {
      setLoadMoreShow((loadMoreShow) => ({
        ...loadMoreShow,
        [params.id]: res.data.assets.length,
      }));
      setChildPageNumber((childPageNumber) => ({
        ...childPageNumber,
        [params.id]: 1,
      }));
    }
    let data = await res.data.assets;
    data.map((item) => {
      if (item.hasChild) {
        item.nodes = [];
      }
      return item;
    });
    if (params.offset) {
      data = data.map((item) => {
        item.id += params.offset;
        return item;
      });
    }
    setData(insertTree(params.id, data));
  }, []);

  React.useEffect(() => {
    setData({
      nodes: [],
    });

    const ColumnFetcher = async (language) => {
      const response = await axiosInstance.get(
        'http://185.79.156.67:4098/eam/api/assetField/get-all-assetFields'
      );
      let data = await response.data.slice(0, 6);
      data = data.map((item) => {
        if (item.fieldType == 'ORGANIZATION') {
          item.hiddenCol = true;
        }
        return item;
      });
      setList((list) => ({ ...list, colCustom: data }));
      const hide = data
        .filter((item) => item.hiddenCol)
        .map((itm) => itm.fieldType);
      setHiddenColumns((hiddenColumns) => [...hiddenColumns, ...hide]);
    };
    ColumnFetcher();
    doGet({
      isShallow: true,
    });
  }, []);

  const [loadingIds, setLoadingIds] = React.useState([]);

  const tree = useTree(
    data,
    {
      onChange: onTreeChange,
    },
    {
      clickType: TreeExpandClickTypes.ButtonClick,
      treeYLevel: 1,
    }
  );

  async function onTreeChange(action) {
    if (action.type !== 'ADD_BY_ID') return;
    if (!needsToFetch(data.nodes, action.payload.id)) return;

    const params = {
      offset: 0,
      limit: 2,
      id: action.payload.id,
      isShallow: true,
    };

    setLoadingIds(loadingIds.concat(action.payload.id));
    setIdsNested(idsNested.concat(action.payload.id));
    await doGet(params);
    setLoadingIds(loadingIds.filter((id) => id !== action.payload.id));
    setIdsNested(idsNested.filter((id) => id !== action.payload.id));
  }

  const handleLoadMore = async (item) => {
    console.log('loadmore data', loadMoreShow);
    setIdsMore(idsNested.concat(item.id));
    await doGet({
      offset: childPageNumber[item.id],
      limit: 5,
      id: item.id,
      isShallow: true,
    });
    const num1 = childPageNumber[item.id] + 1;
    setChildPageNumber((childPageNumber) => ({
      ...childPageNumber,
      [item.id]: num1,
    }));
    setIdsMore(idsNested.filter((id) => id !== item.id));
  };

  const handleDownloadCsv = () => {
    const columns = [
      { accessor: (item) => item.name, name: 'Name' },
      { accessor: (item) => item.assetClass.id, name: 'assetClass Id' },
      { accessor: (item) => item.organization.name, name: 'Organization NAme' },
      { accessor: (item) => item.description, name: 'Description' },
      { accessor: (item) => item.id, name: 'Id' },
    ];

    downloadAsCsv(columns, data.nodes, 'table');
  };

  const sort = useSort(
    data,
    {
      onChange: onSortChange,
    },
    {
      sortFns: {
        TASK: (array) => array.sort((a, b) => a.name.localeCompare(b.name)),
        DEADLINE: (array) => array.sort((a, b) => a.deadline - b.deadline),
        TYPE: (array) => array.sort((a, b) => a.type.localeCompare(b.type)),
        COMPLETE: (array) => array.sort((a, b) => a.isComplete - b.isComplete),
        TASKS: (array) =>
          array.sort((a, b) => (a.nodes || []).length - (b.nodes || []).length),
      },
    }
  );

  const toggleColumn = (column) => {
    if (hiddenColumns.includes(column)) {
      setHiddenColumns(hiddenColumns.filter((v) => v !== column));
    } else {
      setHiddenColumns(hiddenColumns.concat(column));
    }
  };

  const LoadingRow = ({ item }) => (
    <div
      style={{
        marginLeft: `${8 + item.treeXLevel * 20}px`,
      }}
    >
      Loading ...
    </div>
  );

  const changeHandler = async (e, value) => {
    if (value !== 'page') {
      setList((list) => ({ ...list, pageNumber: value - 1 }));
      const params = {
        pageNumber: value - 1,
        pageSize: list.pageSize,
      };
      await doGet(params);
    } else {
      setList((list) => ({ ...list, pageSize: e.target.value }));
      const params = {
        pageSize: e.target.value,
        pageNumber: list.pageNumber,
      };
      await doGet(params);
    }
  };

  const searchHandler = async () => {
    console.log('search', list.Search);
  };

  const clickHandler = (e, fieldType, place) => {
    setAnchorEl(e.currentTarget);
    setOpen(() => ({ [fieldType]: true }));
    setPlacement(place);
  };

  const searchChangeHandler = (e, fieldType, type) => {
    const { name, value } = e.target;
    let data = search[fieldType];
    data[name] = value;
    console.log('data', search);
    setSearch((search) => ({
      ...search,
      [fieldType]: data,
    }));
    if (type && type == 'search') {
      console.log('searchhhh');
    }
  };

  const closeHandler = (fieldType) => {
    setOpen(() => ({ [fieldType]: false }));
  };
  const id = 'simple-popper';

  return (
    <>
      <CSV handleDownloadCsv={handleDownloadCsv} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginX: '20px',
        }}
      >
        <PaginationTable
          total={list.total}
          pageSize={list.pageSize}
          changeHandler={changeHandler}
        />
        <SearchCustom
          searchHandler={searchHandler}
          list={list}
          setList={setList}
        />
      </Box>
      <ColumnCustom
        open={list.open}
        setOpen={setList}
        hiddenColumns={hiddenColumns}
        toggleColumn={toggleColumn}
        colCustom={list.colCustom}
      />

      <Table data={data} sort={sort} tree={tree} theme={theme}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCellSort
                  hide={hiddenColumns.includes('NAME')}
                  sortKey='TASK'
                >
                  Name
                </HeaderCellSort>
                {list.colCustom.map((item) => (
                  <ColumnTable item={item} hiddenColumns={hiddenColumns} />
                ))}
              </HeaderRow>
            </Header>
            <Header>
              <HeaderRow>
                <HeaderCell
                  hide={hiddenColumns.includes('NAME')}
                  sortKey='TASK'
                >
                  <Box
                    sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                  >
                    <TextField
                      defaultValue={
                        search && search['Name'] && search['Name'].value1
                      }
                      value={search && search['Name'] && search['Name'].value1}
                      onChange={(e) => searchChangeHandler(e, 'Name', 'search')}
                      sx={{ marginBottom: '10px', width: '150px' }}
                      variant='filled'
                      size='small'
                      name='value1'
                    />

                    <img
                      aria-describedby={id}
                      onClick={(e) => clickHandler(e, 'Name', 'bottom')}
                      src={filterImage}
                      style={{ cursor: 'pointer' }}
                      width='15px'
                    />
                  </Box>
                </HeaderCell>
                <PoperTable
                  id={id}
                  open={open}
                  fieldType={'Name'}
                  anchorEl={anchorEl}
                  placement={placement}
                  searchChangeHandler={searchChangeHandler}
                  search={search}
                  closeHandler={closeHandler}
                  searchHandler={searchHandler}
                />
                {list.colCustom.map((item) => (
                  <ColumnSearch
                    search={search}
                    setSearch={setSearch}
                    item={item}
                    hiddenColumns={hiddenColumns}
                    clickHandler={clickHandler}
                    open={open}
                    closeHandler={closeHandler}
                    searchChangeHandler={searchChangeHandler}
                    anchorEl={anchorEl}
                    placement={placement}
                  />
                ))}
              </HeaderRow>
            </Header>
            <Body>
              {tableList.map((item) => {
                const showLoading = loadingIds.includes(item.id);
                return (
                  <React.Fragment key={item.id}>
                    <Row
                      item={item}
                      style={{
                        width: '100%',
                      }}
                      onClick={(item, e) => handleRowClick(item, e)}
                    >
                      {/* <CellSelect item={item} /> */}

                      <Cell hide={true}></Cell>
                      <CellTree
                        hide={hiddenColumns.includes('NAME')}
                        item={item}
                      >
                        {item.name}
                      </CellTree>
                      <DataRow hiddenColumns={hiddenColumns} item={item} />
                    </Row>
                    {idsNested.includes(item.id) && <LoadingRow item={item} />}

                    {item.ancestors[item.ancestors.length - 1].id !== 0 &&
                      item.ancestors
                        .filter(
                          (ancestors) => item.id == getLastInDepth(ancestors).id
                        )
                        .map((ancestor) =>
                          idsMore.includes(ancestor.id) ? (
                            <LoadingRow
                              key={item.id + ancestor.id}
                              item={ancestor}
                            />
                          ) : (
                            ancestor.name && (
                              <FetchMoreRow
                                key={item.id + ancestor.id}
                                item={ancestor}
                                loadMoreShow={loadMoreShow}
                                handleLoadMore={handleLoadMore}
                              />
                            )
                          )
                        )}

                    {showLoading && (
                      <div
                        style={{
                          marginLeft: `${8 + item.treeXLevel * 20}px`,
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                        }}
                      >
                        Loaded .....
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </Body>
          </>
        )}
      </Table>
    </>
  );
};

ReactTable.propTypes = {
  direction: PropTypes.string,
};

export default ReactTable;
