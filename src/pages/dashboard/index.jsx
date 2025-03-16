// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import AvatarGroup from '@mui/material/AvatarGroup';

// project import
import OrdersTable from './OrdersTable';
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

// assets
import axios from 'axios';
import avatar1 from 'assets/images/users/avatar-1.png';

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Filter, Search } from 'lucide-react';
import PageLoader from 'components/loader/PageLoader';
import { IconButton, InputAdornment, Menu, MenuItem, TablePagination, TextField, Tooltip } from '@mui/material';


// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function DashboardDefault() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [paginationData, setPaginationData] = useState([]);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = (status) => {
    setFilterAnchorEl(null);
    if (status !== undefined) {
      setFilter(status);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeLimit = (event) => {
    setLimit(event.target.value);
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    fetchStatistics();
  }, []);

  async function fetchStatistics() {
    setLoading(true);
    try {
      let { data } = await axios.get('/dashboard/results');
      setData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function getIntegerPart(num) {
    return Math.trunc(num);
  }


  if (loading === true) {
    return <PageLoader />;
  }

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Boshqaruv paneli</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce
          title="Yuqori daraja"
          count={String(data.yuqoriDaraja?.count || 0)}
          percentage={Number(data.yuqoriDaraja?.percentage) < 1 ? '0' : getIntegerPart(data.yuqoriDaraja?.percentage || "0")}
          isLoss={true}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce
          title="Kuchli daraja"
          count={String(data.kuchliDaraja?.count || 0)}
          percentage={Number(data.kuchliDaraja?.percentage) < 1 ? '0' : getIntegerPart(data.kuchliDaraja?.percentage || "0")}
          isLoss={true}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce
          title="Past daraja"
          count={String(data.pastDaraja?.count || 0)}
          percentage={Number(data.pastDaraja?.percentage) < 1 ? '0' : getIntegerPart(data.pastDaraja?.percentage || "0")}
          isLoss={false}
          color="warning"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce
          title="Kuchsiz daraja"
          count={String(data.kuchsizDaraja?.count || 0)}
          percentage={Number(data.kuchsizDaraja?.percentage) < 1 ? '0' : getIntegerPart(data.kuchsizDaraja?.percentage || "0")}
          isLoss={false}
          color="warning"
        />
      </Grid>
      {/* row 3 */}
      <Grid item xs={12} md={7} lg={8}>
        <Stack direction="row" spacing={2} mb={3} alignItems="center">
          <TextField
            fullWidth
            placeholder="Qidirish..."
            variant="outlined"
            size="small"
            autoComplete="off"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ maxWidth: 500 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={20} />
                </InputAdornment>
              )
            }}
          />
          <Tooltip title="Filter">
            <IconButton onClick={handleFilterClick}>
              <Filter size={20} />
            </IconButton>
          </Tooltip>
        </Stack>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Test natijalari</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <OrdersTable limit={limit} page={page} setPaginationData={setPaginationData} searchTerm={searchTerm} filter={filter} />
        </MainCard>
        <TablePagination
          component="div"
          count={paginationData.totalResults}
          rowsPerPage={paginationData.totalPages}
          page={paginationData.currentPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeLimit}
          rowsPerPageOptions={[5, 10, 25]}
          nextIconButtonProps={{
            disabled: paginationData.totalPages <= page
          }}
          backIconButtonProps={{
            disabled: paginationData.currentPage <= 1
          }}
          sx={{
            '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
              margin: 0
            }
          }}
        />
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Typography variant="h5">Muammo bo'lsa</Typography>
        <MainCard sx={{ mt: 2 }}>
          <Stack spacing={3}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Stack>
                  <Typography variant="h5" noWrap>
                    Yordam & qo'llab-quvvatlash
                  </Typography>
                  <Typography variant="caption" color="secondary" noWrap>
                    Dasturchiga savol yo'llashingiz mumkin
                  </Typography>
                </Stack>
              </Grid>
              <Grid item>
                <AvatarGroup sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
                  <Avatar alt="Remy Sharp" src={avatar1} />
                </AvatarGroup>
              </Grid>
            </Grid>
            <Link to={'/support'} size="small" variant="contained" sx={{ textTransform: 'capitalize' }}>
              Yordam kerakmi?
            </Link>
          </Stack>
        </MainCard>
      </Grid>

      <Menu anchorEl={filterAnchorEl} open={Boolean(filterAnchorEl)} onClose={() => handleFilterClose()}>
        <MenuItem onClick={() => handleFilterClose('')}>Barchasi</MenuItem>
        <MenuItem onClick={() => handleFilterClose('yuqori_daraja')}>Yuqori daraja</MenuItem>
        <MenuItem onClick={() => handleFilterClose('kuchli_daraja')}>Kuchli daraja</MenuItem>
        <MenuItem onClick={() => handleFilterClose('past_daraja')}>Past daraja</MenuItem>
        <MenuItem onClick={() => handleFilterClose('kuchsiz_daraja')}>Kuchsiz daraja</MenuItem>
      </Menu>
    </Grid>
  );
}
