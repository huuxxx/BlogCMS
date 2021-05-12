import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const Dashboard = () => (
  <div>
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/dashboard">Home</Link>
            </li>
            <li>
              <Link to="/blogs">Blogs</Link>
            </li>
            <li>
              <Link to="/newblog">New Blog</Link>
            </li>
          </ul>
        </nav>
      </div>
    </Router>
  </div>
);

export default Dashboard;
