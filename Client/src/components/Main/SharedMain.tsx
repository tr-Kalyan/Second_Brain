import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Card from '../CardUI/Card';
import { CiSearch } from 'react-icons/ci';
import { FaFilter } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

interface SharedContentItem {
  _id: string;
  title: string;
  link: string;
  tags: string[];
  contentType: string;
  createdAt: string;
  thumbnailUrl?: string;
}

const SharedMain = () => {
  const { token } = useParams();
  const [sharedData, setSharedData] = useState<SharedContentItem[]>([]);
  const [search, setSearch] = useState('');
  const [sortOption, setSortOption] = useState<'latest' | 'oldest' | 'title-asc' | 'title-desc'>('latest');
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const { theme } = useTheme();

  const fetchSharedContent = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/shared-content/${token}`);
      if (res.status === 200) {
        setSharedData(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching shared content:', err);
    }
  };

  useEffect(() => {
    fetchSharedContent();
  }, []);

  const filteredContent = sharedData
    .filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.tags?.some(tag => tag.toLowerCase().includes(search.toLowerCase())) ||
      item.link?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === 'latest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortOption === 'oldest') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else if (sortOption === 'title-asc') {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });

  return (
    <div
      className="w-full p-4"
      style={{
        backgroundImage: `
          radial-gradient(circle at 100% 0%, rgba(83, 219, 29, 0.2) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(29, 149, 219, 0.2) 0%, transparent 50%),
          radial-gradient(circle at 0% 100%, rgba(23, 43, 75, 0.2) 0%, transparent 50%)
        `,
      }}
    >
      {/* Search Input */}
      <div className="flex justify-end mb-4">
        <div className="relative w-full max-w-sm">
          <CiSearch
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-700 dark:text-red-400"
          />
          <input
            type="search"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-md dark:text-black border border-gray-100 dark:border-gray-100 
              bg-white dark:bg-cyan-100 dark:text-slate-900 
              placeholder:text-gray-400 dark:placeholder:text-slate-900
              focus:outline-none focus:ring-0 focus:shadow-[0_0_5px_rgba(20,150,0,0.7)] transition-shadow duration-300"
          />
        </div>
      </div>

      {/* Cards */}
      <div className="h-[calc(100vh-100px)] px-4 overflow-y-auto custom-scrollbar">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 p-4">
          {filteredContent.length === 0 ? (
            <div className="text-gray-500 col-span-full text-center text-lg mt-8">
              No content found.
            </div>
          ) : (
            filteredContent.map((item) => (
              <Card
                key={item._id}
                title={item.title}
                link={item.link}
                tags={item.tags}
                thumbnail={item.thumbnailUrl}
                contentType={item.contentType}
                date={item.createdAt}
                // No edit or delete
              />
            ))
          )}
        </div>
      </div>

      {/* Filter Floating Button */}
      <div className="fixed bottom-4 right-6 z-50">
        <div
          onClick={() => setShowFilterPopup((prev) => !prev)}
          className="bg-white dark:bg-slate-900 p-2 rounded-full shadow-md cursor-pointer hover:scale-105 transition-transform"
          title="Sort & Filter"
        >
          <FaFilter className="text-slate-900 dark:text-white" />
        </div>

        {showFilterPopup && (
          <div className="absolute bottom-14 right-0 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg shadow-lg p-3 w-48 z-50">
            <p className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-100">Sort By</p>
            <ul className="space-y-1">
              {[
                { key: 'latest', label: 'Latest to Oldest' },
                { key: 'oldest', label: 'Oldest to Latest' },
                { key: 'title-asc', label: 'Title (A-Z)' },
                { key: 'title-desc', label: 'Title (Z-A)' },
              ].map((option) => (
                <li
                  key={option.key}
                  className={`cursor-pointer px-2 py-1 rounded-md text-sm
                    ${sortOption === option.key
                      ? 'bg-blue-500 text-white font-semibold'
                      : 'hover:bg-gray-200 dark:hover:bg-slate-600 dark:text-gray-300 text-gray-700'}`}
                  onClick={() => {
                    setSortOption(option.key as any);
                    setShowFilterPopup(false);
                  }}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SharedMain;
