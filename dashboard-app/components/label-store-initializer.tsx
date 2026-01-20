'use client';

import { useEffect } from 'react';
import { useLabelStore } from '@/store/useLabelStore';

export const LabelStoreInitializer = () => {
  const fetchLabels = useLabelStore((state) => state.fetchLabels);

  useEffect(() => {
    fetchLabels();
  }, [fetchLabels]);

  return null;
};
