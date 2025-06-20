import React, { useRef, useState, useEffect } from 'react';
import {
  Heart,
  MessageCircle,
  Share2,
  IndianRupee,
  MoreVertical,
  Volume2,
  VolumeX
} from 'lucide-react';

function VideoItem({ item }) {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.8) {
            videoRef.current.play().catch(() => {});
          } else {
            videoRef.current.pause();
          }
        });
      },
      { threshold: 0.8 }
    );
    if (videoRef.current) observer.observe(videoRef.current);
    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, []);

  const handleVideoClick = () => {
    if (videoRef.current.paused) videoRef.current.play();
    else videoRef.current.pause();
  };
  const toggleMute = () => {
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };
  const handleFullscreen = () => {
    const container = document.getElementById('playerContainer');
    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="relative h-full w-full bg-black">
      {/* Video */}
      <video
        ref={videoRef}
        src={item.videoUrl}
        className="h-full w-full object-cover"
        muted={isMuted}
        onClick={handleVideoClick}
        onEnded={() => setTimeout(() => videoRef.current.play(), 1000)}
      />

      {/* Mute Toggle */}
      <button
        onClick={toggleMute}
        className="absolute top-4 left-4 bg-black bg-opacity-50 p-1 rounded z-20"
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-white" />
        ) : (
          <Volume2 className="w-5 h-5 text-white" />
        )}
      </button>

      {/* Left Overlay */}
      <div className="absolute bottom-20 left-3 text-white text-xs max-w-[70%] z-10">
        <p className="text-sm font-semibold text-yellow-400 mb-1">
          #{item.title.split(' ')[0]} <span className="text-[10px] font-light">{item.episode}</span>
        </p>
        <div className="flex items-center mb-1">
          <img
            src={item.userImage}
            alt={item.userName}
            className="w-6 h-6 rounded-full mr-2"
          />
          <span className="text-xs mr-2">{item.userName}</span>
          <button
            onClick={() => setIsFollowing(!isFollowing)}
            className="px-2 py-0.5 text-xs border border-white rounded bg-transparent hover:bg-white hover:text-black transition"
          >
            {isFollowing ? 'Following' : 'Follow'}
          </button>
        </div>
        <p
        className={`text-[11px] text-gray-300 cursor-pointer transition-all duration-200 ease-in-out ${
          showFullDesc ? '' : 'line-clamp-3'
        }`}
        onClick={() => setShowFullDesc(!showFullDesc)}
      >
        {item.description}
      </p>
      </div>

      {/* Right‑side Stats (aligned to follow button) */}
      <div className="absolute bottom-44 right-3 flex flex-col items-center space-y-3 text-xs text-white z-10">
        <div className="flex flex-col items-center">
          <Heart className="w-5 h-5 mb-1" />
          <span>{item.likes.toLocaleString()}</span>
        </div>
        <div className="flex flex-col items-center">
          <MessageCircle className="w-5 h-5 mb-1" />
          <span>{item.comments.toLocaleString()}</span>
        </div>
        <div className="flex flex-col items-center">
          <Share2 className="w-5 h-5 mb-1" />
          <span>{item.shares.toLocaleString()}</span>
        </div>
        <div className="flex flex-col items-center">
          <IndianRupee className="w-5 h-5 mb-1" />
          <span>{item.earnings.toLocaleString()}</span>
        </div>
        <MoreVertical className="w-5 h-5" />
      </div>

      {/* Paid + Fullscreen Buttons (bottom‑right) */}
            <div className="absolute bottom-20 right-3 flex flex-col items-end space-y-2 text-xs z-20">
        {item.isPaid && (
          <span className="px-2 py-0.5 border border-yellow-400 text-yellow-400 rounded bg-transparent">
            Paid
          </span>
        )}
        <button
          onClick={handleFullscreen}
          className="px-2 py-0.5 border border-white text-white rounded bg-transparent hover:bg-white hover:text-black transition"
        >
          ⛶ 
        </button>
      </div>
    </div>
    
  );
}

export default VideoItem;
