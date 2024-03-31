import {EChart, ECOption} from "@/components/echarts.tsx";
import {Button, Card, Col, Dropdown, MenuProps, Row, Segmented, Space, Statistic} from "antd";
import {CaretDownOutlined, CaretUpOutlined, EllipsisOutlined} from "@ant-design/icons";
import * as echarts from 'echarts/core';
import styles from "./index.module.scss";
import {useEffect, useState} from "react";

const option: ECOption = {
    resize: true,
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: 'Direct',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220, 301, 100, 300, 210, 390]
        }
    ],
    color: [
        '#1677ff'
    ]
};

const option2: ECOption = {
    color: ['#c6a6f1'],
    tooltip: {
        trigger: 'axis',
    },
    grid: {
        left: '0',
        right: '0',
        bottom: '0',
        top: '0',
        containLabel: false
    },
    xAxis: [
        {
            show: false,
            type: 'category',
            boundaryGap: false,
            data: ['2024-01-03', '2024-01-04', '2024-01-05', '2024-01-06', '2024-01-07', '2024-01-08', '2024-01-09']
        }
    ],
    yAxis: [
        {
            type: 'value',
            show: false,
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: false
            }

        }
    ],
    series: [
        {
            type: 'line',
            smooth: true,
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgb(128, 255, 165)'
                    },
                    {
                        offset: 1,
                        color: 'rgb(1, 191, 236)'
                    }
                ])
            },
            emphasis: {
                focus: 'series'
            },
            data: [14120, 4320, 4620, 5120, 9120, 3120, 300]
        }
    ]
};

const option3: ECOption = {
    title: {
        left: 'center'
    },
    tooltip: {
        trigger: 'item'
    },
    series: [
        {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
                {value: 1048, name: 'Search Engine'},
                {value: 735, name: 'Direct'},
                {value: 580, name: 'Email'},
                {value: 484, name: 'Union Ads'},
                {value: 300, name: 'Video Ads'}
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

const DataCardPanel = () => {

    return (
        <div className={styles.cardDataPanel}>
            <Row gutter={[24, 24]} style={{width: '100%'}}>
                <Col xs={{flex: '100%'}}
                     sm={{flex: '50%'}}
                     md={{flex: '40%'}}
                     lg={{flex: '20%'}}
                     xl={{flex: '10%'}}>
                    <div className={styles.cardDataCard}>
                        <div>
                            <span>总销售额</span>
                            <Statistic valueStyle={{fontSize: '30px', fontWeight: 500}} value={126560} prefix="￥"/>
                        </div>
                        <div className={styles.cardDataChart}>
                            <div>
                                <span>周同比</span>
                                <span style={{marginLeft: 8}}>12%</span>
                                <CaretUpOutlined className="red"/>
                            </div>
                            <div>
                                <span>日同比</span>
                                <span style={{marginLeft: 8}}>11%</span>
                                <CaretDownOutlined className="green"/>
                            </div>
                        </div>
                        <div className={styles.cardDataFooter}>
                            <span>日销售额</span>
                            <span>￥123,54</span>
                        </div>
                    </div>
                </Col>
                <Col xs={{flex: '100%'}}
                     sm={{flex: '50%'}}
                     md={{flex: '40%'}}
                     lg={{flex: '20%'}}
                     xl={{flex: '10%'}}>
                    <div className={styles.cardDataCard}>
                        <div>
                            <span>访问量</span>
                            <Statistic valueStyle={{fontSize: '30px', fontWeight: 500}} value={8846}/>
                        </div>
                        <div className={styles.cardDataChart}>
                            <EChart option={option2} style={{width: '100%', height: '100%'}}/>
                        </div>
                        <div className={styles.cardDataFooter}>
                            <span>日访问量</span>
                            <span>1234</span>
                        </div>
                    </div>
                </Col>
                <Col xs={{flex: '100%'}}
                     sm={{flex: '50%'}}
                     md={{flex: '40%'}}
                     lg={{flex: '20%'}}
                     xl={{flex: '10%'}}>
                    <div className={styles.cardDataCard}>
                        <div>
                            <span>访问量</span>
                            <Statistic valueStyle={{fontSize: '30px', fontWeight: 500}} value={8846}/>
                        </div>
                        <div className={styles.cardDataChart}>
                            <div>
                                <span>周同比</span>
                                <span>12%</span>
                                <CaretUpOutlined className="red"/>
                            </div>
                            <div>
                                <span>日同比</span>
                                <span>11%</span>
                                <CaretDownOutlined className="green"/>
                            </div>
                        </div>
                        <div className={styles.cardDataFooter}>
                            <span>日访问量</span>
                            <span>1234</span>
                        </div>
                    </div>
                </Col>
                <Col xs={{flex: '100%'}}
                     sm={{flex: '50%'}}
                     md={{flex: '40%'}}
                     lg={{flex: '20%'}}
                     xl={{flex: '10%'}}>
                    <div className={styles.cardDataCard}>
                        <div>
                            <span>访问量</span>
                            <Statistic valueStyle={{fontSize: '30px', fontWeight: 500}} value={8846}/>
                        </div>
                        <div className={styles.cardDataChart}>
                            <div>
                                <span>周同比</span>
                                <span>12%</span>
                                <CaretUpOutlined className="red"/>
                            </div>
                            <div>
                                <span>日同比</span>
                                <span>11%</span>
                                <CaretDownOutlined className="green"/>
                            </div>
                        </div>
                        <div className={styles.cardDataFooter}>
                            <span>日访问量</span>
                            <span>1234</span>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

const Dashboard = () => {
    const [options, setOptions] = useState<string[]>([]);

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: '操作1',
        },
        {
            key: '2',
            label: '操作2',
        }
    ];
    useEffect(() => {
        setOptions(['全部渠道', '线上', '门店'])
    }, []);
    const extra = (
        <>
            <Segmented options={options}/>
            <Dropdown menu={{items}} placement="bottom">
                <Button type="text"><EllipsisOutlined/></Button>
            </Dropdown>
        </>
    )
    return (
        <Space direction='vertical' size={28} style={{width: '100%'}}>
            <DataCardPanel/>
            <Card title="年销售额" bordered={false} style={{width: '100%'}} extra={extra}>
                <EChart option={option} style={{width: '100%', height: '400px'}}/>
            </Card>
            <Card title="年销售额" bordered={false} style={{width: '100%'}} extra={extra}>
                <EChart option={option3} style={{width: '100%', height: '400px'}}/>
            </Card>
            {/*<Space style={{width: '100%'}} direction="horizontal" size={28}>*/}
            {/*    <Card title="年销售额" bordered={false} style={{width: '100%'}} extra={extra}>*/}
            {/*        <EChart option={option} style={{width: '100%', height: '400px'}}/>*/}
            {/*    </Card>*/}
            {/*    <Card title="年销售额" bordered={false} style={{width: '100%'}} extra={extra}>*/}
            {/*        <EChart option={option3} style={{width: '100%', height: '400px'}}/>*/}
            {/*    </Card>*/}
            {/*</Space>*/}
        </Space>

    )
}

export default Dashboard