// src/pages/SharedView.tsx
import React from 'react';
import SharedMain from './SharedMain';

const SharedView: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden w-full">
      <SharedMain />
    </div>
  );
};

export default SharedView;
