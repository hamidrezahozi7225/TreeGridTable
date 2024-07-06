import { Cell } from '@table-library/react-table-library/table';

const FetchMoreRow = ({ item, handleLoadMore }) => (
  <>
    <Cell style={{ backgroundColor: 'snow' }} id={`btn${item.id}`}>
      <div
        style={{
          marginLeft: `${8 + item.treeXLevel * 20}px`,
        }}
      >
        <button
          style={{
            padding: '12px 20px',
            backgroundColor: 'black',
            color: 'white',
            border: 'none',
            borderRadius: '5px 20px 5px 20px',
            cursor: 'pointer',
          }}
          type='button'
          onClick={() => handleLoadMore(item)}
        >
          Load More {item.name}
        </button>
      </div>
    </Cell>
    <Cell style={{ backgroundColor: 'snow' }}></Cell>
    <Cell style={{ backgroundColor: 'snow' }}></Cell>
    <Cell style={{ backgroundColor: 'snow' }}></Cell>
    <Cell style={{ backgroundColor: 'snow' }}></Cell>
    <Cell style={{ backgroundColor: 'snow' }}></Cell>
  </>
);

export default FetchMoreRow;
