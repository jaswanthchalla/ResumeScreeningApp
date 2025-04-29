import React from 'react';

const Logo = ({ className = '', width = 40, height = 40 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="40" height="40" rx="8" fill="#0EA5E9" />
      <path
        d="M10 11.25C10 10.5596 10.5596 10 11.25 10H28.75C29.4404 10 30 10.5596 30 11.25V28.75C30 29.4404 29.4404 30 28.75 30H11.25C10.5596 30 10 29.4404 10 28.75V11.25Z"
        stroke="white"
        strokeWidth="2"
      />
      <path
        d="M15 15H25"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M15 20H25"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M15 25H20"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="25" cy="25" r="2.5" fill="white" />
    </svg>
  );
};

export default Logo;
