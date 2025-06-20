import React from 'react';

function VideoFeed({ data }) {
  return (
    <div className="h-screen overflow-y-auto scroll-snap-type-y mandatory">
      {data.map((item) => (
        <div key={item.id} className="h-screen scroll-snap-align-start">
          <p>Video Item {item.id}</p>
        </div>
      ))}
    </div>
  );
}

export default VideoFeed;