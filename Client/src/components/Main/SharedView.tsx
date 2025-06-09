// src/pages/SharedView.tsx
import {useState} from 'react';
import SharedMain from './SharedMain';
import ShareSidebar from '../Sidebar/ShareSidebar';
import { ThemeProvider } from '../../context/ThemeContext';

const SharedView: React.FC = () => {

  const [selectedMenu, setSelectedMenu] = useState('Show All');


  return (
    <div className="flex h-screen overflow-hidden w-full">
       <ThemeProvider>
          <ShareSidebar
            selectedMenu={selectedMenu}
            setSelectedMenu={setSelectedMenu}
          />
          <SharedMain />
       </ThemeProvider>
      
    </div>
  );
};

export default SharedView;
