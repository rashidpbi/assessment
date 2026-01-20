'use client';

import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EditableLabel } from '@/components/editable-label';

interface ChartCardProps {
  titleKey: string;
  option: any;
  className?: string;
}

export const ChartCard: React.FC<ChartCardProps> = ({ titleKey, option, className }) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>
          <EditableLabel labelKey={titleKey} as="span" className="text-lg font-semibold" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ReactECharts 
          option={option} 
          style={{ height: '300px', width: '100%' }}
          theme="dark"
          notMerge={true}
          lazyUpdate={true}
        />
      </CardContent>
    </Card>
  );
};
