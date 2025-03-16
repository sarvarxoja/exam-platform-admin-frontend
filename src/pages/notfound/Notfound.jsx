import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container,
  useTheme
} from '@mui/material';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <Box
      sx={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        bgcolor: 'background.default',
        py: 1
      }}
    >
      <Container maxWidth="sm">
        <Box textAlign="center" spacing={4}>
          {/* 404 raqami va Alert ikoni */}
          <Box sx={{ position: 'relative', mb: 2 }}>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: { xs: '8rem', md: '12rem' },
                fontWeight: 700,
                color: '#1677FF',
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                  '0%, 100%': { opacity: 1 },
                  '50%': { opacity: 0.7 }
                }
              }}
            >
              404
            </Typography>
          </Box>
          
          {/* Asosiy matn */}
          <Box sx={{ my: 4 }}>
            <Typography 
              variant="h2" 
              component="h2"
              sx={{ 
                mb: 2,
                color: 'text.primary',
                fontWeight: 600
              }}
            >
              Voy! Bu sahifa topilmadi
            </Typography>
            <Typography 
              variant="h6"
              color="text.secondary"
              sx={{ mb: 4 }}
            >
              Kechirasiz, siz qidirayotgan sahifa mavjud emas yoki boshqa manzilga ko'chirilgan
            </Typography>
          </Box>
          
          {/* Animatsiyali element */}
          <Box
            sx={{
              position: 'relative',
              height: 120,
              mb: 4
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                margin: 'auto',
                border: 4,
                borderColor: '#1677FF',
                borderRadius: '50%',
                borderTopColor: 'transparent',
                animation: 'spin 1s linear infinite',
                '@keyframes spin': {
                  '0%': { transform: 'rotate(0deg)' },
                  '100%': { transform: 'rotate(360deg)' }
                }
              }}
            />
          </Box>
          
          {/* Bosh sahifaga qaytish tugmasi */}
          <Button
            variant="contained"
            size="large"
            startIcon={<Home size={24} />}
            href="/"
            sx={{
              bgcolor: '#1677FF',
              '&:hover': {
                bgcolor: '#1668cc'
              },
              borderRadius: 8,
              px: 4,
              py: 1.5
            }}
          >
            Bosh sahifaga qaytish
          </Button>
          
          {/* Qo'shimcha ma'lumot */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 4 }}
          >
            Agar bu xato takrorlansa, iltimos, sayt administratori bilan bog'laning
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default NotFound;