import React, { useState, useEffect } from 'react';
import ComponentSkeleton from './ComponentSkeleton';
import axios from 'axios';
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
  CircularProgress,
  Paper
} from '@mui/material';
import { useParams } from 'react-router';

export default function ComponentColor() {
  const { id } = useParams();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTest();
  }, []);

  const fetchTest = async () => {
    try {
      const { data } = await axios.get(`dashboard/test/${id}`);
      setTest(data.test);
    } catch (error) {
      console.error('Error fetching test:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ComponentSkeleton>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </ComponentSkeleton>
    );
  }

  return (
    <ComponentSkeleton>
      {test && (
        <Paper 
          elevation={0} 
          sx={{ 
            bgcolor: 'background.paper',
            p: 3,
            borderRadius: 2
          }}
        >
          {/* Savol qismi */}
          <Box mb={4}>
            <Typography 
              color="primary"
              sx={{ 
                fontSize: '0.875rem',
                fontWeight: 500,
                mb: 1.5 
              }}
            >
              Savol:
            </Typography>
            <Typography 
              variant="body1"
              sx={{ 
                fontSize: '1rem',
                color: 'text.primary'
              }}
            >
              {test.question}
            </Typography>
          </Box>

          {/* Variantlar qismi */}
          <Box>
            <Typography 
              color="primary"
              sx={{ 
                fontSize: '0.875rem',
                fontWeight: 500,
                mb: 1.5
              }}
            >
              Variantlar:
            </Typography>
            <RadioGroup>
              <Stack spacing={1.5}>
                {test.options.map((variant, index) => (
                  <FormControlLabel
                    key={index}
                    value={variant}
                    control={
                      <Radio 
                        checked={variant === test.correctAnswer}
                        sx={{
                          '&.Mui-checked': {
                            color: variant === test.correctAnswer ? '#4CAF50' : 'primary.main'
                          }
                        }}
                      />
                    }
                    label={
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: '0.9rem',
                          color: variant === test.correctAnswer ? '#2E7D32' : 'text.primary',
                          fontWeight: variant === test.correctAnswer ? 500 : 400
                        }}
                      >
                        {variant}
                        {variant === test.correctAnswer && (
                          <Typography
                            component="span"
                            sx={{
                              ml: 1,
                              fontSize: '0.75rem',
                              color: '#2E7D32',
                              bgcolor: '#E8F5E9',
                              px: 1,
                              py: 0.5,
                              borderRadius: 1
                            }}
                          >
                            (To'g'ri javob)
                          </Typography>
                        )}
                      </Typography>
                    }
                    sx={{
                      margin: 0,
                      '.MuiFormControlLabel-label': { width: '100%' },
                      bgcolor: variant === test.correctAnswer ? '#F1F8E9' : 'transparent',
                      borderRadius: 1,
                      p: 1,
                      transition: 'all 0.2s',
                      '&:hover': {
                        bgcolor: variant === test.correctAnswer ? '#F1F8E9' : '#F5F5F5'
                      }
                    }}
                  />
                ))}
              </Stack>
            </RadioGroup>
          </Box>
        </Paper>
      )}
    </ComponentSkeleton>
  );
}