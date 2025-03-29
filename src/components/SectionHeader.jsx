import React from 'react';

function SectionHeader({ title, subtitle }) {
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
        {title}
      </h2>
      <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-400 sm:mt-4">
        {subtitle}
      </p>
    </div>
  );
}

export default SectionHeader;