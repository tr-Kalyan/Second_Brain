import { useState, useEffect } from "react";
import { FiPlay } from "react-icons/fi";

const data = {
  link: "https://www.youtube.com/watch?v=4XVvbZj794o",
  contentType: "YouTube",
  title: "How to land a job in tech",
  tags: ["Job", "Resource"],
};

const tag = data.tags;

const Card = () => {
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoId, setVideoId] = useState<string | null>(null);

  const getYouTubeId = (url: string): string | null => {
    const regularFormat = url.split("v=");
    if (regularFormat.length > 1) return regularFormat[1].split("&")[0];

    const shortFormat = url.split("youtu.be/");
    if (shortFormat.length > 1) return shortFormat[1].split("?")[0];

    return null;
  };

  useEffect(() => {
    const id = getYouTubeId(data.link);
    if (id) {
      setVideoId(id);
      setThumbnail(`https://img.youtube.com/vi/${id}/hqdefault.jpg`);
    }
  }, []);

  return (
    <div style={{ maxWidth: "480px" }}>
      <h3>{data.title}</h3>

      <div style={{ position: "relative", cursor: "pointer" }}>
        {!isPlaying && thumbnail && (
          <>
            <img
              src={thumbnail}
              alt="YouTube Thumbnail"
              style={{ width: "80%", display: "block" }}
              onClick={() => setIsPlaying(true)}
            />
            <div
              onClick={() => setIsPlaying(true)}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-100%, -30%)",
                background: "rgba(0,0,0,0.7)",
                borderRadius: "50%",
                padding: "20px",
              }}
            >
              <FiPlay size={30} color="white" />
            </div>
          </>
        )}

        {isPlaying && videoId && (
          <iframe
            width="100%"
            height="270"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Embedded YouTube"
          />
        )}
      </div>

      <div>
        {tag.map((item, index) => (
          <span key={index} style={{ marginRight: "5px" }}>
            #{item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Card;
