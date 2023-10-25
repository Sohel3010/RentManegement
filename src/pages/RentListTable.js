import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { red } from "@mui/material/colors";
import { TablePagination } from "@mui/material";
import SearchInput from "./SearchInput";

function Row(props) {
  const { row, index } = props;
  const [open, setOpen] = React.useState(false);
 

  const formatDate = row.receiptDate;
  const formaredDate = formatDate.split('T')[0];
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="right">{index+1}</TableCell>
        <TableCell component="th" scope="row">
          {formaredDate}
        </TableCell>
        <TableCell align="right">{row.receiptNo}</TableCell>
        <TableCell align="right">{row.shopownerName}</TableCell>
        <TableCell>
          <CancelIcon style={{ marginRight: "20px" }} />

          <DeleteIcon style={{ marginRight: "20px", color: red[500] }}
          // onClick={printHandler}
           />

          <LocalPrintshopIcon color="primary" />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Year</TableCell>
                    <TableCell>Shop Name</TableCell>
                    <TableCell align="right">Payment Type</TableCell>
                    <TableCell align="right">Rent Amount</TableCell>
                    <TableCell align="right">Paid Amount</TableCell>
                    <TableCell align="right">Remaining Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.rentSlave.map((rentSlaveRow, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {rentSlaveRow.year}
                      </TableCell>
                      <TableCell>{rentSlaveRow.shopName}</TableCell>
                      <TableCell align="right">
                        {rentSlaveRow.paymentType === "R" ? "Rent" : "Deposit"}
                      </TableCell>
                      <TableCell align="right">
                        {rentSlaveRow.rentAmount}
                      </TableCell>
                      <TableCell align="right">{rentSlaveRow.paid}</TableCell>
                      <TableCell align="right">
                        {rentSlaveRow.remaining}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rowsPerPageOptions = [10, 25];
export default function RentListTable({
  rentList,
  tablePages,
  onPageChange,
  onRowsPerPageChange,
  searchData,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    onPageChange(newPage +1);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    // onPageChange(1);
    // onRowsPerPageChange(newRowsPerPage);
  };

  return (
    <>
    <div>
    <SearchInput searchData={searchData} />
    </div>
      <Paper>
        <TableContainer style={{ marginTop: "40px" }}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Sr No</TableCell>
                <TableCell align="right">receipt Date</TableCell>
                <TableCell align="right">receiptNo</TableCell>
                <TableCell align="right">shopownerName</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rentList.map((row, index) => (
                <Row key={row.index} row={row} index={index} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <TablePagination
        component="div"
        count={tablePages}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
      />
    </>
  );
}
