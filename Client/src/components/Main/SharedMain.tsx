// src/components/SharedMain.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Card from '../CardUI/Card';
import ShareSidebar from '../Sidebar/ShareSidebar';
import { CiSearch } from "react-icons/ci";

interface ContentItem {
  _id: string;
  title: string;
  link: string;
  tags: string[];
  thumbnailUrl?: string;
  contentType: string;
}

const SharedMain: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedMenu, setSelectedMenu] = useState<string>('Show All');
  const [search,setSearch] = useState<string>('')

  

  useEffect(() => {
    const fetchSharedContent = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/shared/${token}`);
        const sharedContent = response.data.data;
        setContent(sharedContent);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch shared content.');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchSharedContent();
    }
  }, [token]);


  // Content filtering
  const filteredContent = content
  .filter(item => selectedMenu === 'Show All' || item.contentType === selectedMenu)
  .filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.tags?.some(tag => tag.toLowerCase().includes(search.toLowerCase())) ||
    item.link?.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <div className="h-screen flex">
      {/* ✅ Reuse the existing sidebar */}
      <ShareSidebar selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />

      {/* ✅ Content Section */}

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {loading && <p className="text-center text-gray-500">Loading shared content...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}


        <div className="relative w-full max-w-sm ">
            <CiSearch size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700" />
            <input 
            type="search"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-0 
                focus:shadow-[0_0_5px_rgba(150,120,200,0.7)] transition-shadow duration-300"
            />
        </div>

        {!loading && !error && (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 p-4">
            {
            filteredContent.length === 0 ? (
            <p className="text-center text-gray-700 w-full col-span-full">
                No content found.
            </p>
            ) : (filteredContent.map((item) => (
                    <Card
                        key={item._id}
                        title={item.title}
                        link={item.link}
                        tags={item.tags}
                        thumbnail={item.thumbnailUrl}
                        contentType={item.contentType}
                    />
                    )))}
                </div>
                )}
            </div>
    </div>
  );
};

export default SharedMain;
