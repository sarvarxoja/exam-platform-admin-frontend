import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Radio, IconButton, Button, Paper, Stack } from '@mui/material';
import { PlusCircle, Trash2, BookOpen, Save, Edit3, HelpCircle } from 'lucide-react';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const OptionContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
  transition: 'all 0.3s ease',
  border: '1px solid #e0e0e0',
  '&:hover': {
    transform: 'translateX(5px)',
    borderColor: '#3084D7',
    boxShadow: '0 4px 12px rgba(48, 132, 215, 0.1)'
  }
}));

const TestCreator = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addNewOption = () => {
    if (options.length < 6) {
      setOptions([...options, '']);
    }
  };

  const removeOption = (index) => {
    if (options.length > 2) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
      if (correctAnswer === options[index]) {
        setCorrectAnswer('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/tests/create', {
        question,
        options,
        correctAnswer
      });

      setQuestion('');
      setCorrectAnswer('');
      setOptions(['', '']);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth={false} sx={{ p: 4 }}>
      <Paper elevation={3} sx={{ p: 4, backgroundColor: '#fafafa', borderRadius: 2 }}>
        <Stack spacing={3}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, borderBottom: '2px solid #3084D7', pb: 2 }}>
            <BookOpen size={28} color="#3084D7" />
            <Typography variant="h4" sx={{ color: '#3084D7', fontWeight: 'bold' }}>
              Test yaratish
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <Box>
                <Typography variant="h6">Savol</Typography>
                <TextField
                  fullWidth
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Savolni kiriting"
                  variant="outlined"
                  autoComplete="off"
                />
              </Box>

              <Box>
                <Typography variant="h6">Variantlar</Typography>
                {options.map((option, index) => (
                  <OptionContainer key={index} elevation={0}>
                    <Radio
                      checked={correctAnswer == '' ? false : correctAnswer === option}
                      onChange={() => setCorrectAnswer(option)}
                      value={option}
                      name="correct-answer"
                      sx={{ '&.Mui-checked': { color: '#3084D7' } }}
                    />
                    <TextField
                      fullWidth
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      placeholder={`${index + 1}-variantni kiriting`}
                      variant="outlined"
                      autoComplete="off"
                    />
                    {options.length > 2 && (
                      <IconButton onClick={() => removeOption(index)} sx={{ color: '#666', '&:hover': { color: '#ff4444' } }}>
                        <Trash2 size={20} />
                      </IconButton>
                    )}
                  </OptionContainer>
                ))}
              </Box>

              {options.length < 6 && (
                <Button variant="outlined" onClick={addNewOption} fullWidth startIcon={<PlusCircle size={20} />}>
                  Yangi variant qo'shish
                </Button>
              )}

              <Button type="submit" variant="contained" size="large" fullWidth startIcon={<Save size={20} />}>
                Saqlash
              </Button>
            </Stack>
          </form>
        </Stack>
      </Paper>
    </Container>
  );
};

export default TestCreator;
