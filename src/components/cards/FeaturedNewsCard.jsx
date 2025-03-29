function FeaturedNewsCard({ title, excerpt, category, image, date }) {
    return (
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-purple-900/30 hover:shadow-xl border-l-4 border-purple-600">
        <div className="md:flex">
          <div className="md:w-2/5 relative">
            <img className="w-full h-48 md:h-full object-cover" src={image} alt={title} />
            <div className="absolute top-0 left-0 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-br">
              {category}
            </div>
          </div>
          <div className="p-5 md:w-3/5 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
              <p className="text-gray-300 mb-4 line-clamp-3">{excerpt}</p>
            </div>
            <div className="flex justify-between items-center mt-auto">
              <span className="text-xs text-gray-400">{date}</span>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center">
                Read More
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default FeaturedNewsCard;