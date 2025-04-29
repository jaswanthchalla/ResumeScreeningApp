import React from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

/**
 * Main layout component that wraps the application content
 * Includes header, main content area, and footer
 */
function Layout({ children }) {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      width: '100%'
    }}>
      {/* Skip link for accessibility */}
      <a
        href="#main-content"
        className="skip-link"
      >
        Skip to main content
      </a>

      <Header />

      <Box
        component="main"
        id="main-content"
        tabIndex={-1}
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {children}
      </Box>

      <Footer />
    </Box>
  );
}

export default Layout;
