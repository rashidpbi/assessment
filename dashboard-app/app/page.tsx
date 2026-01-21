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
import { ArrowUpRight, DollarSign, ShoppingCart } from 'lucide-react';

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [recentSales, setRecentSales] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/sales/analytics').then(res => res.json()).then(setData);
    fetch('/api/sales/recent').then(res => res.json()).then(setRecentSales);
  }, []);

  if (!data) return <div className="p-8">Loading dashboard...</div>;

  const revenueOption = {
    grid: { top: 20, right: 20, bottom: 40, left: 60 },
    xAxis: {
      type: 'category',
      data: (data?.monthlyRevenue || []).map((m: any) => `Month ${m._id}`),
    },
    yAxis: { type: 'value' },
    series: [
      {
        data: (data?.monthlyRevenue || []).map((m: any) => m.total),
        type: 'line',
        smooth: true,
        areaStyle: {
          color: 'rgba(59, 130, 246, 0.2)'
        },
        itemStyle: { color: '#3b82f6' }
      },
    ],
    tooltip: { trigger: 'axis' }
  };

  const regionalOption = {
    tooltip: { trigger: 'item' },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#020817',
          borderWidth: 2
        },
        label: { show: false },
        data: (data?.regionalPerformance || []).map((r: any) => ({ name: r._id, value: r.total }))
      }
    ]
  };

  return (
    <div className="space-y-8">
      <div>
        <EditableLabel labelKey="dashboard_title" as="h1" className="text-3xl font-bold" />
        <p className="text-muted-foreground">Welcome back to your sales command center.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              <EditableLabel labelKey="metric_revenue" />
            </CardTitle>
            <DollarSign className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(data.summary?.total || 0).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3 text-emerald-500" />
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              <EditableLabel labelKey="metric_sales_count" />
            </CardTitle>
            <ShoppingCart className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.summary?.count || 0}</div>
            <p className="text-xs text-muted-foreground">
              Total volume processed
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <ChartCard 
          titleKey="chart_revenue_trend" 
          option={revenueOption} 
        />
        <ChartCard 
          titleKey="metric_regional_performance" 
          option={regionalOption} 
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead><EditableLabel labelKey="table_col_product" /></TableHead>
                  <TableHead><EditableLabel labelKey="table_col_region" /></TableHead>
                  <TableHead className="text-right"><EditableLabel labelKey="table_col_amount" /></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentSales.map((sale) => (
                  <TableRow key={sale._id}>
                    <TableCell className="font-medium">{sale.product}</TableCell>
                    <TableCell>{sale.region}</TableCell>
                    <TableCell className="text-right">${sale.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
