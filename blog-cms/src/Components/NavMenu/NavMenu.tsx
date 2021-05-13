import React from 'react';
import { BrowserRouter as Switch, Link as Route } from 'react-router-dom';

const Dashboard = () => (
  <div>
    <nav>
      <ul>
        <li>
          <Route to="/app/dashboard">Home</Route>
        </li>
        <li>
          <Route to="/app/blogs">Blogs</Route>
        </li>
        <li>
          <Route to="/app/newblog">New Blog</Route>
        </li>
      </ul>
    </nav>
  </div>
);

export default Dashboard;
