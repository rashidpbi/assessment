'use client';

import React, { useEffect, useState } from 'react';
import { EditableLabel } from '@/components/editable-label';
import { ChartCard } from '@/components/chart-card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AnalyticsPage() {
  const [data, setData] = useState<any>(null);
  const [recentSales, setRecentSales] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/sales/analytics').then(res => res.json()).then(setData);
    fetch('/api/sales/recent').then(res => res.json()).then(setRecentSales);
  }, []);

  if (!data) return <div className="p-8">Loading analytics...</div>;

  const barOption = {
    grid: { top: 20, right: 20, bottom: 40, left: 60 },
    xAxis: { type: 'value' },
    yAxis: {
      type: 'category',
      data: data.regionalPerformance.map((r: any) => r._id),
    },
    series: [
      {
        data: data.regionalPerformance.map((r: any) => r.total),
        type: 'bar',
        itemStyle: { color: '#8b5cf6' }
      },
    ],
    tooltip: { trigger: 'axis' }
  };

  const pieOption = {
    tooltip: { trigger: 'item' },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#020817',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold'
          }
        },
        labelLine: { show: false },
        data: data.categoryPerformance.map((c: any) => ({ name: c._id, value: c.total }))
      }
    ]
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Analytics Breakdown</h1>
        <p className="text-muted-foreground">Deep dive into your regional and product performance.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <ChartCard 
          titleKey="metric_regional_performance" 
          option={barOption} 
        />
        <ChartCard 
          titleKey="metric_category_distribution" 
          option={pieOption} 
        />
      </div>

      <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>
              <EditableLabel labelKey="metric_revenue" />
            </CardTitle>
          </CardHeader>
          <CardContent>
             <div className="text-4xl font-bold tracking-tighter">
               ${data.summary.total.toLocaleString()}
             </div>
             <p className="text-sm text-muted-foreground mt-2">
               Verified revenue across all regions.
             </p>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>
              <EditableLabel labelKey="title_product_performance" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead><EditableLabel labelKey="table_col_product" /></TableHead>
                  <TableHead className="text-right"><EditableLabel labelKey="table_col_amount" /></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentSales.map((sale) => (
                  <TableRow key={sale._id}>
                    <TableCell className="font-medium">{sale.product}</TableCell>
                    <TableCell className="text-right">${sale.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
