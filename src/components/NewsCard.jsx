function NewsCard({ title, excerpt, category, image, date }) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105">
      <div className="relative">
        <img className="w-full h-48 object-cover" src={image} alt={title} />
        <div className="absolute top-0 right-0 bg-purple-600 text-white text-xs font-bold px-2 py-1 m-2 rounded">
          {category}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">{title}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-3">{excerpt}</p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">{date}</span>
          <button className="text-purple-400 hover:text-purple-300 text-sm font-medium">
            Read More →
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;