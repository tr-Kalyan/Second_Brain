import React, { useState, useContext, useEffect } from 'react';
import { FaPlus, FaFilter } from 'react-icons/fa';
import { IoMdShare, IoMdClose } from 'react-icons/io';
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import type { KeyboardEvent, ChangeEvent } from 'react';
import axios from 'axios';
import { AppContent } from '../../context/AppContext';
import { toast } from 'react-toastify';
import Card from '../CardUI/Card';
import ShareModal from './ShareModal';
import { useTheme } from '../../context/ThemeContext';
import { Moon, Sun } from 'lucide-react'

interface ContentItem {
  _id: string;
  title: string;
  link: string;
  contentType:string;
  thumbnailUrl?: string;
  tags: string[];
  createdAt:string;
}


type MainProps = {
  selectedMenu: string;
};

const Main: React.FC<MainProps> = ({ selectedMenu }) => {

  const { backendURL } = useContext(AppContent);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [title, setTitle] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const [tagInput, setTagInput] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [content, setContent] = useState<ContentItem[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [shareLink,setShareLink] = useState<string>('');
  const [shareShowModal,setShareShowModal] = useState<boolean>(false);
  const [search,setSearch] = useState<string>('')
  const { theme, toggleTheme } = useTheme()
  const [submitting, setSubmitting] = useState(false);
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [sortOption, setSortOption] = useState<'latest' | 'oldest' | 'title-asc' | 'title-desc'>('latest');

  const handleAddTag = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      const trimmedTag = tagInput.trim();
      if (!tags.includes(trimmedTag)) {
        setTags((prevTags) => [...prevTags, trimmedTag]);
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags((prevTags) => prevTags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async () => {

    if (submitting) return; // prevent double submit
    setSubmitting(true);
    try {
      if (editMode && editingId) {
        const res = await axios.put(`${backendURL}/api/user/editcontent/${editingId}`, {
          title,
          link,
          tags
        },{withCredentials:true});
        console.log(res)

        if (res.status === 200) {
          toast.success("Content updated successfully");

          setContent( prev => 
            prev.map(item =>
              item._id === editingId ? {...item,title,link,tags}:item
            )
          )
          setEditMode(false);
          setEditingId(null);
        }
      } else {
        const res = await axios.post(`${backendURL}/api/user/addContent`, {
          title,
          link,
          tags
        },{withCredentials:true});

        //console.log(res)
        if (res.status === 200) {
          toast.success(res.data.message);

          const newItem = res.data.data;

          setContent(prev => [newItem,...prev])
         
        }
      }

      setTitle('');
      setLink('');
      setTags([]);
      setShowModal(false);
    } catch (err) {
      toast.error("Something went wrong");
      console.log(`Error in handleSubmit:`, err);
    }finally {
      setSubmitting(false);
    }
  };


  const handleShare = async() =>{
    try{
      const res = await axios.post(`${backendURL}/api/user/generate-share-link`,{},{
        withCredentials:true,
      });
      //console.log("from handleShare",res)
      if (res.status === 201){
        const link = res.data.shareLink;

        await navigator.clipboard.writeText(link);

        setShareLink(link);
        setShareShowModal(true);
      }


    }
    catch(err){
      console.error("Error generating share link:", err);
    }
  }
  const fetchData = async () => {
    try {
      const res = await axios.get(`${backendURL}/api/user/content`, {
        withCredentials: true,
      });

      // console.log('from fetchdata',res.data.data)

      if (res.status === 200) {

        setContent(res.data.data);

      }
    } catch (err) {
      console.log("Error while fetching data:", err);
    }
  };

  const handleEdit = (item: ContentItem) => {
    setEditMode(true);
    setEditingId(item._id);
    setTitle(item.title);
    setLink(item.link);
    setTags(item.tags || []);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(`${backendURL}/api/user/delete/${id}`, {
        withCredentials: true
      });

      if (res.status === 200) {
        toast.success(res.data.message);
        setContent(prev => prev.filter(item => item._id !== id));
      }
    } catch (err) {
      toast.error("Failed to delete content");
      console.error("Delete error:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);


  // Content filtering
  const filteredContent = content
  .filter(item => selectedMenu === 'Show All' || item.contentType === selectedMenu)
  .filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.tags?.some(tag => tag.toLowerCase().includes(search.toLowerCase())) ||
    item.link?.toLowerCase().includes(search.toLowerCase())
  );




  return (
    <div 
      className="w-full p-4 "
      
      style={{
        backgroundImage: `
          radial-gradient(circle at 100% 0%, rgba(83, 219, 29, 0.2) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(29, 149, 219, 0.2) 0%, transparent 50%),
          radial-gradient(circle at 0% 100%, rgba(23, 43, 75, 0.2) 0%, transparent 50%)
        `,
      }}
    >
      {/* Top Buttons */}
      
      <div className="flex gap-3 justify-end">
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

        
        <button
          className="hidden font-semibold cursor-pointer md:flex items-center gap-2 text-white px-2.5 py-1 bg-slate-700 dark:bg-slate-900 text-sm rounded-md"
          onClick={() => {
            setShowModal(true);
            setEditMode(false);
            setTitle('');
            setLink('');
            setTags([]);
          }}
        >
          <FaPlus size={14} /> <span>Add Content</span>
        </button>

        <button onClick={handleShare} className="hidden font-semibold cursor-pointer md:flex items-center gap-2 text-white px-2.5 py-1 bg-slate-700 dark:bg-slate-900 rounded-md text-sm">
          <IoMdShare size={16} /> <p >Share </p><span className="ml-1 text-lg"> 🧠</span>
        </button>
        <div className="flex justify-end">
          <button
            onClick={toggleTheme}
            className=" cursor-pointer transition"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5 text-white" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        <div
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
          onClick={() => setShowDropdown(!showDropdown)}
          className="md:hidden relative dropdown-container"
        >
          <button className="p-3 cursor-pointer">
            <BsThreeDotsVertical size={20} />
          </button>

          {showDropdown && (
            <div className="absolute top-6 right-0 mt-2 w-40 bg-slate-700 text-white shadow-md rounded-md py-2 z-50 hover:text-black">
              <button
                onClick={() => {
                  setShowModal(true);
                  setEditMode(false);
                  setTitle('');
                  setLink('');
                  setTags([]);
                  setShowDropdown(false);
                }}
                className="w-full flex items-center gap-2 px-4 py-2 cursor-pointer font-semibold hover:bg-gray-100 text-sm"
              >
                <FaPlus size={14} /> Add Content
              </button>
              <button
                onClick={() => {
                  handleShare()
                  setShowDropdown(false)}}
                className="w-full flex items-center gap-2 px-4 py-2 cursor-pointer font-semibold hover:bg-gray-100 text-sm"
              >
                <IoMdShare size={14} /> <p>Share</p> <span className="text-lg">🧠</span>
              </button>

              
            </div>
          )}

          
        </div>
      </div>
      {/* Share Modal */}
          {shareShowModal && (
            <ShareModal
              shareLink={shareLink}
              onClose={() => setShareShowModal(false)}
            />
      )}

      

      {/* Scrollable Cards */}
      <div className="h-[calc(100vh-80px)] px-4 overflow-y-auto custom-scrollbar">
        <div className="mt-4">
          {/* <div
            className="grid gap-6 p-4"
            style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 300px))',
            }}
          > */}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 p-4">
            {filteredContent.length === 0 ? (
              <div className="text-red-400 col-span-full text-center text-lg mt-8">
                No content found.
              </div>
              ) : (
                filteredContent
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
                  })
                  .map((item) => (
                  <Card
                    key={item._id}
                    title={item.title}
                    link={item.link}
                    tags={item.tags}
                    thumbnail={item.thumbnailUrl}
                    contentType={item.contentType}
                    onDelete={() => handleDelete(item._id)}
                    onEdit={() => handleEdit(item)}
                    date={item.createdAt}
                  />
                ))
              )}
            </div>
        </div>
      </div>


      {/* Filters */}
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
                    setShowFilterPopup(false); // Close on selection
                  }}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>






      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-xs flex items-center justify-center z-50">
          <div className="bg-white p-6 backdrop-blur-md rounded-lg w-full max-w-md border border-cyan-700 relative shadow-2xl">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={() => setShowModal(false)}
            >
              <IoMdClose size={20} />
            </button>

            <h2 className="text-xl font-semibold mb-4">
              {editMode ? 'Edit Content' : 'Add New Content'}
            </h2>

            {/* Title */}
            <label className="block mb-2 text-sm font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
            />

            {/* Link */}
            <label className="block mb-2 text-sm font-medium">Link</label>
            <input
              type="url"
              value={link}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setLink(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
            />

            {/* Tags */}
            <label className="block mb-2 text-sm font-medium">Tags</label>
            <input
              type="text"
              value={tagInput}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="Type and press Enter"
              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
            />
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-blue-200 text-sm px-2 py-1 rounded-full flex items-center gap-1"
                >
                  {tag}
                  <button onClick={() => handleRemoveTag(tag)} className="text-xs">✕</button>
                </span>
              ))}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              {submitting ? 'Saving...' : editMode ? 'Update' : 'Submit'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
