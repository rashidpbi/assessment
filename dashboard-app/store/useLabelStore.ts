import { create } from 'zustand';

export interface ILabelUsage {
  page: string;
  component: string;
}

export interface ILabel {
  key: string;
  text: string;
  usages: ILabelUsage[];
}

interface LabelState {
  labels: Record<string, ILabel>;
  isLoading: boolean;
  error: string | null;
  fetchLabels: () => Promise<void>;
  updateLabel: (key: string, newText: string) => Promise<void>;
  getLabel: (key: string) => string;
  getLabelData: (key: string) => ILabel | undefined;
}

export const useLabelStore = create<LabelState>((set, get) => ({
  labels: {},
  isLoading: false,
  error: null,

  fetchLabels: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch('/api/labels');
      const data: ILabel[] = await response.json();
      const labelsMap = data.reduce((acc, label) => {
        acc[label.key] = label;
        return acc;
      }, {} as Record<string, ILabel>);
      set({ labels: labelsMap, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  updateLabel: async (key: string, newText: string) => {
    const previousLabel = get().labels[key];
    
    // Optimistic update (handle missing label by creating a temporary one)
    set((state) => ({
      labels: {
        ...state.labels,
        [key]: previousLabel 
          ? { ...previousLabel, text: newText }
          : { key, text: newText, usages: [] }
      }
    }));

    try {
      const response = await fetch(`/api/labels/${key}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newText }),
      });

      if (!response.ok) throw new Error('Failed to update label');
      
      const updatedLabel = await response.json();
      set((state) => ({
        labels: { ...state.labels, [key]: updatedLabel }
      }));
    } catch (error: any) {
      // Rollback
      set((state) => ({
        labels: { ...state.labels, [key]: previousLabel },
        error: error.message
      }));
    }
  },

  getLabel: (key: string) => {
    return get().labels[key]?.text || key;
  },

  getLabelData: (key: string) => {
    return get().labels[key];
  }
}));
