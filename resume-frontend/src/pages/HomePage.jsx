import React from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Stack,
  useTheme
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  Analytics as AnalyticsIcon,
  Psychology as PsychologyIcon,
  Biotech as BiotechIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';

// Animation variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

/**
 * Feature card component displaying a single feature
 */
const FeatureCard = ({ icon, title, description }) => {
  const theme = useTheme();

  return (
    <motion.div variants={itemVariants}>
      <Card
        elevation={0}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          p: 1,
          borderRadius: 3,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
          }
        }}
      >
        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          <Box
            sx={{
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 60,
              height: 60,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
              color: 'white',
              fontSize: '2rem',
              mx: 'auto'
            }}
          >
            {icon}
          </Box>

          <Typography
            variant="h5"
            component="h3"
            textAlign="center"
            gutterBottom
            sx={{ fontWeight: 600 }}
          >
            {title}
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            textAlign="center"
          >
            {description}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
};

/**
 * HomePage component with hero section and features
 */
function HomePage() {
  const theme = useTheme();

  const features = [
    {
      icon: <CloudUploadIcon fontSize="inherit" />,
      title: 'Effortless Uploads',
      description: 'Easily upload multiple resumes and job descriptions with our intuitive drag-and-drop interface.'
    },
    {
      icon: <BiotechIcon fontSize="inherit" />,
      title: 'Smart Matching',
      description: 'Our algorithm analyzes content, structure, and semantics to find the best candidates for your role.'
    },
    {
      icon: <AnalyticsIcon fontSize="inherit" />,
      title: 'Detailed Analysis',
      description: 'Get comprehensive reports with skill matches, semantic similarity, and overall scores.'
    },
    {
      icon: <PsychologyIcon fontSize="inherit" />,
      title: 'AI-Powered',
      description: 'Advanced natural language processing identifies skills and experience that traditional keyword matching misses.'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          background: theme.palette.mode === 'light'
            ? 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)'
            : 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          pt: { xs: 8, md: 12 },
          pb: { xs: 10, md: 16 },
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Background decoration */}
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            background: `radial-gradient(circle at 20% 80%, ${theme.palette.primary.main}22 0%, transparent 25%),
                        radial-gradient(circle at 80% 30%, ${theme.palette.secondary.main}22 0%, transparent 20%)`,
            zIndex: 0,
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={5} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                <Typography
                  variant="h1"
                  component="h1"
                  sx={{
                    fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                    fontWeight: 800,
                    lineHeight: 1.2,
                    mb: 3,
                    background: 'linear-gradient(90deg, #0ea5e9 0%, #14b8a6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Find the Perfect Candidates Fast
                </Typography>

                <Typography
                  variant="h5"
                  component="p"
                  color="text.secondary"
                  sx={{ mb: 4, maxWidth: '90%' }}
                >
                  AI-powered resume screening that matches the right people to the right roles,
                  saving you time and improving hiring quality.
                </Typography>

                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={2}
                >
                  <Button
                    component={RouterLink}
                    to="/upload"
                    variant="contained"
                    color="primary"
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      py: 1.5,
                      px: 3,
                      fontSize: '1.1rem',
                      borderRadius: 2,
                    }}
                  >
                    Get Started
                  </Button>

                  <Button
                    component={RouterLink}
                    to="/about"
                    variant="outlined"
                    color="primary"
                    size="large"
                    sx={{
                      py: 1.5,
                      px: 3,
                      fontSize: '1.1rem',
                      borderRadius: 2,
                    }}
                  >
                    Learn More
                  </Button>
                </Stack>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: '10%',
                      right: '5%',
                      width: '80%',
                      height: '80%',
                      borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                      background: `linear-gradient(135deg, ${theme.palette.primary.light}33 0%, ${theme.palette.primary.main}22 100%)`,
                      zIndex: -1,
                    },
                  }}
                >
                  <img
                    src="https://ext.same-assets.com/3906826159/3669510226.webp"
                    alt="Resume Screening Example"
                    style={{
                      width: '100%',
                      maxWidth: '500px',
                      height: 'auto',
                      display: 'block',
                      margin: '0 auto',
                      borderRadius: '12px',
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <Typography
              variant="h2"
              component="h2"
              textAlign="center"
              sx={{
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}
            >
              How It Works
            </Typography>

            <Typography
              variant="h6"
              component="p"
              textAlign="center"
              color="text.secondary"
              sx={{ mb: 8, maxWidth: '700px', mx: 'auto' }}
            >
              Our powerful resume screening tool uses advanced AI to match candidates to job descriptions
              with incredible accuracy
            </Typography>

            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <FeatureCard {...feature} />
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: { xs: 8, md: 10 },
          background: theme.palette.mode === 'light'
            ? 'linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 100%)'
            : 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        }}
      >
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Box
              sx={{
                textAlign: 'center',
                p: { xs: 4, md: 8 },
                borderRadius: 4,
                backgroundColor: theme.palette.background.paper,
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Typography
                variant="h3"
                component="h2"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '1.75rem', md: '2.5rem' },
                  mb: 2,
                }}
              >
                Ready to Find the Best Candidates?
              </Typography>

              <Typography
                variant="h6"
                component="p"
                color="text.secondary"
                sx={{ mb: 4, maxWidth: '600px', mx: 'auto' }}
              >
                Start screening resumes in minutes and discover the perfect match for your job openings.
              </Typography>

              <Button
                component={RouterLink}
                to="/upload"
                variant="contained"
                color="primary"
                size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  py: 1.5,
                  px: 4,
                  fontSize: '1.1rem',
                  borderRadius: 2,
                }}
              >
                Get Started Now
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </>
  );
}

export default HomePage;
