import React, { useEffect, useState } from "react";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import { BiExpand } from "react-icons/bi";
import axios from "axios";

interface CardProps {
  title: string;
  link: string;
  thumbnailUrl?: string | null;
  onDelete: () => void;
  tags: string[] | null;
}

const Card: React.FC<CardProps> = ({ title, link, onDelete, tags }) => {
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [showFullTitle, setShowFullTitle] = useState(false); // State for title tooltip

  const fetchThumbnail = async (url: string) => {
    try {
      const response = await axios.get(`https://api.microlink.io/?url=${encodeURIComponent(url)}`);
      const imageUrl = response.data?.data?.image?.url;
      if (imageUrl) {
        setThumbnail(imageUrl);
      } else {
        setThumbnail(null);
      }
    } catch (error) {
      console.error("Error fetching thumbnail:", error);
      setThumbnail(null);
    }
  };

  

  useEffect(() => {
    fetchThumbnail(link);
  }, [link]);

  return (
    <div className="w-full max-w-sm border border-gray-200 flex flex-col p-4 rounded-lg bg-white shadow-lg relative">
      {/* Card Header with Title and Delete Button */}
      <div className="flex justify-between items-start border-b border-gray-200 pb-3 mb-3">
        {/* Title container with truncation and hover effect */}
        <div
          className="relative flex-grow pr-2"
          onMouseEnter={() => setShowFullTitle(true)}
          onMouseLeave={() => setShowFullTitle(false)}
        >
          <h1 className="text-lg font-semibold text-gray-800 line-clamp-2 h-[3.5rem]">
            {title}
          </h1>

          {/* Tooltip for full title on hover */}
          {showFullTitle && (
            <div className="absolute z-10 -top-full left-0 right-0 p-2 bg-gray-800 text-white text-xs rounded-md shadow-lg opacity-95">
              {title}
            </div>
          )}
        </div>
        <div>
          <BiExpand size={20} />
        </div>
        
      </div>

      {/* Thumbnail or Link Placeholder */}
      {thumbnail ? (
        <img
          src={thumbnail}
          alt="Preview"
          className="w-full max-h-72 object-contain mx-auto rounded-md mb-3"
        />
      ) : (
        <div className="flex-grow flex items-center justify-center h-48 bg-gray-100 rounded-md mb-3">
          <p className="text-blue-600 underline break-all text-center p-2">
            <a href={link} target="_blank" rel="noopener noreferrer">
              {link}
            </a>
          </p>
        </div>
      )}

      {/* Tags section with hover for full list */}
      <div className="relative group">
        {/* Tag container (1-line, overflow hidden, ellipsis) */}
        <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap text-ellipsis max-w-full">
          {tags?.map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-orange-400 px-2 py-1 rounded-lg text-xs whitespace-nowrap"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Full tag list on hover */}
        <div className="absolute top-full left-0 z-10 mt-2 hidden group-hover:block bg-white border shadow-lg rounded-md p-2 max-w-xs w-fit">
          <div className="flex flex-wrap gap-2">
            {tags?.map((tag, index) => (
              <span
                key={index}
                className="inline-block bg-orange-400 px-2 py-1 rounded-lg text-xs whitespace-nowrap"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>


      {/* Edit Icon - Moved to be a direct child of the main card div, after all content */}
      <div className="flex justify-end gap-3 pt-2">
        <MdOutlineEdit className="text-xl cursor-pointer text-gray-600 hover:text-black" />
        <button onClick={onDelete} className="flex-shrink-0">
          <MdDelete className="text-xl cursor-pointer text-slate-700 hover:text-red-700" />
        </button>
        
      </div>
    </div>
  );
};

export default Card;