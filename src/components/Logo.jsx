import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => (
  <Link to="/" className="text-xl font-bold">
    <span className="text-blue-400">e</span>
    <span className="text-indigo-600">Sports</span>
    <span className="text-blue-400"> Daily</span>
  </Link>
);

export default Logo;