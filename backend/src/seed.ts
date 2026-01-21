import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Label from './models/Label';
import Sale from './models/Sale';
import { connectDB } from './db';

dotenv.config();

const seedLabels = [
  {
    key: 'dashboard_title',
    text: 'Sales Overview',
    usages: [{ page: 'Dashboard', component: 'Header' }]
  },
  {
    key: 'metric_revenue',
    text: 'Total Revenue',
    usages: [
      { page: 'Dashboard', component: 'Revenue Summary Card' },
      { page: 'Analytics', component: 'Performance Overview' }
    ]
  },
  {
    key: 'metric_sales_count',
    text: 'Total Sales',
    usages: [{ page: 'Dashboard', component: 'Sales Count Card' }]
  },
  {
    key: 'chart_revenue_trend',
    text: 'Monthly Revenue Trend',
    usages: [{ page: 'Dashboard', component: 'Main Revenue Chart' }]
  },
  {
    key: 'table_col_product',
    text: 'Product Name',
    usages: [
      { page: 'Dashboard', component: 'Recent Sales Table' },
      { page: 'Analytics', component: 'Product Performance Table' }
    ]
  },
  {
    key: 'table_col_amount',
    text: 'Amount',
    usages: [
      { page: 'Dashboard', component: 'Recent Sales Table' },
      { page: 'Analytics', component: 'Product Performance Table' }
    ]
  },
  {
    key: 'metric_category_distribution',
    text: 'Sales by Category',
    usages: [{ page: 'Analytics', component: 'Category Breakdown Pie Chart' }]
  },
  {
    key: 'title_product_performance',
    text: 'Product Performance',
    usages: [{ page: 'Analytics', component: 'Table Card Header' }]
  },
  {
    key: 'table_col_region',
    text: 'Region',
    usages: [
      { page: 'Dashboard', component: 'Recent Sales Table' },
      { page: 'Analytics', component: 'Product Performance Table' }
    ]
  },
  {
    key: 'metric_regional_performance',
    text: 'Regional Performance',
    usages: [
      { page: 'Dashboard', component: 'Regional Chart' },
      { page: 'Analytics', component: 'Regional Bar Chart' }
    ]
  }
];

const generateSalesData = () => {
  const regions = ['North America', 'Europe', 'Asia Pacific', 'Latin America'];
  const products = ['Cloud ERP', 'CRM Pro', 'Analytics Suite', 'Mobile App'];
  const categories = ['Software', 'Services', 'Hardware'];
  const data = [];

  const now = new Date();
  for (let i = 0; i < 100; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
    data.push({
      date,
      amount: Math.floor(Math.random() * 10000) + 500,
      region: regions[Math.floor(Math.random() * regions.length)],
      product: products[Math.floor(Math.random() * products.length)],
      category: categories[Math.floor(Math.random() * categories.length)]
    });
  }
  return data;
};

const seed = async () => {
  await connectDB();

  try {
    // Clear existing data
    await Label.deleteMany({});
    await Sale.deleteMany({});

    // Seed Labels
    await Label.insertMany(seedLabels);
    console.log('Labels seeded successfully');

    // Seed Sales
    const salesData = generateSalesData();
    await Sale.insertMany(salesData);
    console.log('Sales data seeded successfully');

    mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('Seed Error:', err);
    process.exit(1);
  }
};

seed();
