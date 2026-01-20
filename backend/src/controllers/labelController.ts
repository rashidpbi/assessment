import { Request, Response } from 'express';
import Label from '../models/Label';

export const getLabels = async (req: Request, res: Response) => {
  try {
    const labels = await Label.find();
    res.json(labels);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching labels', error: err });
  }
};

export const updateLabel = async (req: Request, res: Response) => {
  const { key } = req.params;
  const { text } = req.body;

  try {
    const label = await Label.findOneAndUpdate(
      { key },
      { text },
      { new: true }
    );

    if (!label) {
      return res.status(404).json({ message: 'Label not found' });
    }

    res.json(label);
  } catch (err) {
    res.status(500).json({ message: 'Error updating label', error: err });
  }
};

export const getLabelImpact = async (req: Request, res: Response) => {
  const { key } = req.params;

  try {
    const label = await Label.findOne({ key });
    if (!label) {
      return res.status(404).json({ message: 'Label not found' });
    }

    res.json({
      key: label.key,
      usageCount: label.usages.length,
      locations: label.usages
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching label impact', error: err });
  }
};
