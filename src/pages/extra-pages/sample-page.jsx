import axios from 'axios';
import { useState } from 'react';
import MainCard from 'components/MainCard';
import Typography from '@mui/material/Typography';
import { MessageSquare, Send } from 'lucide-react';
import { Box, TextField, Button, Stack } from '@mui/material';

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('Form yuborildi:', formData);
      await axios.post("/support", formData)
      setFormData({ name: '', phone: '', message: '' });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <MainCard
      title={
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <MessageSquare size={24} color="#2196f3" />
          <Typography variant="h3">Qo'llab-quvvatlash</Typography>
        </Box>
      }
      sx={{ width: '100%' }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: '100%',
          '& .MuiTextField-root': { mb: 2 }
        }}
      >
        <Stack spacing={2}>
          <TextField
            fullWidth
            label="Ismingiz"
            name="name"
            value={formData.name}
            onChange={handleChange}
            variant="outlined"
            required
            placeholder="To'liq ismingizni kiriting"
            size="medium"
          />

          <TextField
            fullWidth
            label="Telefon raqamingiz"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            variant="outlined"
            required
            placeholder="+998 XX XXX XX XX"
            type="tel"
            size="medium"
          />

          <TextField
            fullWidth
            label="Xabaringiz"
            name="message"
            value={formData.message}
            onChange={handleChange}
            variant="outlined"
            required
            multiline
            rows={4}
            placeholder="Muammongiz yoki savolingizni yozing..."
            size="medium"
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            startIcon={<Send />}
            sx={{
              py: 1.5,
              textTransform: 'none',
              fontSize: '1rem',
              mt: 2
            }}
            fullWidth
          >
            Yuborish
          </Button>
        </Stack>
      </Box>
    </MainCard>
  );
}
