// components/VideoFeed.jsx
import React, { useState, useEffect, useCallback } from 'react';
import VideoItem from './VideoItem';
import PropTypes from 'prop-types';
import mockData from '../data/mockData.json';

const VIDEOS_PER_PAGE = 5;

const VideoFeed = React.memo(({ data }) => {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreVideos = useCallback(() => {
    const start = (page - 1) * VIDEOS_PER_PAGE;
    const end = start + VIDEOS_PER_PAGE;
    const slice = data.slice(start, end);

    if (slice.length === 0) {
      setHasMore(false);
      return;
    }

    setVideos((prev) => [...prev, ...slice]);
    setPage((prev) => prev + 1);
  }, [page, data]);

  useEffect(() => {
    // initial load
    fetchMoreVideos();
  }, []); // eslint-disable-line

  // When user scrolls to bottom, load next page
  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (hasMore && scrollTop + clientHeight >= scrollHeight - 2) {
      fetchMoreVideos();
    }
  };

  return (
    <div
    onScroll={handleScroll}
    className="scrollbar-hidden"
    style={{
      height: 'calc(100vh - 50px)',
      overflowY: 'auto',
      scrollSnapType: 'y mandatory',
    }}
>

      {videos.map((item, idx) => (
        <div
          key={`${item.id}_${idx}`}        // avoid duplicate keys
          style={{
            height: 'calc(100vh - 50px)',
            scrollSnapAlign: 'start',
          }}
        >
          <VideoItem item={item} />
        </div>
      ))}

      {!hasMore && (
        <div className="flex items-center justify-center text-white h-12">
          No more videos to load
        </div>
      )}
    </div>
  );
});

VideoFeed.propTypes = {
  data: PropTypes.array.isRequired,
};

export default VideoFeed;
