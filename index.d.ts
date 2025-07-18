declare module 'mui-datatables-ardit' {
  import * as React from 'react';

  export interface MUIDataTableColumn {
    name: string;
    label?: string;
    options?: {
      display?: boolean | 'excluded';
      filter?: boolean;
      sort?: boolean;
      sortDirection?: 'asc' | 'desc';
      customBodyRender?: (value: any, tableMeta: any, updateValue: any) => React.ReactNode;
    };
  }

  export interface MUIDataTableOptions {
    filter?: boolean;
    filterType?: 'dropdown' | 'checkbox' | 'multiselect' | 'textField' | 'custom';
    responsive?: 'stacked' | 'scrollMaxHeight' | 'scrollFullHeight' | 'standard';
    pagination?: boolean;
    selectableRows?: 'multiple' | 'single' | 'none';
    onTableChange?: (action: string, tableState: any) => void;
    onDownload?: (
      buildHead: (columns: any) => string,
      buildBody: (data: any) => string,
      columns: any,
      data: any
    ) => string | boolean;
    downloadOptions?: {
      filename?: string;
      separator?: string;
    };
    rowsPerPage?: number;
    rowsPerPageOptions?: number[];
    [key: string]: any;
  }

  interface MUIDataTableProps {
    title?: string | React.ReactNode;
    data: any[] | (() => any[]);
    columns: MUIDataTableColumn[] | string[];
    options?: MUIDataTableOptions;
  }

  const MUIDataTable: React.FC<MUIDataTableProps>;

  export default MUIDataTable;
}
