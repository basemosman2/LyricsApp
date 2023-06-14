import React from 'react';

const Error = ({ title }) => (
  <div
    className="bg-gradient-to-lr from-black to-[#121286] border-l-4 border-orange-500 text-white p-4 "
    role="alert"
  >
    <p className="font-bold text-orange-300">Be Warned</p>
    {
      title || <p>Something not ideal might be happening Try Again Later.</p>
    }
  </div>
);

export default Error;
