import React from 'react';
import { PlayCircle, Video, PlusCircle, Search } from 'lucide-react';
import PropTypes from 'prop-types';

// Component for the bottom navigation bar with dummy icons
const BottomNav = React.memo(() => {
  return (
    <div className="fixed bottom-0 w-full bg-gray-900 p-2 flex justify-around items-center border-t border-gray-700 z-50 sm:p-3 lg:max-w-[600px] lg:mx-auto">
      <PlayCircle className="text-white w-6 h-6 sm:w-7 sm:h-7" />
      <Video className="text-white w-6 h-6 sm:w-7 sm:h-7" />
      <PlusCircle className="text-white w-6 h-6 sm:w-7 sm:h-7" />
      <Search className="text-white w-6 h-6 sm:w-7 sm:h-7" />
      <div className="w-6 h-6 rounded-full overflow-hidden border border-white sm:w-7 sm:h-7">
        <img
          src="/assets/images/profile.jpg" // Assuming you've moved the image to /src/assets/images/
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
});

// PropTypes for type checking (no props currently, but included for future extensibility)
BottomNav.propTypes = {
  // Add props here if needed in the future
};

export default BottomNav;