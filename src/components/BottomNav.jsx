import React from 'react';

function BottomNav() {
  return (
    <div className="fixed bottom-0 w-full bg-gray-800 p-4 flex justify-around">
      <span>Home</span>
      <span>Shorts</span>
      <span>Add</span>
      <span>Search</span>
      <span>Profile</span>
    </div>
  );
}

export default BottomNav;