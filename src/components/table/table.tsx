import {
  PaginationProps,
  Table as AntTable,
  TablePaginationConfig,
  TableProps,
} from 'antd';
import {
  ExpandableConfig,
  GetRowKey,
  TableRowSelection,
} from 'antd/es/table/interface';
import React from 'react';

interface Props {
  header?: React.ReactElement | undefined;
  data: any[] | undefined;
  columns: TableProps['columns'];
  loading: boolean;
  total?: number | undefined;
  rowSelection?: TableRowSelection<any> | undefined;
  current?: number | undefined;
  onChange?: (page: number, pageSize: number) => void;
  rowKey: string | number | symbol | GetRowKey<any> | undefined;
  bordered?: boolean | undefined;
  pagination?: boolean;
  expandable?: ExpandableConfig<any> | undefined;
}

export default function Table({
  header,
  data,
  columns,
  loading,
  total,
  rowSelection,
  current,
  onChange,
  rowKey,
  bordered,
  pagination = true,
  expandable,
}: Props) {
  const showTotal: PaginationProps['showTotal'] = () => `共 ${total} 条数据`;
  const paginationConfig: TablePaginationConfig = {
    position: ['bottomRight'],
    size: 'small',
    showQuickJumper: true,
    showTotal: showTotal,
    total: total,
    current: current,
    onChange: onChange,
    pageSizeOptions: ['10', '20', '50', '100'],
    defaultPageSize: 10,
    showSizeChanger: true,
  };
  return (
    <>
      <div style={{ paddingBottom: 15 }}>{header}</div>
      <AntTable
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        size="small"
        loading={loading}
        bordered={bordered}
        scroll={{ y: 560, x: true, scrollToFirstRowOnChange: true }}
        pagination={pagination && paginationConfig}
        rowKey={rowKey}
        expandable={expandable}
      />
    </>
  );
}
