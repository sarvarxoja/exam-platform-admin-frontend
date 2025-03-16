import PropTypes from 'prop-types';
// material-ui
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';

// third-party
import { NumericFormat } from 'react-number-format';
import { Link as RouterLink } from 'react-router-dom';
// project import
import Dot from 'components/@extended/Dot';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import  from '@mui/material';
import { Tooltip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { ExternalLink, PenSquare, Trash2 } from 'lucide-react';

function createData(tracking_no, name, fat, carbs, protein) {
  return { tracking_no, name, fat, carbs, protein };
}

const rows = [
  createData(84564564, 'Camera Lens', 40, 2, 40570),
  createData(98764564, 'Laptop', 300, 0, 180139),
  createData(98756325, 'Mobile', 355, 1, 90989),
  createData(98652366, 'Handset', 50, 1, 10239),
  createData(13286564, 'Computer Accessories', 100, 1, 83348),
  createData(86739658, 'TV', 99, 0, 410780),
  createData(13256498, 'Keyboard', 125, 2, 70999),
  createData(98753263, 'Mouse', 89, 2, 10570),
  createData(98753275, 'Desktop', 185, 1, 98063),
  createData(98753291, 'Chair', 100, 0, 14001)
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'name',
    align: 'left',
    disablePadding: true,
    label: 'Topshiruvchining ismi'
  },
  {
    id: 'fat',
    align: 'left',
    disablePadding: false,
    label: 'Natijasi'
  },
  {
    id: 'carbs',
    align: 'left',
    disablePadding: false,

    label: 'Status'
  },
  {
    id: 'protein',
    align: 'left',
    disablePadding: false,
    label: "Tog'ri javoblar soni"
  },
  {
    id: 'tracking_no',
    align: 'left',
    disablePadding: false,
    label: 'Amallar'
  }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function OrderStatus({ correctPercentage }) {
  let color = '';
  let label = '';

  if (correctPercentage >= 0 && correctPercentage <= 39) {
    color = '#f44336'; // Qizil
    label = 'Past daraja';
  } else if (correctPercentage >= 40 && correctPercentage <= 59) {
    color = '#ff9800'; // To'q sariq
    label = 'Kuchsiz daraja';
  } else if (correctPercentage >= 60 && correctPercentage <= 79) {
    color = '#ffeb3b'; // Sariq
    label = 'Kuchli daraja';
  } else if (correctPercentage >= 80 && correctPercentage <= 100) {
    color = '#4caf50'; // Yashil
    label = 'Yuqori daraja';
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{label}</Typography>
    </Stack>
  );
}

// ==============================|| ORDER TABLE ||============================== //

export default function OrderTable({ page, limit, setPaginationData, searchTerm, filter }) {
  const order = 'asc';
  const orderBy = 'tracking_no';

  const [resultData, setResultData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    searchFilter();
  }, [filter]);

  async function searchFilter() {
    if (filter == '') {
      return fetchAnswers();
    }

    let query;

    if (filter === 'yuqori_daraja') {
      query = 'minPercentage=80&maxPercentage=190';
    }

    if (filter === 'kuchli_daraja') {
      query = 'minPercentage=60&maxPercentage=79';
    }

    if (filter === 'kuchsiz_daraja') {
      query = 'minPercentage=40&maxPercentage=59';
    }

    if (filter === 'past_daraja') {
      query = 'minPercentage=0&maxPercentage=39';
    }

    let { data } = await axios.get(`/results/search?${query}`);
    setResultData(data)
  }

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  useEffect(() => {
    fetchAnswers();
  }, [page, limit]);

  async function fetchAnswers() {
    try {
      let { data } = await axios.get(`/results/all?limit=${limit}&page=${page}`);
      setPaginationData(data);
      setResultData(data.results);
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteConfirm = async () => {
    await axios.delete(`/results/delete/${selectedUser._id}`);
    setResultData(resultData.filter((row) => row._id !== selectedUser._id));
    setDeleteDialogOpen(false);
  };

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  async function handleSearch() {
    if (searchTerm == '') {
      return fetchAnswers();
    }

    let { data } = await axios.get(`/results/search?name=${searchTerm}`);
    setResultData(data);
  }

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table aria-labelledby="tableTitle">
          <OrderTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {resultData.map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow hover role="checkbox" sx={{ '&:last-child td, &:last-child th': { border: 0 } }} tabIndex={-1} key={index}>
                  <TableCell>{row.user?.name}</TableCell>
                  <TableCell align="left">{Math.trunc(row.correctPercentage)}%</TableCell>
                  <TableCell>
                    <OrderStatus correctPercentage={row.correctPercentage} />
                  </TableCell>
                  <TableCell align="left">
                    <NumericFormat value={row.correctCount} displayType="text" thousandSeparator />
                  </TableCell>
                  <TableCell align="left">
                    <Tooltip title="Ochish">
                      <RouterLink to={`/result/${row._id}`}>
                        <IconButton size="small" sx={{ color: '#1976d2' }}>
                          <ExternalLink size={18} />
                        </IconButton>
                      </RouterLink>
                    </Tooltip>
                    <Tooltip title="O'chirish">
                      <IconButton size="small" onClick={() => handleDeleteClick(row)} sx={{ color: '#d32f2f' }}>
                        <Trash2 size={18} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
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
    </Box>
  );
}

OrderTableHead.propTypes = { order: PropTypes.any, orderBy: PropTypes.string };

OrderStatus.propTypes = { status: PropTypes.number };
