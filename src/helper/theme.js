const rtlTheme = {
  Table: ` 
      --data-table-library_grid-template-columns:  24px repeat(5, minmax(0, 1fr));
      margin: 16px 0px;
      border-radius:5px;
      direction:rtl;
      
    `,
  Header: `
      background-color: #CCCCCC;;
      padding: 100px 0;
      position:absolute;
      .th{
        background-color: #dddddd;
      }
      
      .css-1p8xf1s-HEADER_CELL_CONTAINER_STYLE-HeaderCell{
        text-align:right
      }
        .css-cz6xlx{
          color:#3F51B5;
          fill:#3F51B5;
          font-size: large;
          font-weight: bold;
        }
    `,
  Row: `
      padding:20px;
      #svg-icon-chevron-single-right{
       rotate:180deg
      }
     `,
};
const ltrTheme = {
  Table: `
      --data-table-library_grid-template-columns:  0px repeat(5, minmax(0, 1fr));
      margin: 16px 0px;
      border-radius:5px;
    `,
  Header: `
      background-color: #fafafa;
      padding: 100px 0;
      position:absolute;
      .th{
        background-color: #dddddd;
      }
      .css-cz6xlx{
          color:#3F51B5;
          fill:#3F51B5;
          font-size: large;
          font-weight: bold;
        }
    `,
  Row: `
      padding:20px
      
    `,
};

export { rtlTheme, ltrTheme };
