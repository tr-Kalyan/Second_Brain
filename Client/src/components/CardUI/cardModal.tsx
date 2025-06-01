
interface CardModalProps {
    isOpen:boolean;
    onClose: () => void;
    title:string;
    link:string;
    thumbnail?:string;
    tags:string[];
    contentType:string;
}

const CardModal: React.FC<CardModalProps> = ({
    isOpen,
    onClose,
    title,
    link,
    thumbnail,
    tags,
    contentType,
}) => {
    if (!isOpen) return null;

    return(
        <div className="fixed inset-0 z-50 bg-transparent backdrop-blur-xs flex items-center justify-center px-4">
            <div className="bg-gradient-to-r from-slate-300 to-gray-300 rounded-lg max-w-lg w-full p-6 relative shadow-xl">
                <button
                    className="absolute top-2 right-2 text-xl font-bold cursor-pointer text-gray-500 hover:text-black"
                    onClick={onClose}
                >
                &times;
                </button>
                <h2 className="text-xl font-semibold mb-3">{title}</h2>

                {thumbnail ? 
                    (
                        <img src={thumbnail} alt="Preview" className="w-full max-h-60 object-cover mb-4 rounded" />
                    ):(
                        <div className="h-48 bg-gray-200 rounded flex items-center justify-center mb-4">
                            <a href={link} className="text-blue-600 underline break-all text-center" target="_blank" rel="noreferrer">
                            {link}
                            </a>
                        </div>
                    )
                }

                <p className="text-sm text-gray-700 mb-2">
                    Link:{" "}
                    <a href={link} className="text-blue-600 underline break-all" target="_blank" rel="noreferrer">
                        {link}
                    </a>
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                    {tags?.map((tag, idx) => (
                        <span key={idx} className="bg-slate-800 text-white text-xs px-2 py-1 rounded">
                        #{tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CardModal;