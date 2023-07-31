import React from "react";
import { deleteRent, getListOfRent, updateRent } from "../Service/RentService";
import Header from "./Header";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import {
  Alert,
  AlertTitle,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Icon,
  TextField,
} from "@mui/material";
import RentInput from "./RentInput";
import { default as EditIcon } from "@mui/icons-material/Edit";
import { default as DeleteIcon } from "@mui/icons-material/Delete";
import { RentModel } from "./RentModel";

const columns = [
  { id: "sr", label: "Sr No" },
  { id: "id", label: "Shop Name" },
  {
    id: "shop_owner_name",
    label: "Tenant Name",
  },
  { id: "amount", label: "Amount" },
  { id: "paid", label: "Paid" },
  // {
  //   id: "remaining",
  //   label: "Remaining",
  // },
  { id: "userName", label: "User Name" },
  { id: "year", label: "Year" },

  {
    id: "status",
    label: "Status",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "paymentType",
    label: "Payment Type",
    format: (value) => value.toFixed(2),
  },
  {
    id: "action",
    label: "Action",
  },
];
const rows = [];

const Rent = () => {
  React.useEffect(() => {
    getRent();
  }, []);

  const getRent = async () => {
    let response = await getListOfRent();
    setRent(response.data);
    console.log(response.data);
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRent] = React.useState([0]);
  const [value, setValue] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.black, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: "80%",
    width: "20%",
    marginTop: "10px",
    marginBottom: "5px",
    [theme.breakpoints.up("sm")]: {
      marginLeft: "80%",

      width: "20%",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));

  // POP-UP
  // Plus Icon
  const styles = {
    position: "relative",
    top: "40px",
    marginLeft: "20px",
  };
  // SAVE RENT POP-UP
  const [open, setOpen] = React.useState(false);

  //DELETE RENT POP-UP
  const [deletePop, setDeletePop] = React.useState(false);

  // UPDATE OR EDIT
  const [editPop, setEditPop] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //RENT DELETE API CALL
  const deleteRentData = async (id) => {
    await deleteRent(id);
    setDeletePop(true);
  };

  const deleteRentDataClose = () => {
    setDeletePop(false);
    window.location.reload();
  };

  //RENT UPDATE API CALL
  const getRentData = async (id) => {
    let response = await updateRent(id);
    setRentById(response.data);
    setEditPop(true);
  };

  // const editOnerPop = () => {
  //   setEditPop(true);
  // };

  function setRentById(data) {
    RentModel.id = data.id;
    RentModel.shopOwner.ownerName = data.shopOwner.ownerName;
    RentModel.year = data.year;
    RentModel.amount = data.amount;
    RentModel.paid = data.paid;
    RentModel.user.userName = data.user.userName;
    RentModel.status = data.status;
    RentModel.rentType = data.rentType;
    setValue(RentModel);
  }

  return (
    <>
      {/* UPDATE OR EDIT POP-UP */}
      <Dialog open={editPop} onClose={handleClose}>
        <DialogTitle>Edit Rent Details</DialogTitle>
        <DialogContent>
          <RentInput />
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
            <Button onClick={deleteRentDataClose}>Okay</Button>
          </DialogActions>
        </Dialog>
      </div>

      <Header />

      <div>
        <Icon color="primary" style={styles} onClick={() => handleClickOpen()}>
          add_circle
        </Icon>
      </div>
      <div>
        <Dialog open={open} onClose={handleClose}>
          {/* <DialogTitle>Rent Details</DialogTitle> */}
          <DialogContent>
            <RentInput />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
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
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
      </div>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
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
                .map((obj, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={obj.id}>
                      <TableCell>{index + 1}</TableCell>

                      <TableCell key={obj.shopOwner?.shop?.shopName}>
                        {obj.shopOwner?.shop?.shopName}
                      </TableCell>
                      <TableCell key={obj.shopOwner?.ownerName}>
                        {obj.shopOwner?.ownerName}
                      </TableCell>
                      <TableCell>{obj.amount}</TableCell>
                      <TableCell key={obj.paid}>{obj.paid}</TableCell>

                      {/* <TableCell >
                        {obj.amount - obj.paid}
                      </TableCell> */}
                      <TableCell>{obj.user?.userName}</TableCell>
                      <TableCell key={obj.year}>{obj.year}</TableCell>

                      <TableCell key={obj.status}>
                        {obj.status === 1 ? "ACTIVATED" : "DEACTIVATED"}
                      </TableCell>

                      <TableCell key={obj.paymentType}>
                        {obj.paymentType}
                      </TableCell>
                      <TableCell>
                        <DeleteIcon
                          onClick={() => deleteRentData(obj.id)}
                          style={{ marginRight: "50px" }}
                        />
                        <EditIcon onClick={() => getRentData(obj.id)} />
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
};

export default Rent;
