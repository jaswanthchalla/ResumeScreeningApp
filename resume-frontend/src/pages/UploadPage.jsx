import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import ResumeUpload from '../components/ResumeUpload';

/**
 * UploadPage component displays the resume upload functionality
 */
function UploadPage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: { xs: 4, md: 6 } }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h2"
            component="h1"
            align="center"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              mb: 2,
              background: 'linear-gradient(90deg, #0ea5e9 0%, #14b8a6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textFillColor: 'transparent'
            }}
          >
            Resume Screening
          </Typography>

          <Typography
            variant="h6"
            component="p"
            align="center"
            color="text.secondary"
            sx={{
              maxWidth: '800px',
              mx: 'auto',
              mb: 8,
              fontWeight: 'normal'
            }}
          >
            Upload resumes and a job description to automatically rank candidates.
            Our AI-powered tool analyzes skills, experience, and context to find the perfect fit.
          </Typography>

          <ResumeUpload />
        </motion.div>
      </Box>
    </Container>
  );
}

export default UploadPage;
