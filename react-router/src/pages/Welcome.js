import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Welcome = () => {
  return (
    <>
      <h1>The Welcome Page</h1>
      <Link to="new-user">New User</Link>
      <Outlet />
    </>
  );
};

export default Welcome;
