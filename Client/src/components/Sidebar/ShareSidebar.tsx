// src/components/ShareSidebar.tsx
import {useState, useEffect} from 'react';
import { FaFolderOpen, FaLinkedin, FaGithub } from 'react-icons/fa';
import { IoLogoYoutube } from 'react-icons/io';
import { FaXTwitter } from 'react-icons/fa6';
import { SiMedium, SiNotion } from 'react-icons/si';
import { LuBrainCircuit } from "react-icons/lu";
import {MdMenuOpen} from "react-icons/md";
import { useTheme } from '../../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

export const menuItems = [
  {
    icons: <FaFolderOpen size={26} className="text-green-600" />,
    label: 'Show All'
  },
  {
    icons: <IoLogoYoutube size={26} className="text-red-600" />,
    label: 'YouTube'
  },
  {
    icons: <FaXTwitter size={24} />,
    label: 'Twitter'
  },
  {
    icons: <SiMedium size={24} />,
    label: 'Medium'
  },
  {
    icons: <FaLinkedin size={24} className="text-blue-700" />,
    label: 'Linkedin'
  },
  {
    icons: <SiNotion size={24} />,
    label: 'Notion'
  },
  {
    icons: <FaGithub size={24} />,
    label: 'Github'
  }
];

type ShareSidebarProps = {
  selectedMenu: string;
  setSelectedMenu: (label: string) => void;
};

const ShareSidebar: React.FC<ShareSidebarProps> = ({
  selectedMenu,
  setSelectedMenu
}) => {

const [open,setOpen] = useState(true)
const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
const { theme, toggleTheme } = useTheme()

useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (isMobile) {
                setOpen(false)
            } else {
                setOpen(true)
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // run once on mount

        return () => window.removeEventListener('resize', handleResize);
    }, []);
  return (
          <nav className={`shadow-md h-screen p-2 bg-gradient-to-b  from-orange-300 to-gray-500 duration-300 flex flex-col ${open && !isMobile ? 'w-50' : 'w-16'}`}>
  
              {/* header */}
  
              <div className="flex items-center py-2  h-20 ">
                  
                  <div className="flex justify-start w-[50%]" ><LuBrainCircuit size={30} className={` ${open && !isMobile  ? 'w-[50%]' : 'w-0'} `} /></div>
  
                  {/* <div className="flex justify-start"><img src={brain_ai} alt="" className={` ${open ? 'w-[50%]' : 'w-0'} bg-white`} /></div> */}
                  
                  <div className={`flex justify-end ${open ? 'w-[50%]' : 'w-full'} `}><MdMenuOpen size={30} className={` transition-all duration-500 cursor-pointer text-green-900 ${!open && ' rotate-180'}`} onClick={()=>setOpen(!open)} /></div>
              </div>
  
              {/* body */}
  
              <ul className="flex-1">
                  {
                      menuItems.map((item,index) => {
                          return (
                              <li 
                                  key={index} 
                                  onClick={() => setSelectedMenu(item.label)}
                                  className={`group flex gap-2 px-3 my-2 py-2 rounded-md transition-all duration-300 cursor-pointer
                                      ${selectedMenu === item.label ? 'bg-slate-800 text-white': 'hover:bg-slate-500'}`}
                                  
                              > 
                                  <div className="pr-2">{item.icons}</div>
                                  <p
                                      className={`
                                          transition-all duration-500 overflow-hidden 
                                          ${open && !isMobile ? 'max-w-xs opacity-100 scale-100 ml-0' : 'max-w-0 opacity-0 scale-95 ml-6'}
                                          whitespace-nowrap 
                                      `}
                                  >
                                      {item.label}
                                  </p>
                                  {!open && (
                                      <span className="absolute left-16 z-50 whitespace-nowrap bg-white text-black rounded-md px-2 py-1 shadow-md scale-0 group-hover:scale-100 origin-left transition-transform duration-300">
                                          {item.label}
                                      </span>
                                  )}
  
                              </li>
                          )
                      })
                  }
              </ul>
              
              <div className="flex justify-start p-2">
                <button
                  onClick={toggleTheme}
                  className=" cursor-pointer transition "
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                </button>
            </div>
          </nav>
  );
};

export default ShareSidebar;