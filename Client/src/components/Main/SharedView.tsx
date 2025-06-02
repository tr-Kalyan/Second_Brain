import React, { useState, useContext, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { IoMdShare, IoMdClose } from 'react-icons/io';
import { BsThreeDotsVertical } from "react-icons/bs";
import type { KeyboardEvent, ChangeEvent } from 'react';
import axios from 'axios';


import Card from '../CardUI/Card';
import ShareModal from './ShareModal';

interface ContentItem {
  _id: string;
  title: string;
  link: string;
  contentType:string;
  thumbnailUrl?: string;
  tags: string[];
}


type MainProps = {
  selectedMenu: string;
};

const Main: React.FC<MainProps> = ({ selectedMenu }) => {


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

  const handleAddTag = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      const trimmedTag = tagInput.trim();
      if (!tags.includes(trimmedTag)) {
        setTags((prevTags) => [...prevTags, trimmedTag]);
      }
      setTagInput('');
    }
  };

  

  







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

  return (
    <div className="w-full p-4">
      {/* Top Buttons */}
      <div className="flex gap-3 justify-end">
        <button
          className="hidden cursor-pointer md:flex items-center gap-2 text-white px-2.5 py-1 bg-slate-700 text-sm rounded-md"
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

        <button onClick={handleShare} className="hidden cursor-pointer md:flex items-center gap-2 text-white px-2.5 py-1 bg-slate-700 rounded-md text-sm">
          <IoMdShare size={16} /> <span>Share 🧠</span>
        </button>

        <div
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
          onClick={() => setShowDropdown(!showDropdown)}
          className="md:hidden relative dropdown-container"
        >
          <button className="p-2 cursor-pointer">
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
                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm"
              >
                <FaPlus size={14} /> Add Content
              </button>
              <button
                onClick={() => {
                  
                  setShowDropdown(false)}}
                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm"
              >
                <IoMdShare size={14} /> Share 🧠
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
          <div
            className="grid gap-6 p-4"
            style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 300px))',
            }}
          >
            {content && content
            .filter((item) => selectedMenu === 'Show All' || item.contentType === selectedMenu)
              .map((item) => (
              <Card
                key={item._id}
                title={item.title}
                link={item.link}
                tags={item.tags}
                thumbnail = {item.thumbnailUrl}
                contentType={item.contentType}
                
              />
            ))}
          </div>
        </div>
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
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              {editMode ? 'Update' : 'Submit'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
