// src/components/ui/card.jsx
import React from 'react';

export const Card = ({ children }) => (
  <div className="card">
    {children}
  </div>
);

export const CardHeader = ({ children }) => (
  <div className="card-header">
    {children}
  </div>
);

export const CardTitle = ({ children }) => (
  <div className="card-title">
    {children}
  </div>
);

export const CardDescription = ({ children }) => (
  <div className="card-description">
    {children}
  </div>
);

export const CardContent = ({ children }) => (
  <div className="card-content">
    {children}
  </div>
);

export const CardFooter = ({ children }) => (
  <div className="card-footer">
    {children}
  </div>
);
