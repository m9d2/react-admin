import {CSSProperties, useEffect, useRef} from 'react';
import * as echarts from 'echarts/core';
import {BarChart, LineChart, PieChart} from 'echarts/charts';
import {
    DatasetComponent,
    GridComponent,
    TitleComponent,
    TooltipComponent,
    TransformComponent
} from 'echarts/components';
import {LabelLayout, UniversalTransition} from 'echarts/features';
import {CanvasRenderer} from 'echarts/renderers';
import {
    BarSeriesOption,
    ComposeOption,
    DatasetComponentOption,
    GridComponentOption,
    LineSeriesOption,
    PieSeriesOption,
    TitleComponentOption,
    TooltipComponentOption
} from "echarts";

export type ECOption = ComposeOption<
    | BarSeriesOption
    | LineSeriesOption
    | PieSeriesOption
    | TitleComponentOption
    | TooltipComponentOption
    | GridComponentOption
    | DatasetComponentOption
>;

const charts = [
    BarChart,
    LineChart,
    PieChart,
]
const component = [
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
]

echarts.use([
    ...charts,
    ...component,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer
]);

const EChart = ({option, style, className}: { option: ECOption, style?: CSSProperties, className?: string }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const chart = echarts.init(chartRef.current);
        chart.setOption(option);
        const resizeChart = () => {
            chart.resize();
        };

        window.addEventListener('resize', resizeChart);

        return () => {
            chart.dispose();
            window.removeEventListener('resize', resizeChart);
        };

    }, [option]);

    return <div ref={chartRef} style={style} className={className}></div>;

};

export {EChart}