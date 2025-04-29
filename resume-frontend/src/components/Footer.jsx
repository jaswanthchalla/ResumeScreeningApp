import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Divider,
  Stack,
  IconButton,
  useTheme
} from '@mui/material';
import {
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon
} from '@mui/icons-material';
import Logo from '../assets/logo';

/**
 * Footer component with links and information
 */
function Footer() {
  const theme = useTheme();
  const year = new Date().getFullYear();

  // Footer link sections
  const sections = [
    {
      title: 'Resume Tools',
      links: [
        { label: 'Resume Builder', href: '#' },
        { label: 'Resume Checker', href: '#' },
        { label: 'Resume Examples', href: '#' },
        { label: 'Job Skills Database', href: '#' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Resume Tips', href: '#' },
        { label: 'Career Advice', href: '#' },
        { label: 'Interview Prep', href: '#' },
        { label: 'Blog', href: '#' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Contact', href: '#' },
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' }
      ]
    }
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.mode === 'light'
          ? 'neutral.50'
          : 'neutral.900',
        borderTop: `1px solid ${theme.palette.divider}`,
        mt: 'auto',
        py: 6
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          {/* Logo and company info */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 2
              }}
            >
              <Logo width={32} height={32} />
              <Typography
                variant="h6"
                sx={{
                  ml: 1.5,
                  fontWeight: 700
                }}
              >
                ResuMatch
              </Typography>
            </Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 2, maxWidth: 300 }}
            >
              Professional resume screening and matching platform.
              Find the perfect candidates by analyzing resumes against job descriptions.
            </Typography>

            {/* Social media links */}
            <Stack direction="row" spacing={1}>
              <IconButton
                aria-label="GitHub"
                color="inherit"
                size="small"
              >
                <GitHubIcon fontSize="small" />
              </IconButton>
              <IconButton
                aria-label="LinkedIn"
                color="inherit"
                size="small"
              >
                <LinkedInIcon fontSize="small" />
              </IconButton>
              <IconButton
                aria-label="Twitter"
                color="inherit"
                size="small"
              >
                <TwitterIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Grid>

          {/* Link sections */}
          {sections.map((section) => (
            <Grid item xs={6} sm={4} md={2} key={section.title}>
              <Typography
                variant="subtitle2"
                color="text.primary"
                gutterBottom
                sx={{ fontWeight: 700 }}
              >
                {section.title}
              </Typography>
              <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
                {section.links.map((link) => (
                  <Box component="li" key={link.label} sx={{ py: 0.5 }}>
                    <Link
                      href={link.href}
                      color="text.secondary"
                      underline="hover"
                      sx={{ fontSize: '0.875rem' }}
                    >
                      {link.label}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Copyright */}
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
        >
          © {year} ResuMatch. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
