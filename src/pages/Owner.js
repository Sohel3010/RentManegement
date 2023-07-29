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
import { deleteOwner, getListOwners, updateOwner } from '../Service/OwnerService';
import { Alert, AlertTitle, Button, Dialog, DialogActions, DialogContent, DialogTitle, Icon } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import OwnerInput from './OwnerInput';
import { OwnerModel } from './OwnerModel';


const columns = [
  { id: 'srNumber', label: 'Sr.No' },
  { id: 'shop.nameofshop', label: 'Shop Name' },
  { id: 'ownerName', label: 'Tenant Name' },
  {
    id: 'mobileNo',
    label: 'Mobile Number',
    format: (value) => value.toLocaleString('en-US'),
  },
  
  {
    id: 'year',
    label: 'Year',
  },
  {
    id: 'action',
    label: 'Action',
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
    console.log((response.data));
   
  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setOwners] = React.useState([0]);
  const [value,setValue]=React.useState(0);
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
  // SAVE POP-UP
  const [open, setOpen] = React.useState(false);
  // DELETE POP-UP
  const [deletePop,setDeletePop]=React.useState(false);
  // UPDATE OR EDIT
  const [editPop,setEditPop]=React.useState(false);
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Delete Owner Details
  const deleteOwnerData = async (id) => {
    await deleteOwner(id);
    setDeletePop(true)
}

  const deleteOwnerDataClose=()=>{
    setDeletePop(false);
    window.location.reload();
  }

  // Update or Edit owner details
  const getOwnerData = async (id) => {
    let response = await updateOwner(id);
    setOwnerById(response.data);
    setEditPop(true)
}

const editOnerPop=()=>{
  setEditPop(true)
}

function setOwnerById(data) {
  OwnerModel.id=data.id;
  OwnerModel.ownerName=data.ownerName;
  OwnerModel.mobileNo=data.mobileNo;
  OwnerModel.address=data.address;
  OwnerModel.year=data.year;
  OwnerModel.date=data.date;
  OwnerModel.shopName=data.shopName;
  setValue(OwnerModel)
}

  return (
    <>
    {/* UPDATE OR EDIT POP-UP */}
    <Dialog open={editPop} onClose={handleClose}>
        <DialogTitle>Edit Owner Details</DialogTitle>
        <DialogContent>
          <OwnerInput/>
        </DialogContent>
    </Dialog>

    {/* DELETE POP-UP */}
    <div>
      <Dialog open={deletePop} onClose={handleClose}>
      <DialogTitle>
          <Alert severity="success">
           <AlertTitle>Delete successfully ! </AlertTitle>
          </Alert>
      </DialogTitle>
        <DialogActions>
          <Button onClick={deleteOwnerDataClose}>Okay</Button>
        </DialogActions>
      </Dialog>
      </div>
      <Header/>
      <div>        
      <Icon color="primary"
          style={styles}
          onClick={() => handleClickOpen()}
        >add_circle</Icon>
        
      </div>

      {/* SAVE POP-UP */}
      <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Owner Details</DialogTitle>
        <DialogContent>
          <OwnerInput/>
        </DialogContent>
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
                .map((obj,index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={obj.id}>

                      <TableCell  >
                        {index+1}                        
                      </TableCell>
                      <TableCell  >
                        {obj.shop?.shopName}                        
                      </TableCell>
                      <TableCell key={obj.ownerName} >
                        {obj.ownerName}
                      </TableCell>
                      <TableCell key={obj.mobileNo} >
                        {obj.mobileNo}
                      </TableCell>
                      <TableCell key={obj.year} >
                        {obj.year}
                      </TableCell>
                      <TableCell>
                        <DeleteIcon onClick={() => deleteOwnerData(obj.id)} style={{ marginRight: "50px" }} />
                        <EditIcon onClick={()=>getOwnerData(obj.id)}/>
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