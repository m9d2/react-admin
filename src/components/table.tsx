import {
    PaginationProps,
    Table as AntTable,
    TablePaginationConfig,
    TableProps,
} from 'antd';
import { GetRowKey, TableRowSelection } from 'antd/es/table/interface';
import React from 'react';
import { ExpandableConfig } from 'antd/es/table/interface';

export default function Table(props: {
    title?: React.ReactElement | undefined;
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
}) {
    const showTotal: PaginationProps['showTotal'] = () =>
        `共 ${props.total} 条数据`;
    const paginationConfig: TablePaginationConfig = {
        position: ['bottomRight'],
        size: 'small',
        showQuickJumper: true,
        showTotal: showTotal,
        total: props.total,
        current: props.current,
        onChange: props.onChange,
        pageSizeOptions: ['10', '20', '50', '100'],
        defaultPageSize: 10,
        showSizeChanger: true,
    };
    return (
        <>
            <div style={{ paddingBottom: 15 }}>{props.title}</div>
            <AntTable
                rowSelection={props.rowSelection}
                columns={props.columns}
                dataSource={props.data}
                size="small"
                loading={props.loading}
                bordered={props.bordered}
                scroll={{ y: 560, x: true, scrollToFirstRowOnChange: true }}
                pagination={props.pagination && paginationConfig}
                rowKey={props.rowKey}
                expandable={props.expandable}
            />
        </>
    );
}
