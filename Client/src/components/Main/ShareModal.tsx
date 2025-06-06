import { useState } from 'react';
import { FaRegCopy, FaWhatsapp } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";

interface ShareModalProps {
  shareLink: string;
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ shareLink, onClose }) => {
  const [copied, setCopied] = useState(false);
  const encodedLink = encodeURIComponent(shareLink);
  const encodedText = encodeURIComponent("Check out my brain dump!");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-transparent backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative bg-white rounded-lg p-6 shadow-lg w-[90%] max-w-md">
        {/* Close Icon */}
        <button
          className="absolute top-3 right-3 text-2xl cursor-pointer font-bold text-gray-500 hover:text-black"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-4">Share your brain 🧠</h2>

        <div className="relative mb-4">
          <input
            type="text"
            value={shareLink}
            readOnly
            className="w-full p-2 border rounded pr-10"
          />
          <button
            onClick={handleCopy}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-600 hover:text-black"
            title="Copy link"
          >
            <FaRegCopy size={20} />
          </button>
        </div>

        {copied && (
          <p className="text-green-600 text-sm mb-2">Link copied to clipboard!</p>
        )}

        <div className="flex justify-between gap-4 mb-2 mt-6">
          <a
            href={`https://wa.me/?text=${encodedText}%20${encodedLink}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp className="text-green-500" size={26} />
          </a>
          <a
            href={`mailto:?subject=My Brain Dump&body=${encodedText}%20${encodedLink}`}
          >
            <BiLogoGmail className="text-red-600" size={26} />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodedText}%20${encodedLink}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaXTwitter size={20} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
