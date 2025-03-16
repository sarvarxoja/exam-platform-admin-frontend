import React, { useEffect, useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  InputAdornment,
  Tooltip,
} from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Trash2, PenSquare, Search, FolderCog } from 'lucide-react';
import EditTestModal from './EditModal';

// Namuna ma'lumotlar
const createData = (id, name, email, role, status, lastLogin, actions) => ({
  id,
  name,
  email,
  role,
  status,
  lastLogin,
  actions
});

const initialRows = [
  createData(1, 'John Doe', 'john@example.com', 'Admin', 'active', '2024-02-11 14:30'),
  createData(2, 'Jane Smith', 'jane@example.com', 'Editor', 'active', '2024-02-11 12:00'),
  createData(3, 'Bob Johnson', 'bob@example.com', 'User', 'inactive', '2024-02-10 09:15')
];

export default function ComponentTypography() {
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(initialRows);
  const [searchTerm, setSearchTerm] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const [questionsData, setQuestionsData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [paginationData, setPaginationData] = useState([]);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // O'chirish dialogini boshqarish
  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    await axios.delete(`/tests/delete/${selectedUser._id}`);
    setQuestionsData(questionsData.filter((row) => row._id !== selectedUser._id));
    setDeleteDialogOpen(false);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setEditDialogOpen(true);
  };

  // Pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeLimit = (event) => {
    setRowsPerPage(event.target.value);
  };

  useEffect(() => {
    fetchTests();
  }, [page, rowsPerPage]);

  async function fetchTests() {
    try {
      let { data } = await axios.get(`/dashboard/tests?limit=${rowsPerPage}&page=${page}`);
      setPaginationData(data);
      setQuestionsData(data.questions);
    } catch (error) {
      console.log(error);
    }
  }

  function formatDate(isoString) {
    const date = new Date(isoString);

    const pad = (num) => String(num).padStart(2, '0');

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  async function handleSearch() {
    if (searchTerm == '') {
      return fetchTests();
    }

    let { data } = await axios.get(`/dashboard/tests/search?systemId=${searchTerm}`);
    setQuestionsData(data.results);
  }

  function handleUpdateTest(data) {
    console.log(data);
    setQuestionsData(
      (prevData) =>
        Array.isArray(prevData) // Tekshiramiz, agar prevData massiv bo'lsa davom etamiz
          ? prevData.map((item) => (item._id === data._id ? { ...item, ...data } : item))
          : [] // Agar prevData yo'q bo'lsa, bo'sh massiv qaytaramiz
    );
  }

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      {/* Header qismi */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Stack direction="row" spacing={1} alignItems="center">
          <FolderCog size={32} color="#1976d2" />
          <Typography variant="h4" component="h1" fontWeight="bold">
            Savollarni nazorat qilish paneli
          </Typography>
        </Stack>
        <Link to={'/test/create'}>Yangi test qo'shish</Link>
      </Stack>

      {/* Qidiruv va filter qismi */}
      <Stack direction="row" spacing={2} mb={3} alignItems="center">
        <TextField
          fullWidth
          placeholder="Qidirish..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={20} />
              </InputAdornment>
            )
          }}
          sx={{ maxWidth: 500 }}
        />
      </Stack>

      {/* Asosiy table */}
      <TableContainer
        component={Paper}
        elevation={3}
        sx={{
          mb: 3,
          borderRadius: 2,
          '& .MuiTableCell-head': {
            backgroundColor: '#f5f5f5',
            fontWeight: 'bold'
          }
        }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Savol</TableCell>
              <TableCell>Variantlar</TableCell>
              <TableCell>Tog'ri javob</TableCell>
              <TableCell>Qo'shilgan sana</TableCell>
              <TableCell align="right">Amallar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questionsData.map((row, index) => (
              <TableRow key={index} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                <TableCell>#{row.systemId}</TableCell>
                <TableCell>{row.question}</TableCell>
                <TableCell>
                  <Link to={`/test/${row._id}`}>variantlar</Link>
                </TableCell>
                <TableCell>{row.correctAnswer}</TableCell>
                <TableCell>{formatDate(row.date)}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Tahrirlash">
                    <IconButton size="small" onClick={() => handleEditClick(row)} sx={{ color: '#1976d2' }}>
                      <PenSquare size={18} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="O'chirish">
                    <IconButton size="small" onClick={() => handleDeleteClick(row)} sx={{ color: '#d32f2f' }}>
                      <Trash2 size={18} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={paginationData.total}
        rowsPerPage={paginationData.pages}
        page={paginationData.page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeLimit}
        rowsPerPageOptions={[5, 10, 25]}
        nextIconButtonProps={{
          disabled: paginationData.pages <= page
        }}
        backIconButtonProps={{
          disabled: paginationData.page <= 1
        }}
        sx={{
          '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
            margin: 0
          }
        }}
      />

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Testni o'chirish</DialogTitle>
        <DialogContent>
          <Typography>Haqiqatan ham bu testni o'chirmoqchimisiz?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Bekor qilish</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            O'chirish
          </Button>
        </DialogActions>
      </Dialog>
      <EditTestModal
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        selectedTest={selectedUser}
        onUpdate={handleUpdateTest}
      />
    </Box>
  );
}
