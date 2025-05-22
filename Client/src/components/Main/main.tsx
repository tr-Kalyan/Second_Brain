import React, { useState, useContext, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { IoMdShare, IoMdClose } from 'react-icons/io';
import { BsThreeDotsVertical } from "react-icons/bs";
import type {KeyboardEvent, ChangeEvent} from 'react';
import axios from 'axios';
import { AppContent } from '../../context/AppContext';
import {toast} from 'react-toastify';


const Main: React.FC = () => {

    const {backendURL} = useContext(AppContent)
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showDropdown, setShowDropdown] = useState(false);
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

    // const handleSubmit = () => {
    //     const content = { title, link, tags };
    //     console.log('Submitted content:', content);

    //     // Reset form
    //     setTitle('');
    //     setLink('');
    //     setTags([]);
    //     setShowModal(false);
    // };

    const handleSubmit = async () => {

        try{
            const res = await axios.post(backendURL + '/api/user/addContent', {link,title,tags})
            console.log(res)
            if (res.status === 200){
                toast.success(res.data.message)

                setTitle('');
                setLink('');
                setTags([]);
                setShowModal(false);

            }
        }
        catch(err){
            console.log(`Error while adding new content ${err}`)
        }

    }

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
            className="hidden md:flex items-center gap-2 text-white px-2.5 py-1 bg-slate-700 text-sm sm:text-md rounded-md"
            onClick={() => setShowModal(true)}
            >
            <FaPlus size={14} /> <span className="text-[16px]">Add Content</span>
            </button>
            <button className="hidden md:flex items-center gap-2 text-white px-2.5 py-1 bg-slate-700 rounded-md text-sm sm:text-md">
            <IoMdShare size={16} /> <span className="text-[16px]">Share Brain</span>
            </button>

            {/* Three dots dropdown for small screens */}
            <div className="md:hidden relative dropdown-container">
                <button
                    onClick={() => setShowDropdown(prev => !prev)}
                    className="p-2"
                >
                    <BsThreeDotsVertical size={20} />
                </button>

                {showDropdown && (
                    <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50 border">
                        <button
                            onClick={() => {
                            setShowModal(true);
                            setShowDropdown(false);
                            }}
                            className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm"
                        >
                            <FaPlus size={14} /> Add Content
                        </button>
                        <button
                            onClick={() => setShowDropdown(false)}
                            className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm"
                        >
                            <IoMdShare size={14} /> Share Brain
                        </button>
                    </div>
                )}
            </div>
        </div>
        

        <div className="mt-4">Card view of links</div>

        {/* Modal */}
        {showModal && (
            <div className="fixed inset-0 bg-transparent bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 backdrop-blur-md rounded-lg w-full max-w-md border border-cyan-700 relative shadow-2xl ">
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
