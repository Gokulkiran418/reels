import React from 'react';
import VideoItem from './VideoItem';

function VideoFeed({ data }) {
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

export default VideoFeed;