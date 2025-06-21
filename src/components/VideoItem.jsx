import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  Heart,
  MessageCircle,
  Share2,
  IndianRupee,
  MoreVertical,
  Volume2,
  VolumeX,
  Pause,
  Play,
} from 'lucide-react';
import PropTypes from 'prop-types';

const VideoItem = React.memo(({ item }) => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [likes, setLikes] = useState(item.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!item) return null;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.8) {
            videoRef.current.play().catch(() => {});
            setIsPlaying(true);
            setShowControls(false);
          } else {
            videoRef.current.pause();
            setIsPlaying(false);
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

  const handleVideoClick = useCallback(() => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
      setShowControls(false);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
      setShowControls(true);
    }
  }, []);

  const toggleMute = useCallback(() => {
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  }, [isMuted]);

  const handleFullscreen = useCallback(() => {
    const container = document.getElementById('playerContainer');
    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen();
    }
  }, []);

  const handleLike = useCallback(() => {
    setIsLoading(true);
    const previousLikes = likes;
    const previousIsLiked = isLiked;

    // Optimistic update
    setIsLiked(true);
    setLikes((prev) => prev + 1);

    // Simulated API call
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% success rate
      if (!success) {
        setIsLiked(previousIsLiked);
        setLikes(previousLikes);
      }
      setIsLoading(false);
    }, 1500);
  }, [likes, isLiked]);

  return (
    <div className="relative h-full w-full bg-transparent">
      <div className="relative h-full w-full">
        <video
          ref={videoRef}
          src={item.videoUrl}
          className="h-full w-full object-cover"
          muted={isMuted}
          onClick={handleVideoClick}
          onEnded={() => setTimeout(() => videoRef.current.play(), 1000)}
        />
        {showControls && (isPlaying ? (
          <Pause className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white w-12 h-12 opacity-50 hover:opacity-100 cursor-pointer" />
        ) : (
          <Play className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white w-12 h-12 opacity-50 hover:opacity-100 cursor-pointer" />
        ))}
      </div>
      <button
        onClick={toggleMute}
        className="absolute top-4 left-4 bg-black bg-opacity-50 p-2 rounded-lg z-20"
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? (
          <VolumeX className="w-6 h-6 text-white" />
        ) : (
          <Volume2 className="w-6 h-6 text-white" />
        )}
      </button>
      <div className="absolute bottom-10 left-4 text-white text-xs max-w-[70%] z-10 sm:max-w-[80%]">
        <p className="text-sm font-semibold text-yellow-400 mb-1">
          #{item.title.split(' ')[0]} <span className="text-[12px] font-light">{item.episode}</span>
        </p>
        <div className="flex items-center mb-1">
          <img
            src={item.userImage}
            alt={item.userName}
            className="w-6 h-6 rounded-full mr-2"
          />
          <span className="text-sm mr-2">{item.userName}</span>
          <button
            onClick={() => setIsFollowing(!isFollowing)}
            className="px-2 py-1 text-xs border border-white rounded bg-transparent hover:bg-white hover:text-black transition duration-200"
            aria-label={isFollowing ? 'Unfollow' : 'Follow'}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </button>
        </div>
        <p
          className={`text-sm text-gray-300 cursor-pointer transition-all duration-200 ease-in-out ${
            showFullDesc ? '' : 'line-clamp-3'
          }`}
          onClick={() => setShowFullDesc(!showFullDesc)}
        >
          {item.description}
        </p>
      </div>
      <div className="absolute bottom-32 right-4 flex flex-col items-center space-y-4 text-sm text-white z-10">
        <div className="flex flex-col items-center">
          <button
            onClick={handleLike}
            disabled={isLoading}
            className="focus:outline-none"
            aria-label={isLiked ? 'Unlike' : 'Like'}
          >
            <Heart
              className={`w-6 h-6 mb-1 ${isLiked ? 'text-red-500 fill-current' : 'text-white'}`}
            />
          </button>
          <span>{likes.toLocaleString()}</span>
        </div>
        <div className="flex flex-col items-center">
          <MessageCircle className="w-6 h-6 mb-1" />
          <span>{item.comments.toLocaleString()}</span>
        </div>
        <div className="flex flex-col items-center">
          <Share2 className="w-6 h-6 mb-1" />
          <span>{item.shares.toLocaleString()}</span>
        </div>
        <div className="flex flex-col items-center">
          <IndianRupee className="w-6 h-6 mb-1" />
          <span>{item.earnings.toLocaleString()}</span>
        </div>
        <MoreVertical className="w-6 h-6" />
      </div>
      <div className="absolute bottom-6 right-4 flex flex-col items-end space-y-3 text-sm z-20">
        {item.isPaid && (
          <span className="px-2 py-1 border border-yellow-400 text-yellow-400 rounded bg-transparent">
            Paid
          </span>
        )}
        <button
          onClick={handleFullscreen}
          className="px-2 py-1 border border-white text-white rounded bg-transparent hover:bg-white hover:text-black transition duration-200"
          aria-label="Toggle Fullscreen"
        >
          ⛶
        </button>
      </div>
    </div>
  );
});

VideoItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    videoUrl: PropTypes.string.isRequired,
    userImage: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    episode: PropTypes.string,
    description: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    comments: PropTypes.number.isRequired,
    shares: PropTypes.number.isRequired,
    earnings: PropTypes.number.isRequired,
    isPaid: PropTypes.bool.isRequired,
  }).isRequired,
};

export default VideoItem;