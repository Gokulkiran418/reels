import { useState, useEffect, useMemo } from 'react';
import './App.css';
import VideoFeed from './components/VideoFeed';
import BottomNav from './components/BottomNav';
import Login from './components/Login';
import mockData from './data/mockData.json';

function App() {
  const [data, setData] = useState([]);
  const [userID, setUserID] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const memoizedData = useMemo(() => data, [data]);

  useEffect(() => {
    // Load userID from localStorage
    const storedUser = localStorage.getItem('userID');
    if (storedUser) setUserID(storedUser);

    setLoading(true);
    setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 1000);

    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  const handleLogin = (id) => setUserID(id);
  const handleLogout = () => {
    localStorage.removeItem('userID');
    setUserID(null);
  };

  if (!userID) return <Login onLogin={handleLogin} />;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        Loading...
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
  );
}

export default App;
