import { Request, Response } from 'express';
import Sale from '../models/Sale';

export const getSalesAnalytics = async (req: Request, res: Response) => {
  try {
    // Aggregate by month
    const monthlyRevenue = await Sale.aggregate([
      {
        $group: {
          _id: { $month: '$date' },
          total: { $sum: '$amount' }
        }
      },
      { $sort: { '_id': 1 } }
    ]);

    // Aggregate by region
    const regionalPerformance = await Sale.aggregate([
      {
        $group: {
          _id: '$region',
          total: { $sum: '$amount' }
        }
      }
    ]);

    // Aggregate by category
    const categoryPerformance = await Sale.aggregate([
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' }
        }
      }
    ]);

    // Summary metrics
    const totalRevenue = await Sale.aggregate([
      { $group: { _id: null, total: { $sum: '$amount' }, count: { $sum: 1 } } }
    ]);

    res.json({
      monthlyRevenue,
      regionalPerformance,
      categoryPerformance,
      summary: totalRevenue[0] || { total: 0, count: 0 }
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching sales analytics', error: err });
  }
};

export const getRecentSales = async (req: Request, res: Response) => {
  try {
    const sales = await Sale.find().sort({ date: -1 }).limit(10);
    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching recent sales', error: err });
  }
};
