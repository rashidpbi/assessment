'use client';

import React, { useState } from 'react';
import { useLabelStore } from '@/store/useLabelStore';
import { Edit2, AlertCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface EditableLabelProps {
  labelKey: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'p';
}

export const EditableLabel: React.FC<EditableLabelProps> = ({ 
  labelKey, 
  className = '', 
  as: Component = 'span' 
}) => {
  const { getLabel, getLabelData, updateLabel } = useLabelStore();
  const labelText = getLabel(labelKey);
  const labelData = getLabelData(labelKey);
  
  const [isEditing, setIsEditing] = useState(false);
  const [newValue, setNewValue] = useState(labelText);

  const handleSave = async () => {
    await updateLabel(labelKey, newValue);
    setIsEditing(false);
  };

  const isShared = labelData && labelData.usages.length > 1;

  return (
    <>
      <div className={`group relative inline-flex items-center gap-2 ${className}`}>
        <Component>{labelText}</Component>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => {
                  setNewValue(labelText);
                  setIsEditing(true);
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-muted rounded"
              >
                <Edit2 className="w-3 h-3 text-muted-foreground" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit "{labelText}"</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Label: {labelKey}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="text">Label Text</Label>
              <Input
                id="text"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                autoFocus
              />
            </div>

            {labelData && labelData.usages.length > 0 && (
              <div className="bg-muted p-3 rounded-md text-xs">
                <p className="font-semibold mb-2">Usage Impact:</p>
                <p className="text-muted-foreground mb-2">
                  Changing this label will affect {labelData.usages.length} location(s):
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {labelData.usages.map((usage, i) => (
                    <li key={i}>
                      {usage.page} &rarr; {usage.component}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
