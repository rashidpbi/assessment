import React from 'react';
import { Sidebar } from '@/components/sidebar';
import { LabelStoreInitializer } from '@/components/label-store-initializer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <LabelStoreInitializer />
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {children}
        </div>
      </main>
    </div>
  );
}
