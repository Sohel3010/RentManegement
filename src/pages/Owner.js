import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Header from './Header';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { getListOwners } from '../Service/OwnerService';
import { Alert, AlertTitle, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Icon, TextField } from '@mui/material';
// import { Button } from 'bootstrap';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import OwnerInput from './OwnerInput';


const columns = [
  { id: 'shop.nameofshop', label: 'Shop Name' },
  { id: 'ownerName', label: 'Tenant Name' },
  {
    id: 'mobileNo',
    label: 'Mobile Number',
    //minWidth: 170,
    //align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'status',
    label: 'Status',
    //minWidth: 170,
    //align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'forWork',
    label: 'Work',
    //minWidth: 170,
   // align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [];

const items = [];

const Owner = () => {

  React.useEffect(() => {

    getOwnerList();
  }, []);

  const getOwnerList = async () => {
    let response = await getListOwners();
    setOwners(response.data)
   
  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setOwners] = React.useState([0]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.black, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: '80%',
    width: '20%',
    marginTop: '10px',
    marginBottom: '5px',
    [theme.breakpoints.up('sm')]: {
      marginLeft: '80%',

      width: '20%',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));


  // POP-UP
  // Plus Icon
  const styles = {
    position: 'relative',
    top: "40px",
    marginLeft: "20px"

  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Header/>
      <div>
        
      <Icon color="primary"
          style={styles}
          onClick={() => handleClickOpen()}
        >add_circle</Icon>
        
      </div>
      <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Owner Details</DialogTitle>
        <DialogContent>
          {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          /> */}
          <OwnerInput/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Save</Button>
        </DialogActions>
      </Dialog>
      </div>
      <div>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
      </div>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((obj) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={obj.id}>

                      <TableCell  >
                        {obj.ownerName}
                        
                      </TableCell>


                      <TableCell key={obj.ownerName} >
                        {obj.ownerName}
                      </TableCell>
                      <TableCell key={obj.mobileNo} >
                        {obj.mobileNo}
                      </TableCell>
                      <TableCell key={obj.status} >
                        {obj.status}
                      </TableCell>
                      <TableCell key={obj.forWork} >
                        {obj.forWork}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
export default Owner;