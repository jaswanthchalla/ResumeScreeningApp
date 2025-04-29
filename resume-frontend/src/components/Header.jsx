import React, { useContext } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Container,
  useScrollTrigger,
  Slide,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Menu as MenuIcon
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ColorModeContext } from '../contexts/ColorModeContext';
import Logo from '../assets/logo';

// HideOnScroll component that hides the AppBar when scrolling down
function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

/**
 * Header component with navigation and theme toggle
 */
function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const colorMode = useContext(ColorModeContext);
  const location = useLocation();

  // Determine active link based on current path
  const isActive = (path) => location.pathname === path;

  // Navigation links
  const navigationLinks = [
    { title: 'Home', path: '/' },
    { title: 'Upload Resumes', path: '/upload' },
    // { title: 'Results', path: '/results' },
    { title: 'About', path: '/about' },
  ];

  return (
    <HideOnScroll>
      <AppBar
        position="sticky"
        color="default"
        elevation={0}
        sx={{
          backdropFilter: 'blur(8px)',
          backgroundColor: theme.palette.mode === 'light'
            ? 'rgba(255, 255, 255, 0.8)'
            : 'rgba(10, 25, 41, 0.8)',
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            {/* Logo and brand */}
            <Box
              component={Link}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                color: 'inherit'
              }}
            >
              <motion.div
                whileHover={{
                  rotate: [0, -10, 10, -10, 0],
                  transition: { duration: 0.5 }
                }}
              >
                <Logo width={40} height={40} />
              </motion.div>
              <Typography
                variant="h5"
                noWrap
                sx={{
                  ml: 2,
                  fontWeight: 700,
                  letterSpacing: '0.02em',
                  color: 'inherit',
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                ResuMatch
              </Typography>
            </Box>

            {/* Navigation for desktop */}
            {!isMobile ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ mx: 2 }}>
                  {navigationLinks.map((link) => (
                    <Button
                      key={link.path}
                      component={Link}
                      to={link.path}
                      color={isActive(link.path) ? 'primary' : 'inherit'}
                      sx={{
                        mx: 1,
                        fontWeight: 600,
                        position: 'relative',
                        '&::after': isActive(link.path) ? {
                          content: '""',
                          position: 'absolute',
                          width: '60%',
                          height: '2px',
                          bottom: '0',
                          left: '20%',
                          backgroundColor: theme.palette.primary.main,
                          borderRadius: '2px'
                        } : {}
                      }}
                    >
                      {link.title}
                    </Button>
                  ))}
                </Box>

                <IconButton
                  onClick={colorMode.toggleColorMode}
                  color="inherit"
                  aria-label="toggle dark/light mode"
                >
                  {theme.palette.mode === 'dark' ? (
                    <LightModeIcon />
                  ) : (
                    <DarkModeIcon />
                  )}
                </IconButton>
              </Box>
            ) : (
              // Mobile view - just show menu icon and theme toggle
              <Box sx={{ display: 'flex' }}>
                <IconButton
                  color="inherit"
                  aria-label="open menu"
                  edge="start"
                  sx={{ ml: 1 }}
                >
                  <MenuIcon />
                </IconButton>

                <IconButton
                  onClick={colorMode.toggleColorMode}
                  color="inherit"
                  aria-label="toggle dark/light mode"
                >
                  {theme.palette.mode === 'dark' ? (
                    <LightModeIcon />
                  ) : (
                    <DarkModeIcon />
                  )}
                </IconButton>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
}

export default Header;
