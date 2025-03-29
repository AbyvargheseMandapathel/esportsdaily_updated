function CompactNewsCard({ title, category, image, date }) {
    return (
      <div className="flex items-center bg-gray-800 rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:bg-gray-750 hover:shadow-lg group">
        <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32">
          <img className="w-full h-full object-cover" src={image} alt={title} />
        </div>
        <div className="p-3 flex-1">
          <div className="flex items-center mb-1">
            <span className="text-xs font-medium text-purple-400 mr-2">{category}</span>
            <span className="text-xs text-gray-500">{date}</span>
          </div>
          <h3 className="text-sm sm:text-base font-semibold text-white line-clamp-2 group-hover:text-purple-300 transition-colors duration-200">
            {title}
          </h3>
          <button className="mt-2 text-xs text-white bg-purple-500 hover:bg-purple-600 px-2 py-1 rounded flex items-center transition-all duration-200">
            Read More
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div className="pr-3 text-gray-400 group-hover:text-purple-400 transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    );
  }
  
  export default CompactNewsCard;