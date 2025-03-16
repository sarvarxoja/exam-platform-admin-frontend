import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  IconButton
} from '@mui/material';
import axios from 'axios';
import { Trash } from 'lucide-react';

const EditTestModal = ({ open, onClose, selectedTest, onUpdate }) => {
  const [formData, setFormData] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedTest) {
      setFormData({
        question: selectedTest.question || '',
        options: selectedTest.options || ['', '', '', ''],
        correctAnswer: selectedTest.correctAnswer || ''
      });
    }
  }, [selectedTest]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleVariantChange = (index, value) => {
    const newVariants = [...formData.options];
    newVariants[index] = value;
    setFormData({
      ...formData,
      options: newVariants
    });
  };

  const handleDeleteOption = async (index) => {
    try {
      let conf = confirm("Rostdanham o'chirishni istaysizmi");

      if (conf) {
        let deletedData = await axios.delete(`/tests/delete/option/${selectedTest._id}`, {
          data: { option: formData.options[index] }
        });
        console.log(deletedData);
        const newVariants = formData.options.filter((_, i) => i !== index);
        setFormData({
          ...formData,
          options: newVariants
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.patch(`/tests/update/${selectedTest._id}`, formData);
      onUpdate(response.data.updatedQuestion);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6">Testni tahrirlash</Typography>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Savol"
              name="question"
              value={formData.question}
              onChange={handleChange}
              multiline
              rows={2}
              required
            />

            {formData.options?.map((variant, index) => (
              <Stack direction="row" spacing={1} alignItems="center" key={index}>
                <TextField
                  fullWidth
                  label={`Variant ${index + 1}`}
                  value={variant}
                  onChange={(e) => handleVariantChange(index, e.target.value)}
                  required
                />
                <IconButton onClick={() => handleDeleteOption(index)} color="error">
                  <Trash size={20} />
                </IconButton>
              </Stack>
            ))}

            <FormControl fullWidth required>
              <InputLabel>To'g'ri javob</InputLabel>
              <Select name="correctAnswer" value={formData.correctAnswer} onChange={handleChange} label="To'g'ri javob">
                {formData.options?.map((variant, index) => (
                  <MenuItem key={index} value={variant}>
                    {variant || `Variant ${index + 1}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Bekor qilish</Button>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? 'Saqlanmoqda...' : 'Saqlash'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditTestModal;
