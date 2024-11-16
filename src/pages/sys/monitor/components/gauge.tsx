import { Chart, ComponentOption } from '@/components';
import { useEffect, useRef, useState } from 'react';

const Index = (props: { percent: number | string; innerText: string }) => {
  const chartRef = useRef<any>();
  const [gaugeOption] = useState<ComponentOption>({
    series: [
      {
        type: 'gauge',
        startAngle: 90,
        endAngle: -270,
        progress: {
          show: true,
          width: 8,
        },
        axisLine: {
          lineStyle: {
            width: 8,
            color: [
              [1 / 90, '#5470C6'],
              [100, '#E0E0E0'],
            ],
          },
        },
        pointer: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        detail: {
          valueAnimation: true,
          formatter: '0%',
          color: '#606266',
          fontSize: 14,
          offsetCenter: [0, '-20%'],
        },
        data: [
          {
            value: 0,
            name: '',
          },
        ],
        title: {
          show: true,
          offsetCenter: [0, '20%'],
          fontSize: 12,
          color: '#606266',
        },
      },
    ],
  });

  useEffect(() => {
    const newOption = {
      series: {
        data: [{ value: props.percent, name: props.innerText }],
        detail: { formatter: props.percent + '%' },
      },
    };
    chartRef.current.setOption(newOption);
  }, [props]);

  return (
    <Chart
      option={gaugeOption}
      ref={chartRef}
      style={{ height: 160, width: 180 }}
    />
  );
};

export default Index;
