// src/components/ui/pagination.jsx
import React from 'react';

export const Pagination = ({ children }) => (
  <div className="pagination">
    {children}
  </div>
);

export const PaginationContent = ({ children }) => (
  <div className="pagination-content">
    {children}
  </div>
);

export const PaginationItem = ({ children }) => (
  <div className="pagination-item">
    {children}
  </div>
);
