import React from 'react';
import { 
  Box, 
  CircularProgress, 
  Typography,
  LinearProgress,
  useTheme
} from '@mui/material';
import { Loader2 } from 'lucide-react';

const PageLoader = () => {
  const theme = useTheme();
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: 'background.paper',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      {/* Asosiy loader */}
      <Box
        sx={{
          position: 'relative',
          width: 200,
          height: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 4
        }}
      >
        {/* Tashqi aylanuvchi doira */}
        <CircularProgress
          size={160}
          thickness={2}
          sx={{
            position: 'absolute',
            color: '#1677FF',
          }}
        />
        
        {/* Ichki aylanuvchi doira */}
        <CircularProgress
          size={120}
          thickness={3}
          sx={{
            position: 'absolute',
            color: '#1677FF',
            opacity: 0.7,
            animation: 'spin 3s linear infinite',
            '@keyframes spin': {
              '0%': { transform: 'rotate(0deg)' },
              '100%': { transform: 'rotate(-360deg)' }
            }
          }}
        />
        
        {/* Markazdagi Lucide ikoni */}
        <Loader2 
          size={48}
          color="#1677FF"
          className="animate-spin"
        />
      </Box>

      {/* Yuklanish matni */}
      <Typography
        variant="h5"
        sx={{
          color: '#1677FF',
          mb: 3,
          fontWeight: 500,
          textAlign: 'center',
          animation: 'pulse 1.5s infinite',
          '@keyframes pulse': {
            '0%, 100%': { opacity: 1 },
            '50%': { opacity: 0.6 }
          }
        }}
      >
        Yuklanmoqda...
      </Typography>

      {/* Progress bar */}
      <Box sx={{ width: '280px' }}>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 6,
            borderRadius: 3,
            bgcolor: 'rgba(22, 119, 255, 0.1)',
            '& .MuiLinearProgress-bar': {
              bgcolor: '#1677FF',
              borderRadius: 3,
            }
          }}
        />
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            mt: 1,
            textAlign: 'center'
          }}
        >
          {Math.round(progress)}%
        </Typography>
      </Box>
    </Box>
  );
};

export default PageLoader;