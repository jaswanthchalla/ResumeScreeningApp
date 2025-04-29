import React from 'react';
import { Backdrop, CircularProgress, Typography, Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

/**
 * Loading overlay component to display when processing data
 *
 * @param {Object} props - Component props
 * @param {boolean} props.open - Controls visibility of the overlay
 * @param {string} [props.message='Processing...'] - Message to display to the user
 * @param {function} [props.onClose] - Optional callback when backdrop is clicked
 */
function LoadingOverlay({ open, message = 'Processing...', onClose }) {
  const theme = useTheme();

  return (
    <Backdrop
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(4px)',
        flexDirection: 'column',
      }}
      open={open}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Box
          sx={{
            textAlign: 'center',
            padding: 3,
            borderRadius: 2,
            maxWidth: '300px'
          }}
        >
          <CircularProgress
            color="primary"
            size={60}
            thickness={4}
            aria-label="Loading indicator"
            sx={{ mb: 2 }}
          />

          <Typography
            variant="h6"
            component="p"
            color="white"
            aria-live="polite"
            sx={{ fontWeight: 'medium' }}
          >
            {message}
          </Typography>
        </Box>
      </motion.div>
    </Backdrop>
  );
}

export default LoadingOverlay;
