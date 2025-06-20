import { useState, useEffect } from 'react';
import './App.css';
import VideoFeed from './components/VideoFeed';
import mockData from './data/mockData.json';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      try {
        // Simulate API response with mock data
        setData(mockData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load videos, please try again later');
        setLoading(false);
      }
    }, 1000); // 1-second delay to simulate API call
  }, []);

  if (loading) return <div className="flex justify-center items-center h-screen text-white">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <VideoFeed data={data} />
    </div>
  );
}

export default App;