import { Col, Row, Segmented, Space, Tag } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { Monitor } from '@/service';
import { Chart, ComponentOption } from '@/components';
import * as echarts from 'echarts/core';
import Gauge from '@/pages/sys/monitor/components/gauge.tsx';
import Card from '@/components/card';

const Index = () => {
  const [info, setInfo] = useState<any>({
    cpuUsage: 0,
    memoryUsage: 0,
    diskUsage: 0,
    cpuCores: 0,
    usedMemory: 0,
    totalMemory: 0,
    diskUsableSpace: 0,
    diskTotalSpace: 0,
    diskUsedSpace: 0,
    javaMaxMemory: 0,
    javaMemoryUsage: 0,
    javaUsedMemory: 0,
    javaTotalMemory: 0,
  });
  const chartRef = useRef<any>();
  const [network, setNetwork] = useState<any[]>();
  const [option] = useState<ComponentOption>({
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => {
        let result = `${params[0].axisValue}<br/>`;
        params.forEach((item: any) => {
          result += `${item.marker}${item.seriesName}: ${item.value} KB/s<br/>`;
        });
        return result;
      },
    },
    legend: {
      show: true,
      data: [{ name: '上行' }, { name: '下行' }],
      top: 0,
      right: 0,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: [],
    },
    yAxis: {
      type: 'value',
      name: '速度 (KB/s)',
    },
    series: [
      {
        name: '上行',
        type: 'line',
        stack: 'Total',
        data: [],
        color: 'rgba(0, 94, 235, .5)',
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(0, 94, 235, .5)',
            },
            {
              offset: 1,
              color: 'rgba(0, 94, 235, 0)',
            },
          ]),
        },
      },
      {
        name: '下行',
        type: 'line',
        stack: 'Total',
        data: [],
        color: 'rgba(27, 143, 60, .5)',
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(27, 143, 60, .5)',
            },
            {
              offset: 1,
              color: 'rgba(27, 143, 60, 0)',
            },
          ]),
        },
      },
    ],
    animation: true,
    animationDurationUpdate: 300,
    animationEasingUpdate: 'linear',
  });

  const infoData = [
    {
      label: '主机名称',
      value: info.hostname,
    },
    {
      label: '发行版本',
      value: info.osName + info.osVersion,
    },
    {
      label: '主机地址',
      value: info.ipAddress,
    },
    {
      label: 'CPU',
      value: info.cpuModel,
    },
    {
      label: 'Java版本',
      value: info.javaVersion,
    },
    {
      label: 'Java供应商',
      value: info.javaVendor,
    },
  ];

  const stateData = [
    {
      percent: (info.cpuUsage * 100).toFixed(2),
      innerText: 'CPU',
      outerText: info.cpuModel + ' / ' + info.cpuCores + '核',
    },
    {
      percent: (info.memoryUsage * 100).toFixed(2),
      innerText: '内存',
      outerText: info.usedMemory + ' MB / ' + info.totalMemory + ' MB',
    },
    {
      percent: (info.javaMemoryUsage * 100).toFixed(2),
      innerText: 'JVM',
      outerText: info.javaUsedMemory + ' MB / ' + info.javaTotalMemory + ' MB',
    },
    {
      percent: (info.diskUsage * 100).toFixed(2),
      innerText: '磁盘',
      outerText:
        info.diskUsedSpace + ' GB' + ' / ' + info.javaMaxMemory + ' GB',
    },
  ];

  useEffect(() => {
    const fetchInfo = async () => {
      const resp = await Monitor.info();
      if (resp.data) {
        setInfo(resp.data);
      }
    };

    const fetchNetwork = async () => {
      const resp = await Monitor.network('all');
      if (resp.data) {
        const newNetworkData = resp.data.queue;
        if (newNetworkData.length) {
          setNetwork(newNetworkData);
        }
      }
    };

    fetchInfo();
    fetchNetwork();
    const infoIntervalId = setInterval(fetchInfo, 3000);
    const networkIntervalId = setInterval(fetchNetwork, 3000);

    return () => {
      clearInterval(infoIntervalId);
      clearInterval(networkIntervalId);
    };
  }, []);

  useEffect(() => {
    const key: any[] = [];
    const upData: any[] = [];
    const downData: any[] = [];
    if (network) {
      for (const item of network) {
        key.push(item.time);
        upData.push(item.upFlow);
        downData.push(item.downFlow);
      }
    }
    const newOption = {
      xAxis: { data: key },
      series: [{ data: upData }, { data: downData }],
    };
    chartRef.current.setOption(newOption);
  }, [network]);

  const extra = (
    <>
      <Segmented options={['流量', '磁盘IO']} />
    </>
  );

  return (
    <Space direction="vertical" style={{ width: '100%', height: '100%' }}>
      <Row gutter={[15, 15]} wrap>
        <Col span={12}>
          <Card title="系统信息" style={{ height: 300 }}>
            <Space direction="vertical">
              {infoData.map((item: { label: string; value: string }) => {
                return (
                  <Space direction="horizontal">
                    <div style={{ width: 70 }}>{item.label}</div>
                    <div style={{ color: '#606266' }}>{item.value}</div>
                  </Space>
                );
              })}
            </Space>
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title="状态"
            style={{
              height: 300,
            }}
          >
            <Row align="middle" justify="space-between" style={{ height: 201 }}>
              {stateData.map((item) => {
                return (
                  <Col
                    span={6}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Gauge
                        percent={item.percent}
                        innerText={item.innerText}
                      />
                      <span style={{ color: '#606266' }}>{item.outerText}</span>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </Card>
        </Col>
      </Row>

      <Card title="监控" extra={extra}>
        <Tag color="processing">
          上行: {network && network[network?.length - 1].upFlow + ' KB/s'}
        </Tag>
        <Tag color="processing">
          下行: {network && network[network.length - 1].downFlow + ' KB/s'}
        </Tag>
        <Chart option={option} ref={chartRef} style={{ height: 420 }} />
      </Card>
    </Space>
  );
};

export default Index;
