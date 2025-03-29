function AuthCard({ children }) {
  return (
    <div className="bg-gray-800 py-8 px-6 shadow-xl rounded-lg border border-gray-700 sm:px-10 backdrop-blur-sm bg-opacity-90">
      {children}
    </div>
  );
}

export default AuthCard;