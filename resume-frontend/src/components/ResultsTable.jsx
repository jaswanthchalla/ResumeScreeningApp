import React, { useState } from 'react';
import {
  Box,
  Card,
  Typography,
  Chip,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
  Button,
  useTheme,
  useMediaQuery,
  Paper
} from '@mui/material';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import {
  Search as SearchIcon,
  FileDownload as FileDownloadIcon,
  Star as StarIcon,
  Download as DownloadIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// Custom toolbar for the data grid
function CustomToolbar() {
  return (
    <GridToolbarContainer sx={{ p: 2 }}>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport
        printOptions={{ disableToolbarButton: true }}
        csvOptions={{
          fileName: 'resume-screening-results',
          delimiter: ',',
          utf8WithBom: true,
        }}
      />
    </GridToolbarContainer>
  );
}

/**
 * ResultsTable component that displays resume screening results
 *
 * @param {Object} props - Component props
 * @param {Array} props.results - Array of screening results
 * @param {string} props.jobDescription - The job description used for matching
 */
function ResultsTable({ results = [], jobDescription = '' }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [searchTerm, setSearchTerm] = useState('');

  // Handle back to top functionality
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Define the data grid columns
  const columns = [
    {
      field: 'name',
      headerName: 'Resume Name',
      flex: 1.5,
      minWidth: 180,
      renderCell: (params) => (
        <Box sx={{ fontWeight: 500 }}>
          {params.value}
        </Box>
      )
    },
    {
      field: 'matched_skills',
      headerName: 'Matched Skills',
      flex: 2,
      minWidth: 200,
      sortable: false,
      renderCell: (params) => {
        const skills = Array.isArray(params.value) ? params.value : [];
      
        return (
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 0.5,
              maxWidth: '100%',
              overflow: 'hidden'
            }}
          >
            {skills.length > 0 ? (
              skills.map((skill, index) => (
                <Chip
                  key={`${skill}-${index}`}
                  label={skill}
                  size="small"
                  variant="outlined"
                  color="primary"
                  sx={{ mt: 0.3, mb: 0.3 }}
                />
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                No skills matched
              </Typography>
            )}
          </Box>
        );
      },
      // valueGetter: (params) => params.row.matched_skills.join(', ')
    },
    {
      field: 'semantic_similarity',
      headerName: 'Semantic Match',
      width: 150,
      valueFormatter: (params) => `${(params.value * 100).toFixed(1)}%`,
      renderCell: (params) => {
        const value = params.value;
        let color = 'default';

        if (value >= 0.8) color = 'success';
        else if (value >= 0.6) color = 'primary';
        else if (value >= 0.4) color = 'info';
        else if (value >= 0.2) color = 'warning';
        else color = 'error';

        return (
          <Chip
            label={`${(value * 100).toFixed(1)}%`}
            size="small"
            color={color}
            variant="outlined"
          />
        );
      }
    },
    {
      field: 'skill_match_ratio',
      headerName: 'Skill Match',
      width: 130,
      valueFormatter: (params) => `${(params.value * 100).toFixed(1)}%`,
      renderCell: (params) => {
        const value = params.value;
        let color = 'default';

        if (value >= 0.8) color = 'success';
        else if (value >= 0.6) color = 'primary';
        else if (value >= 0.4) color = 'info';
        else if (value >= 0.2) color = 'warning';
        else color = 'error';

        return (
          <Chip
            label={`${(value * 100).toFixed(1)}%`}
            size="small"
            color={color}
            variant="outlined"
          />
        );
      }
    },
    {
      field: 'final_score',
      headerName: 'Score',
      width: 120,
      renderCell: (params) => {
        const score = params.value;
        let starColor;

        if (score >= 0.75) starColor = theme.palette.success.main;
        else if (score >= 0.6) starColor = theme.palette.primary.main;
        else if (score >= 0.4) starColor = theme.palette.warning.main;
        else starColor = theme.palette.error.main;

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                mr: 1,
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: starColor
              }}
            />
            <Typography fontWeight="medium">
              {score.toFixed(2)}
            </Typography>
          </Box>
        );
      }
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <Tooltip title="Download Resume">
          <IconButton
            size="small"
            color="primary"
            onClick={() => handleDownload(params.row)}
            aria-label={`Download ${params.row.name}`}
          >
            <DownloadIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )
    }
  ];

  // Filter results based on search term
  const filteredResults = results.filter(result => {
    const searchLower = searchTerm.toLowerCase();
    const nameMatch = result.name.toLowerCase().includes(searchLower);
    const skillsMatch = result.matched_skills.some(skill =>
      skill.toLowerCase().includes(searchLower)
    );
    return nameMatch || skillsMatch;
  });

  // Handle resume download (mock function)
  const handleDownload = (row) => {
    // In a real application, this would trigger the file download
    // We would use an API call to download the file here
    alert(`Download started for: ${row.name}`);
  };

  // Handle CSV export
  const handleExportCSV = () => {
    const headers = ['Name', 'Matched Skills', 'Semantic Match', 'Skill Match', 'Final Score'];

    const csvContent = results.map(row =>
      [
        row.name,
        row.matched_skills.join(', '),
        `${(row.semantic_similarity * 100).toFixed(1)}%`,
        `${(row.skill_match_ratio * 100).toFixed(1)}%`,
        row.final_score
      ].join(',')
    );

    const csvData = [
      headers.join(','),
      ...csvContent
    ].join('\n');

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'resume_screening_results.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Summary Card */}
        <Card
          elevation={0}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 3,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
            background: theme.palette.mode === 'light'
              ? 'linear-gradient(145deg, #ffffff 0%, #f9fafb 100%)'
              : 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', md: 'center' },
              mb: 2
            }}
          >
            <Typography
              variant="h5"
              component="h1"
              sx={{
                fontWeight: 700,
                color: theme.palette.primary.main,
                mb: { xs: 2, md: 0 }
              }}
            >
              Resume Screening Results
            </Typography>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                placeholder="Search by name or skill"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                  sx: { borderRadius: 2 }
                }}
                sx={{ minWidth: 220 }}
              />

              <Button
                variant="outlined"
                size="small"
                startIcon={<FileDownloadIcon />}
                onClick={handleExportCSV}
                sx={{ borderRadius: 2 }}
              >
                Export CSV
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2
            }}
          >
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                borderRadius: 2,
                flex: '1 1 200px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center'
              }}
            >
              <Typography color="text.secondary" gutterBottom>
                Total Resumes
              </Typography>
              <Typography variant="h4" fontWeight="bold" color="primary.main">
                {results.length}
              </Typography>
            </Paper>

            <Paper
              variant="outlined"
              sx={{
                p: 2,
                borderRadius: 2,
                flex: '1 1 200px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center'
              }}
            >
              <Typography color="text.secondary" gutterBottom>
                Average Score
              </Typography>
              <Typography
                variant="h4"
                fontWeight="bold"
                color={
                  results.length ? (
                    results.reduce((total, r) => total + r.final_score, 0) / results.length >= 0.6
                      ? 'success.main'
                      : 'warning.main'
                  ) : 'text.primary'
                }
              >
                {results.length
                  ? (results.reduce((total, r) => total + r.final_score, 0) / results.length).toFixed(2)
                  : 'N/A'
                }
              </Typography>
            </Paper>

            <Paper
              variant="outlined"
              sx={{
                p: 2,
                borderRadius: 2,
                flex: '2 1 300px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography color="text.secondary" gutterBottom>
                Best Match
              </Typography>
              {results.length > 0 ? (
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  flexWrap: 'wrap',
                  justifyContent: 'center'
                }}>
                  <StarIcon sx={{ color: 'warning.main' }} />
                  <Typography
                    variant="h6"
                    fontWeight="medium"
                    color="primary.main"
                    sx={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '200px'
                    }}
                  >
                    {results[0].name}
                  </Typography>
                  <Chip
                    label={`Score: ${results[0].final_score.toFixed(2)}`}
                    color="primary"
                    size="small"
                  />
                </Box>
              ) : (
                <Typography variant="body1" color="text.secondary">
                  No results available
                </Typography>
              )}
            </Paper>
          </Box>
        </Card>

        {/* Results Data Grid */}
        <Card
          elevation={0}
          sx={{
            height: 600,
            width: '100%',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
            borderRadius: 3,
            '& .MuiDataGrid-cell:focus': {
              outline: 'none',
            },
            '& .MuiDataGrid-columnHeader:focus': {
              outline: 'none',
            },
          }}
        >
          <DataGrid
            rows={filteredResults}
            columns={columns}
            loading={false}
            disableRowSelectionOnClick
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
              sorting: {
                sortModel: [{ field: 'final_score', sort: 'desc' }],
              },
            }}
            pageSizeOptions={[5, 10, 25, 50]}
            slots={{
              toolbar: CustomToolbar,
            }}
            // getRowId={(row) => row.id || Math.random().toString(36).substring(7)}
            getRowId={(row) => row.id}
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: theme.palette.mode === 'light'
                  ? 'rgba(224, 242, 254, 0.4)'
                  : 'rgba(15, 23, 42, 0.6)',
                borderRadius: 0,
              },
              '& .MuiDataGrid-toolbarContainer': {
                backgroundColor: theme.palette.mode === 'light'
                  ? 'white'
                  : theme.palette.background.paper,
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
              },
            }}
          />
        </Card>

        {/* Job Description Card */}
        {jobDescription && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card
              elevation={0}
              sx={{
                p: 3,
                mt: 4,
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  color: theme.palette.mode === 'light' ? 'primary.main' : 'primary.light'
                }}
              >
                Job Description Used
              </Typography>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: theme.palette.mode === 'light'
                    ? 'rgba(242, 247, 250, 0.6)'
                    : 'rgba(15, 23, 42, 0.3)',
                  maxHeight: '200px',
                  overflowY: 'auto',
                }}
              >
                <Typography
                  variant="body2"
                  component="pre"
                  sx={{
                    whiteSpace: 'pre-wrap',
                    fontFamily: 'inherit',
                    m: 0,
                  }}
                >
                  {jobDescription}
                </Typography>
              </Box>
            </Card>
          </motion.div>
        )}
      </motion.div>

      {/* Scroll to top button */}
      {!isMobile && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            zIndex: 10,
          }}
        >
          <Tooltip title="Scroll to top">
            <IconButton
              color="primary"
              aria-label="scroll to top"
              onClick={scrollToTop}
              sx={{
                backgroundColor: theme.palette.background.paper,
                boxShadow: theme.shadows[2],
                '&:hover': {
                  backgroundColor: theme.palette.primary.light,
                  color: theme.palette.primary.contrastText,
                },
              }}
            >
              <KeyboardArrowUpIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </>
  );
}

export default ResultsTable;
