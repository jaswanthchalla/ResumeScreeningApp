import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Chip,
  Alert,
  Snackbar,
  useTheme
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  Description as DescriptionIcon,
  PictureAsPdf as PdfIcon,
  InsertDriveFile as FileIcon,
  Clear as ClearIcon,
  ArrowUpward as ArrowUpwardIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import LoadingOverlay from './LoadingOverlay';

/**
 * ResumeUpload component with drag-and-drop functionality
 * Allows users to upload resumes and analyze them against job descriptions
 */
function ResumeUpload() {
  const theme = useTheme();
  const navigate = useNavigate();

  // State management
  const [jobDescription, setJobDescription] = useState('');
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // File type and size validation
  const maxSize = 5 * 1024 * 1024; // 5MB
  const acceptedFileTypes = {
    'application/pdf': ['.pdf'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    'application/msword': ['.doc'],
  };

  // Setup dropzone
  const onDrop = useCallback(acceptedFiles => {
    const validFiles = acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file),
      fileType: file.type
    }));

    setFiles(prevFiles => [...prevFiles, ...validFiles]);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    fileRejections
  } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
    maxSize,
    multiple: true
  });

  // Display appropriate icon based on file type
  const getFileIcon = (fileType) => {
    if (fileType === 'application/pdf') {
      return <PdfIcon color="error" />;
    } else if (fileType.includes('word') || fileType.includes('document')) {
      return <DescriptionIcon color="primary" />;
    } else {
      return <FileIcon color="action" />;
    }
  };

  // Remove a file from the list
  const removeFile = (fileIndex) => {
    setFiles(prevFiles => {
      const newFiles = [...prevFiles];
      // Revoke the object URL to avoid memory leaks
      URL.revokeObjectURL(newFiles[fileIndex].preview);
      newFiles.splice(fileIndex, 1);
      return newFiles;
    });
  };

  // Remove all files
  const clearFiles = () => {
    files.forEach(file => URL.revokeObjectURL(file.preview));
    setFiles([]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!jobDescription.trim()) {
      setError('Please enter a job description');
      return;
    }

    if (files.length === 0) {
      setError('Please upload at least one resume');
      return;
    }

    setLoading(true);

    try {
      // Create form data for API request
      const formData = new FormData();
      formData.append('job_description', jobDescription);
      files.forEach(file => {
        formData.append('resumes', file);
      });

      setLoading(true);

      const response = await axios.post(
        'https://jaswanthch-resume-screener.hf.space/screen/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      
      console.log(response.data);

      const results = response.data.map((item, index) => ({
        id: index + 1,  // or use Math.random().toString(36).substring(2, 9)
        ...item
      }));

      navigate('/results', { state: { results, jobDescription } });

      setLoading(false);
      setSuccess(true);

      

    } catch (err) {
      console.error('Error analyzing resumes:', err);
      setError('Failed to analyze resumes. Please try again.');
      setLoading(false);
    }
  };

  // Get dropzone border color based on state
  const getBorderColor = () => {
    if (isDragAccept) return theme.palette.success.main;
    if (isDragReject) return theme.palette.error.main;
    if (isDragActive) return theme.palette.primary.main;
    return theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[700];
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 3,
            boxShadow: '0 8px 40px rgba(0, 0, 0, 0.08)',
            maxWidth: 800,
            mx: 'auto',
            position: 'relative',
            overflow: 'hidden',
            background: theme.palette.mode === 'light'
              ? 'linear-gradient(145deg, #ffffff 0%, #f9fafb 100%)'
              : 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '70%',
              height: '100%',
              opacity: 0.05,
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23${theme.palette.primary.main.substring(1)}' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '40px',
              zIndex: 0
            }}
          />

          <Box position="relative" zIndex={1}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                color: theme.palette.mode === 'light'
                  ? 'primary.main'
                  : 'primary.light',
                mb: 1
              }}
            >
              Resume Matcher
            </Typography>

            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: 600 }}
            >
              Upload your resumes and paste a job description to see which candidates are the best match.
              Our AI-powered tool analyzes skills, experience, and context to find the perfect fit.
            </Typography>

            <form onSubmit={handleSubmit}>
              <Box
                sx={{
                  display: 'grid',
                  gap: 4,
                  gridTemplateColumns: { xs: '1fr', md: '1fr' }
                }}
              >
                {/* Job description textarea */}
                <Box>
                  <Typography
                    variant="subtitle2"
                    fontWeight={600}
                    sx={{ mb: 1 }}
                  >
                    Job Description
                  </Typography>
                  <TextField
                    multiline
                    rows={6}
                    fullWidth
                    placeholder="Paste the job description here..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    variant="outlined"
                    InputProps={{
                      sx: { borderRadius: 2 }
                    }}
                  />
                </Box>
              </Box>

              <Divider sx={{ my: 4 }} />

              {/* Resume upload area */}
              <Typography
                variant="subtitle2"
                fontWeight={600}
                sx={{ mb: 1 }}
              >
                Upload Resumes
              </Typography>

              <Box
                {...getRootProps()}
                sx={{
                  border: `2px dashed ${getBorderColor()}`,
                  borderRadius: 2,
                  p: 4,
                  mb: 3,
                  textAlign: 'center',
                  transition: 'all 0.2s ease',
                  backgroundColor: theme.palette.mode === 'light'
                    ? 'rgba(242, 247, 250, 0.6)'
                    : 'rgba(15, 23, 42, 0.3)',
                  cursor: 'pointer',
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    backgroundColor: theme.palette.mode === 'light'
                      ? 'rgba(224, 242, 254, 0.4)'
                      : 'rgba(15, 23, 42, 0.5)',
                  }
                }}
              >
                <input {...getInputProps()} />

                <motion.div
                  animate={isDragActive ? { scale: 1.1 } : { scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Box sx={{ p: 2 }}>
                    <CloudUploadIcon
                      color="primary"
                      sx={{
                        fontSize: 48,
                        mb: 1,
                        opacity: isDragActive ? 0.8 : 1
                      }}
                    />

                    <Typography variant="h6" gutterBottom>
                      {isDragActive
                        ? "Drop your files here"
                        : "Drag & drop resume files here"}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      or click to browse for files
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
                      <Chip
                        label="PDF"
                        variant="outlined"
                        size="small"
                        icon={<PdfIcon />}
                      />
                      <Chip
                        label="DOCX"
                        variant="outlined"
                        size="small"
                        icon={<DescriptionIcon />}
                      />
                      <Chip
                        label="Max 5MB"
                        variant="outlined"
                        size="small"
                      />
                    </Box>
                  </Box>
                </motion.div>
              </Box>

              {/* File rejection errors */}
              {fileRejections.length > 0 && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {fileRejections.map(({ file, errors }) => (
                    <Typography variant="body2" key={file.path}>
                      {file.name} - {errors.map(e => e.message).join(', ')}
                    </Typography>
                  ))}
                </Alert>
              )}

              {/* Uploaded files list */}
              {files.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 1
                    }}
                  >
                    <Typography variant="subtitle2">
                      {files.length} {files.length === 1 ? 'file' : 'files'} uploaded
                    </Typography>

                    <Button
                      size="small"
                      color="error"
                      startIcon={<ClearIcon />}
                      onClick={clearFiles}
                    >
                      Clear all
                    </Button>
                  </Box>

                  <Paper
                    variant="outlined"
                    sx={{
                      borderRadius: 2,
                      maxHeight: '200px',
                      overflow: 'auto'
                    }}
                  >
                    <List dense disablePadding>
                      {files.map((file, index) => (
                        <ListItem
                          key={`${file.name}-${index}`}
                          divider={index < files.length - 1}
                          secondaryAction={
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={() => removeFile(index)}
                              size="small"
                            >
                              <ClearIcon fontSize="small" />
                            </IconButton>
                          }
                        >
                          <ListItemIcon>
                            {getFileIcon(file.fileType)}
                          </ListItemIcon>
                          <ListItemText
                            primary={file.name}
                            secondary={`${(file.size / 1024).toFixed(1)} KB`}
                            primaryTypographyProps={{
                              variant: 'body2',
                              style: {
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                              }
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                </Box>
              )}

              {/* Submit button */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={loading || files.length === 0 || !jobDescription.trim()}
                  startIcon={<ArrowUpwardIcon />}
                  sx={{
                    py: 1.5,
                    px: 4,
                    borderRadius: 2,
                    boxShadow: '0 4px 14px 0 rgba(0, 118, 255, 0.39)',
                  }}
                >
                  Analyze Resumes
                </Button>
              </Box>
            </form>
          </Box>
        </Paper>
      </motion.div>

      {/* Loading overlay */}
      <LoadingOverlay
        open={loading}
        message="Analyzing resumes and matching with job description..."
      />

      {/* Error message */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setError(null)}
          severity="error"
          sx={{ width: '100%' }}
          variant="filled"
        >
          {error}
        </Alert>
      </Snackbar>

      {/* Success message */}
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSuccess(false)}
          severity="success"
          sx={{ width: '100%' }}
          variant="filled"
        >
          Analysis complete! Redirecting to results...
        </Alert>
      </Snackbar>
    </>
  );
}

export default ResumeUpload;
