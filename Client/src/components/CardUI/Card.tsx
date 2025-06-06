import { useState } from "react";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import { BiExpand } from "react-icons/bi";
import { FaLinkedin, FaGithub, FaLink } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { SiMedium, SiNotion } from "react-icons/si";
import CardModal from "./cardModal";
import ConfirmDeleteModal from "./DeleteModal";
import { format } from 'date-fns';

const contentTypeIcons: Record<string, React.ReactNode> = {
  YouTube: <IoLogoYoutube size={20} className="text-red-600" />,
  Medium: <SiMedium size={20} className="text-black" />,
  Linkedin: <FaLinkedin size={20} className="text-blue-600" />,
  Link: <FaLink size={20} className="text-purple-600" />,
  Github: <FaGithub size={20} />,
  Notion: <SiNotion size={20} />,
  Twitter: <FaXTwitter size={18} />
};

interface CardProps {
  title: string;
  link: string;
  contentType: string;
  thumbnail?: string;
  onDelete?: () => void;
  onEdit?: () => void;
  tags: string[] | null;
  date?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  link,
  onDelete,
  tags,
  onEdit,
  contentType,
  thumbnail,
  date
}) => {
  const [showFullTitle, setShowFullTitle] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <>
      <div className="w-full  bg-gradient-to-b from-white to-violet-100 dark:bg-slate-200 p-4 rounded-lg shadow-lg relative">
        {/* Card Header */}
        
        <div className="flex justify-between items-start  rounded-md gap-1 pb-3 mb-3">
          <div
            className="relative pr-2 w-[90%] border-b border-green-900"
            onMouseEnter={() => setShowFullTitle(true)}
            onMouseLeave={() => setShowFullTitle(false)}
            onClick={() => setShowFullTitle(!showFullTitle)}
          >
            <h1 className="text-lg font-semibold text-black line-clamp-2 h-[3.5rem]">
              {title}
            </h1>

            {showFullTitle && (
              <div className="absolute z-10 -top-10 left-0 right-0 p-2 bg-gray-800 text-white text-xs rounded-md shadow-lg opacity-95">
                {title}
              </div>
            )}
          </div>

          <div
            className="flex justify-center items-end text-center py-1 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <BiExpand size={20} />
          </div>
          
        </div>

        {/* Thumbnail or Link Placeholder */}
        {thumbnail ? (
          <a href={link} target="_blank" rel="noopener noreferrer">
            <img
              src={thumbnail}
              alt="Preview"
              className="w-full h-40 object-cover mx-auto rounded-md mb-3 transition-all duration-300"
            />
          </a>
        ) : (
          <div className="flex-grow flex items-center justify-center h-48 bg-gray-100 rounded-md mb-3">
            <p className="text-blue-600 underline break-all text-center p-2">
              <a href={link} target="_blank" rel="noopener noreferrer">
                {link}
              </a>
            </p>
          </div>
        )}

        {/* Tags section */}
        <div className="relative group">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap text-ellipsis max-w-full">
            {tags?.map((tag, index) => (
              <span
                key={index}
                className="inline-block bg-slate-800 px-2 py-1 rounded-lg text-xs font-semibold text-white whitespace-nowrap"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="absolute top-full left-0 z-10 mt-2 hidden group-hover:block bg-gradient-to-r from-orange-300 to-stone-400 border shadow-lg rounded-md p-2 max-w-xs w-fit">
            <div className="flex flex-wrap gap-2">
              {tags?.map((tag, index) => (
                <span
                  key={index}
                  className="inline-block bg-slate-800 px-2 py-1 text-white rounded-lg text-xs font-semibold whitespace-nowrap"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-4">
          <div className="flex items-center justify-start w-full">
            {contentTypeIcons[contentType] || <FaLink size={20} />}
          </div>
            
          {onEdit && (
            <button onClick={onEdit}>
              <MdOutlineEdit className="text-xl cursor-pointer text-gray-600 hover:text-black" />
            </button>
          )}
          
            
          { onDelete && (
          <button onClick={() => setShowDeleteModal(true)} className="flex-shrink-0">
            <MdDelete className="text-xl cursor-pointer text-slate-700 hover:text-red-700" />
          </button>)
          }     

        </div>
        <div>
          {date && (
            <p className="text-sm text-red-900 font-light mt-3">
              Added on: {format(new Date(date), 'dd MMM yyyy')}
            </p>
          )}
        </div>
      </div>

      {/* Modal */}
      <CardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        link={link}
        thumbnail={thumbnail}
        tags={tags || []}
        contentType={contentType}
      />

      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={() => {
          if (onDelete){
            onDelete();
          }
          
          setShowDeleteModal(false);
        }}
      />
    </>
  );
};

export default Card;
