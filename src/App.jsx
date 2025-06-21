import { useState, useEffect, useMemo } from 'react';
import './App.css';
import VideoFeed from './components/VideoFeed';
import BottomNav from './components/BottomNav';
import mockData from './data/mockData.json';
import PropTypes from 'prop-types';

// Main application component
function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Memoize the data transformation if needed (e.g., sorting, filtering)
  const memoizedData = useMemo(() => data, [data]);

  // Load mock data with a delay and handle fullscreen changes
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      try {
        setData(mockData);
        setLoading(false);
      } catch {
        setError('Failed to load videos, please try again later');
        setLoading(false);
      }
    }, 2000);

    const onFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        Loading...
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center bg-black min-h-screen">
      <div
        id="playerContainer"
        className={`relative bg-gray-900 overflow-hidden shadow-lg 
          ${isFullscreen
            ? 'w-screen h-screen'
            : 'w-full h-[calc(100vh-50px)] sm:w-[360px] sm:h-[620px] md:w-[360px] md:h-[620px] lg:w-[600px] lg:h-[calc(100vh-60px)]'
          } rounded-none sm:rounded-xl`}
        style={{ marginTop: 'env(safe-area-inset-top)' }} // Handle iOS safe area
      >
        <VideoFeed data={memoizedData} />
        <BottomNav />
      </div>
    </div>
  );
}

// PropTypes for type checking
App.propTypes = {
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
  })),
};

export default App;