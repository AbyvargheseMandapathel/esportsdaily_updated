import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => (
  <Link to="/" className="text-xl font-bold">
    <span className="text-purple-500">e</span>
    <span className="text-purple-800">Sports</span>
    <span className="text-purple-500"> Daily</span>
  </Link>
);

export default Logo;