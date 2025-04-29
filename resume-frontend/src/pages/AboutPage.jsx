import React from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Divider,
  useTheme
} from '@mui/material';
import { motion } from 'framer-motion';

/**
 * About page component
 */
function AboutPage() {
  const theme = useTheme();

  // Team members data
  const team = [
    {
      name: 'Jaswanth Challa',
      role: 'AI/ML Developer',
      bio: 'AI enthusiast with a focus on building intelligent systems using NLP and deep learning for real-world applications.',
      avatar: '../assets/person-icon.png'
    }
  ];
  // avatar: `https://i.pravatar.cc/300?img=${Math.floor(Math.random() * 60)}`

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* About section */}
          <Box mb={10}>
            <Typography
              variant="h2"
              component="h1"
              align="center"
              gutterBottom
              sx={{
                fontWeight: 700,
                mb: 4,
                background: 'linear-gradient(90deg, #0ea5e9 0%, #14b8a6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textFillColor: 'transparent'
              }}
            >
              About ResuMatch
            </Typography>

            <Typography
              variant="h5"
              component="p"
              align="center"
              color="text.secondary"
              gutterBottom
              sx={{
                maxWidth: '800px',
                mx: 'auto',
                mb: 6,
                lineHeight: 1.6
              }}
            >
              We're on a mission to revolutionize the hiring process by leveraging
              AI to match the right talent with the right opportunities.
            </Typography>

            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                  Our Story
                </Typography>
                <Typography variant="body1" paragraph color="text.secondary">
                  ResuMatch was founded with a clear vision: to eliminate the
                  inefficiencies and biases in traditional resume screening processes. The team
                  has worked tirelessly to create a tool that truly understands the essence of job requirements and candidate qualifications.
                </Typography>
                <Typography variant="body1" paragraph color="text.secondary">
                  After witnessing qualified candidates being overlooked due to keyword mismatches, we knew there had to be a better way. Our AI-powered solution uses advanced natural language processing to match candidates based on their true potential.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: '10%',
                      left: '10%',
                      width: '80%',
                      height: '80%',
                      borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                      background: `linear-gradient(135deg, ${theme.palette.primary.light}22 0%, ${theme.palette.primary.main}11 100%)`,
                      zIndex: -1,
                    },
                  }}
                >
                  <Box
                    component="img"
                    src="https://ext.same-assets.com/3906826159/2993723784.webp"
                    alt="Resume screening process"
                    sx={{
                      width: '100%',
                      maxWidth: '500px',
                      height: 'auto',
                      borderRadius: 3,
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                      display: 'block',
                      mx: 'auto',
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ mb: 10 }} />

          {/* Our team section */}
          <Box>
            <Typography
              variant="h3"
              component="h2"
              align="center"
              gutterBottom
              sx={{ fontWeight: 700, mb: 6 }}
            >
              Meet Our Team
            </Typography>

            <Grid container spacing={4} justifyContent="center" alignItems="center">
              {team.map((member, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card
                      elevation={0}
                      sx={{
                        height: '100%',
                        borderRadius: 3,
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                        transition: 'transform 0.3s',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                        },
                      }}
                    >
                      <CardContent sx={{ textAlign: 'center', p: 3 }}>
                        <Avatar
                          src={member.avatar}
                          alt={member.name}
                          sx={{
                            width: 120,
                            height: 120,
                            mx: 'auto',
                            mb: 2,
                            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
                          }}
                        />
                        <Typography variant="h5" component="h3" gutterBottom>
                          {member.name}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="primary"
                          gutterBottom
                          sx={{ fontWeight: 600 }}
                        >
                          {member.role}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {member.bio}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        </motion.div>
      </Box>
    </Container>
  );
}

export default AboutPage;
