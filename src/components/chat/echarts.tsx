import classNames from 'classnames';
import {
  BarSeriesOption,
  ComposeOption,
  DatasetComponentOption,
  GridComponentOption,
  LineSeriesOption,
  PieSeriesOption,
  TitleComponentOption,
  TooltipComponentOption,
} from 'echarts';
import { BarChart, LineChart, PieChart } from 'echarts/charts';
import {
  DatasetComponent,
  GridComponent,
  TitleComponent,
  TooltipComponent,
  TransformComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { CSSProperties, useEffect, useRef } from 'react';

export type ComponentOption = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | PieSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
>;

const charts = [BarChart, LineChart, PieChart];
const component = [
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
];

echarts.use([
  ...charts,
  ...component,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
]);

const Chart = ({
  option,
  style,
  className,
}: {
  option: ComponentOption;
  style?: CSSProperties;
  className?: string;
}) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = echarts.init(chartRef.current);
    chart.setOption(option);

    const resizeChart = () => {
      chart.resize();
    };

    const resizeObserver = new ResizeObserver(resizeChart);

    if (chartRef.current) {
      resizeObserver.observe(chartRef.current);
    }

    return () => {
      chart.dispose();
      resizeObserver.disconnect();
    };
  }, [option]);

  return (
    <div
      ref={chartRef}
      style={{ width: '100%', height: '100%', ...style }}
      className={classNames('charts-box', className)}
    ></div>
  );
};

export default Chart;
