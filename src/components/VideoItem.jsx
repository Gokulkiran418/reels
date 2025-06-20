import React from 'react';

function VideoItem({ item }) {
  return (
    <div className="relative h-full w-full bg-gray-800">
      <p>Video for {item.title}</p>
    </div>
  );
}

export default VideoItem;