import React from 'react';
import { PlayCircle, Video, PlusCircle, Search } from 'lucide-react';
import PropTypes from 'prop-types';

// Component for the bottom navigation bar with dummy icons
function BottomNav() {
  return (
    <div className="absolute bottom-0 w-full bg-gray-900 p-2 flex justify-around items-center border-t border-gray-700 z-50">
      <PlayCircle className="text-white w-6 h-6" />
      <Video className="text-white w-6 h-6" />
      <PlusCircle className="text-white w-6 h-6" />
      <Search className="text-white w-6 h-6" />
      <div className="w-6 h-6 rounded-full overflow-hidden border border-white">
        <img
          src="/assets/images/profile.jpg"
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

// PropTypes for type checking (no props currently, but included for future extensibility)
BottomNav.propTypes = {
  // Add props here if needed in the future
};

export default BottomNav;