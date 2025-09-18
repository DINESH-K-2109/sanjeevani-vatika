// src/components/ui/dropdown-menu.jsx
import React from 'react';

export const DropdownMenu = ({ children }) => {
  return <div className="dropdown-menu">{children}</div>;
};

export const DropdownMenuTrigger = ({ children, onClick }) => {
  return (
    <button className="dropdown-menu-trigger" onClick={onClick}>
      {children}
    </button>
  );
};

export const DropdownMenuContent = ({ children }) => {
  return <div className="dropdown-menu-content">{children}</div>;
};

export const DropdownMenuItem = ({ children, onClick }) => {
  return (
    <div className="dropdown-menu-item" onClick={onClick}>
      {children}
    </div>
  );
};
