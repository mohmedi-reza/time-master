import React from "react";
import { Outlet } from "react-router-dom";

const PublicLayout: React.FC = () => {
  return (
    <div>
      <header>Public Header</header>
      <main>
        <Outlet />
      </main>
      <footer>Public Footer</footer>
    </div>
  );
};

export default PublicLayout;
