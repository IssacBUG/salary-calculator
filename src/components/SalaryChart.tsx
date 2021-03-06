import React from 'react';
import {
  Chart,
  Interval,
  Tooltip,
  Axis,
  Coordinate,
  Interaction,
  getTheme,
} from 'bizcharts';
import { SalaryChartType } from '../types';

interface SalaryChartProps {
  data: SalaryChartType[];
}

const SalaryChart: React.FC<SalaryChartProps> = ({ data = [] }) => {
  // const data = [
  //   { item: '事例一', count: 40, percent: 0.4 },
  //   { item: '事例二', count: 21, percent: 0.21 },
  //   { item: '事例三', count: 17, percent: 0.17 },
  //   { item: '事例四', count: 13, percent: 0.13 },
  //   { item: '事例五', count: 9, percent: 0.09 },
  // ];

  const cols = {
    percent: {
      formatter: (val: any) => {
        val = val * 100 + '%';
        return val;
      },
    },
  };

  return (
    <Chart
      height={400}
      data={data}
      scale={cols}
      autoFit
      onIntervalClick={(e: any) => {
        const states = e.target.cfg.element.getStates(); // 如果是选中，值为['selected'];取消选中，值为[]
      }}
    >
      <Coordinate type="theta" radius={0.75} />
      <Tooltip showTitle={false} />
      <Axis visible={false} />
      <Interval
        position="percent"
        adjust="stack"
        color="item"
        style={{
          lineWidth: 1,
          stroke: '#fff',
        }}
        label={[
          'count',
          {
            // label 太长自动截断
            layout: { type: 'limit-in-plot', cfg: { action: 'ellipsis' } },
            content: (data) => {
              return `${data.item}: ${data.percent * 100}%`;
            },
          },
        ]}
        state={{
          selected: {
            style: (t) => {
              const res = getTheme().geometries.interval.rect.selected.style(t);
              return { ...res };
            },
          },
        }}
      />
      <Interaction type="element-single-selected" />
    </Chart>
  );
};

export default SalaryChart;
