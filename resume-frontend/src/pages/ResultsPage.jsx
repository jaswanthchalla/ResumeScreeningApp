import React from 'react';
import { Container, Box, Button, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import ResultsTable from '../components/ResultsTable';

/**
 * ResultsPage component displays the results of resume screening
 */
function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!location.state || !location.state.results) {
  //     navigate('/upload');
  //   }
  // }, [location, navigate]);

  // Early return when data missing to prevent rendering crash
  if (!location.state || !location.state.results) {
    navigate('/upload');
    return null;
  }

  const { results, jobDescription } = location.state;

  console.log("Results Received:", results);

  const handleBack = () => {
    navigate('/upload');
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: { xs: 4, md: 6 } }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 4,
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={handleBack}
              sx={{ borderRadius: 2 }}
            >
              Back to Upload
            </Button>
          </Box>

          {results.length > 0 ? (
            <ResultsTable results={results} jobDescription={jobDescription} />
          ) : (
            <Box
              sx={{
                py: 8,
                textAlign: 'center',
                maxWidth: '600px',
                mx: 'auto'
              }}
            >
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                color="text.primary"
              >
                No Results Found
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                paragraph
              >
                No resume screening results are available. Please upload resumes and a job description to generate results.
              </Typography>

              <Button
                variant="contained"
                color="primary"
                onClick={handleBack}
                size="large"
                sx={{ mt: 2, borderRadius: 2 }}
              >
                Go to Upload
              </Button>
            </Box>
          )}
        </motion.div>
      </Box>
    </Container>
  );
}

export default ResultsPage;
