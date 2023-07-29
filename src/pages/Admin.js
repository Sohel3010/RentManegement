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
import { Alert, AlertTitle, Button, Dialog, DialogActions, DialogContent, DialogTitle, Icon } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { deleteUser, getUser, updateUser } from '../Service/Api';
import AdminInput from './AdminInput';
import { AdminModel } from './AdminModel';


const columns = [
  { id: 'srNumber', label: 'Sr.No' },
  { id: 'admin.firstName', label: 'First Name' },
  { id: 'admin.middleName', label: 'Middle Name' },
  {
    id: 'admin.lastName', label: 'Last Name',
  },
  {
    id: 'admin.empPosition', label: 'Position',
  },
  {
    id: 'admin.email',
    label: 'Email',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'admin.mobileNo',
    label: 'Mobile Number',
  },
  {
    id: 'mark',
    label: 'Mark',
  },

];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}


const items = [];

const Admin = () => {

  React.useEffect(() => {

    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    let response = await getUser();
    setAdmin(response.data)

  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [admin, setAdmin] = React.useState([0]);
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
  const [open, setOpen] = React.useState(false);
  const [deletePop, setDeletePop] = React.useState(false);
  const [editPop,setEditPop]=React.useState(false)
  const [value,setValue]=React.useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };

  // delete Admin
  const deleteAdmin = async (id) => {
    setDeletePop(true);
    await deleteUser(id);
  }

   // Update or Edit owner details
   const getAdminData = async (id) => {
    let response = await updateUser(id);
    setAdminById(response.data);
    setEditPop(true)
}

const editOnerPop=()=>{
  setEditPop(true)
}

function setAdminById(data) {
  AdminModel.id=data.id;
  AdminModel.firstName=data.firstName;
  AdminModel.middleName=data.middleName;
  AdminModel.lastName=data.lastName;
  AdminModel.empPosition=data.empPosition;
  AdminModel.email=data.email;
  AdminModel.mobileNo=data.mobileNo;
  setValue(AdminModel)
}
  return (
    <>
    {/* UPDATE ADMIN */}
    <Dialog open={editPop} onClose={handleClose}>
        <DialogTitle>Edit Owner Details</DialogTitle>
        <DialogContent>
          <AdminInput/>
        </DialogContent>
    </Dialog>
      <Header />
      <div>
        <Icon color="primary"
          style={styles}
          onClick={() => handleClickOpen()}
        >add_circle</Icon>

      </div>
      {/* Delete pop-up */}
      <div>
        <Dialog open={deletePop}>
          <DialogTitle>
            <Alert severity="success">
            <AlertTitle>Delete successfully ! </AlertTitle>
          </Alert>
          </DialogTitle>
          <DialogActions>
          <Button onClick={handleClose}>Okay</Button>
        </DialogActions>
        </Dialog>
      </div>

      {/* Save pop-up */}
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Admin Details</DialogTitle>
          <DialogContent>
            <AdminInput />
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
              {admin
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((obj, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={obj.id}>
                      <TableCell  >
                        {index + 1}
                      </TableCell>
                      <TableCell key={obj.firstName}>
                        {obj.firstName}
                      </TableCell>
                      <TableCell key={obj.middleName} >
                        {obj.middleName}
                      </TableCell>
                      <TableCell key={obj.lastName} >
                        {obj.lastName}
                      </TableCell>
                      <TableCell key={obj.empPosition} >
                        {obj.empPosition}
                      </TableCell>
                      <TableCell key={obj.email} >
                        {obj.email}
                      </TableCell>
                      <TableCell key={obj.mobileNo} >
                        {obj.mobileNo}
                      </TableCell>
                      <TableCell key={obj.forWork} >
                        <DeleteIcon onClick={() => deleteAdmin(obj.id)} style={{ marginRight: "50px" }} />
                        <EditIcon onClick={()=>getAdminData(obj.id)}/>
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
          count={admin.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
export default Admin;