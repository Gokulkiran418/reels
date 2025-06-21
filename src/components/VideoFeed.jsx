import React from 'react';
import PropTypes from 'prop-types';
import VideoItem from './VideoItem';

// Component to render a vertical scrollable video feed
function VideoFeed({ data }) {
  // Render video items if data exists, otherwise show a fallback message
  return (
    <div className="h-full w-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
      {data.length > 0 ? (
        data.map((item) => (
          <div key={item.id} className="h-screen snap-start">
            {item && <VideoItem item={item} />}
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center h-screen text-white">
          No videos available
        </div>
      )}
    </div>
  );
}

// PropTypes for type checking
VideoFeed.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
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
  })).isRequired,
};

export default VideoFeed;