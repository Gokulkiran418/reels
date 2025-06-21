import { useState, useEffect, useMemo } from 'react';
import './App.css';
import VideoFeed from './components/VideoFeed';
import BottomNav from './components/BottomNav';
import ProfilePage from './components/ProfilePage'; // <-- OK to import here
import mockData from './data/mockData.json';
import PropTypes from 'prop-types';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Login'; // You can create a dummy login screen

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [userID, setUserID] = useState('guest'); // Simulate logged in user

  const memoizedData = useMemo(() => data, [data]);

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

  const handleLogin = () => {
    setUserID('loggedInUser');
  };

  const handleLogout = () => {
    setUserID(null);
  };

  if (!userID) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="flex items-center justify-center bg-black min-h-screen">
            <div
              id="playerContainer"
              className={`relative bg-gray-900 overflow-hidden shadow-lg 
              ${isFullscreen
                ? 'w-screen h-screen'
                : 'w-full h-[calc(100vh-50px)] sm:w-[360px] sm:h-[620px] md:w-[360px] md:h-[620px] lg:w-[600px] lg:h-[calc(100vh-60px)]'
              } rounded-none sm:rounded-xl`}
              style={{ marginTop: 'env(safe-area-inset-top)' }}
            >
              <VideoFeed data={memoizedData} />
              <BottomNav />
              <button
                onClick={handleLogout}
                className="absolute top-2 right-2 text-sm text-white bg-red-500 px-3 py-1 rounded z-50"
              >
                Logout
              </button>
            </div>
          </div>
        }
      />
      <Route path="/profile/:username" element={<ProfilePage />} />
    </Routes>
  );
}

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
