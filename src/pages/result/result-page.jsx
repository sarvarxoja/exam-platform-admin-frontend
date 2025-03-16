import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Stack,
  Avatar,
  Chip,
  LinearProgress,
  Card,
  CardContent,
  IconButton,
  Divider,
  useTheme
} from '@mui/material';
import axios from 'axios';
import { User, GraduationCap, MapPin, Calendar, Phone, Check, X, Award, Clock, BookOpen, CheckCircle, XCircle } from 'lucide-react';
import { useParams } from 'react-router';
import NotFound from 'pages/notfound/Notfound';
import PageLoader from 'components/loader/PageLoader';

export default function Result() {
  const theme = useTheme();
  const { id } = useParams();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState([]);

  function formatDate(isoString) {
    const date = new Date(isoString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${day}.${month}.${year}`;
}

  useEffect(() => {
    getResult();
  }, []);

  async function getResult() {
    setLoading(true);
    try {
      let { data } = await axios.get(`/dashboard/result/${id}`);
      console.log(data);
      setResultData(data);
    } catch (error) {
      setResultData([]);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  if (loading === true) {
    return <PageLoader />;
  }

  if (!resultData.length && error === true) {
    console.log(resultData.length);

    return <NotFound />;
  }

  const StatCard = ({ icon: Icon, value, label, color }) => (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 4,
        bgcolor: `${color}.50`,
        border: `1px solid ${theme.palette[color].light}`,
        height: '100%'
      }}
    >
      <Stack spacing={1} alignItems="center">
        <Icon size={24} color={theme.palette[color].main} />
        <Typography variant="h4" fontWeight="bold" color={`${color}.main`}>
          {value}
        </Typography>
        <Typography variant="body2" color={`${color}.darker`} textAlign="center">
          {label}
        </Typography>
      </Stack>
    </Paper>
  );

  return (
    <Box sx={{ bgcolor: '#F8F9FF', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Card sx={{ mb: 4, borderRadius: 4, boxShadow: theme.shadows[2] }}>
          <CardContent sx={{ p: 4 }}>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Stack direction="row" spacing={3} alignItems="center">
                  <Avatar
                    sx={{
                      width: 100,
                      height: 100,
                      bgcolor: theme.palette.primary.main,
                      fontSize: '2.5rem',
                      boxShadow: theme.shadows[3]
                    }}
                  >
                    {resultData.user?.name[0]}
                  </Avatar>
                  <Box>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                      {`${resultData.user?.lastName} ${resultData.user?.name} ${resultData.user?.middleNames}`}
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <BookOpen size={20} color={theme.palette.primary.main} />
                      <Typography variant="subtitle1" color="text.secondary">
                        {resultData.user?.universityName} • {resultData.user?.courseNumber}-kurs
                      </Typography>
                       <Typography variant="subtitle1" color="text.secondary">
                        Tug'ilgan sana {formatDate(resultData.user?.birthDate)}
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <StatCard icon={Award} value={`${Math.trunc(resultData?.correctPercentage)}%`} label="Umumiy ball" color="primary" />
                  </Grid>
                  <Grid item xs={4}>
                    <StatCard icon={CheckCircle} value={resultData?.correctCount} label="To'g'ri javoblar" color="success" />
                  </Grid>
                  <Grid item xs={4}>
                    <StatCard icon={XCircle} value={resultData?.wrongCount} label="Noto'g'ri javoblar" color="error" />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Grid container spacing={4}>
          {/* Personal Info Section */}
          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 4, boxShadow: theme.shadows[2] }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Shaxsiy ma'lumotlar
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Stack spacing={3}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar sx={{ bgcolor: 'primary.50' }}>
                      <GraduationCap size={20} color={theme.palette.primary.main} />
                    </Avatar>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Universitet
                      </Typography>
                      <Typography variant="subtitle1" fontWeight="medium">
                        {resultData.user?.universityName}
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar sx={{ bgcolor: 'primary.50' }}>
                      <MapPin size={20} color={theme.palette.primary.main} />
                    </Avatar>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Manzil
                      </Typography>
                      <Typography variant="subtitle1" fontWeight="medium">
                        {resultData.user?.state}, {resultData.user?.districtCity}
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar sx={{ bgcolor: 'primary.50' }}>
                      <Phone size={20} color={theme.palette.primary.main} />
                    </Avatar>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Telefon
                      </Typography>
                      <Typography variant="subtitle1" fontWeight="medium">
                        {resultData.user?.phoneNumber}
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Test Results Section */}
          <Grid item xs={12} md={8}>
            <Card sx={{ borderRadius: 4, boxShadow: theme.shadows[2] }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Test natijalari
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Stack spacing={2}>
                  {resultData.answers?.map((answer, index) => {
                    const isCorrect = answer.selectedOption === answer.questionId.correctAnswer;
                    return (
                      <Paper
                        key={index}
                        elevation={0}
                        sx={{
                          p: 3,
                          borderRadius: 3,
                          bgcolor: isCorrect ? 'success.50' : 'error.50',
                          border: 1,
                          borderColor: isCorrect ? 'success.light' : 'error.light'
                        }}
                      >
                        <Stack spacing={2}>
                          <Stack direction="row" spacing={2} alignItems="center">
                            <Avatar
                              sx={{
                                bgcolor: isCorrect ? 'success.main' : 'error.main',
                                width: 32,
                                height: 32
                              }}
                            >
                              {isCorrect ? <Check size={20} /> : <X size={20} />}
                            </Avatar>
                            <Typography variant="subtitle1" fontWeight="medium">
                              {index + 1}. {answer.questionId?.question}
                            </Typography>
                          </Stack>
                          <Stack direction="row" spacing={1} flexWrap="wrap">
                            {answer.questionId.options.map((option, optIndex) => {
                              const isSelected = option === answer.selectedOption;
                              const isCorrectAnswer = option === answer.questionId.correctAnswer;

                              let chipProps = {
                                label: option,
                                variant: 'outlined',
                                sx: {
                                  borderRadius: 2,
                                  px: 2,
                                  py: 1,
                                  bgcolor: 'background.paper'
                                }
                              };

                              if (isCorrectAnswer) {
                                chipProps.sx = {
                                  ...chipProps.sx,
                                  bgcolor: 'success.50',
                                  borderColor: 'success.main',
                                  color: 'success.main'
                                };
                              } else if (isSelected && !isCorrectAnswer) {
                                chipProps.sx = {
                                  ...chipProps.sx,
                                  bgcolor: 'error.50',
                                  borderColor: 'error.main',
                                  color: 'error.main'
                                };
                              }

                              return <Chip key={optIndex} {...chipProps} />;
                            })}
                          </Stack>
                        </Stack>
                      </Paper>
                    );
                  })}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
