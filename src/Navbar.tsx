import "./App.css";
import { useState } from "react";
import { Link } from 'react-router-dom';
import { IconButton } from '@radix-ui/themes';

interface NavbarProps {
  pages: { href: string; text: string }[];
}

function Navbar({ pages }:NavbarProps) {
  
  const [isSidebarMinimized, setSidebarMinimized] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarMinimized(!isSidebarMinimized);
  }

  return (
    <div className={`sidebar ${isSidebarMinimized ? 'minimized' : ''}`}>
      <IconButton onClick={toggleSidebar}>
      </IconButton>

      {pages.map((page, index) => (
        <Link key={index} to={page.href}>
          {page.text}
        </Link>
      ))}
    </div>
  );
}

export default Navbar;
