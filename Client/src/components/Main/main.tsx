


// const Main = () => {

//     return(
//         <div className="h-8 w-full">
//             <div className="flex gap-3 justify-end">
//                 <button className="flex gap-2 px-2.5 py-1 bg-blue-300 text-xs sm:text-md rounded-md"><FaPlus className="h-full text-center" />Add Content</button>
//                 <button className="flex gap-2 px-2.5 py-1 bg-blue-300 rounded-md text-xs sm:text-md rounded-lg"><IoMdShare className="h-full text-center" />Share Content</button>
//             </div>
//             <div>
//                 Card view of links
//             </div>
//         </div>
        
        
//     )
    
// }



import React, { useState,  } from 'react';
import { FaPlus } from 'react-icons/fa';
import { IoMdShare, IoMdClose } from 'react-icons/io';
import type {KeyboardEvent, ChangeEvent} from 'react'


const Main: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const [tagInput, setTagInput] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);

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

  const handleSubmit = () => {
    const content = { title, link, tags };
    console.log('Submitted content:', content);

    // Reset form
    setTitle('');
    setLink('');
    setTags([]);
    setShowModal(false);
  };

  return (
    <div className="w-full p-4">
      {/* Top Buttons */}
      <div className="flex gap-3 justify-end">
        <button
          className="flex gap-2 px-2.5 py-1 bg-blue-300 text-xs sm:text-md rounded-md"
          onClick={() => setShowModal(true)}
        >
          <FaPlus /> Add Content
        </button>
        <button className="flex gap-2 px-2.5 py-1 bg-blue-300 rounded-md text-xs sm:text-md">
          <IoMdShare /> Share Content
        </button>
      </div>

      <div className="mt-4">Card view of links</div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative shadow-lg">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={() => setShowModal(false)}
            >
              <IoMdClose size={20} />
            </button>

            <h2 className="text-xl font-semibold mb-4">Add New Content</h2>

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
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
