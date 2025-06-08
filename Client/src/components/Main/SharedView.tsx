// src/pages/SharedView.tsx
import React from 'react';
import SharedMain from './SharedMain';
import { ThemeProvider } from '../../context/ThemeContext';

const SharedView: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden w-full">
       <ThemeProvider>
          <SharedMain />
       </ThemeProvider>
      
    </div>
  );
};

export default SharedView;
