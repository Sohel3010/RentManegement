import React from "react";
import { getListOfRent } from "../Service/RentService";
import Header from "./Header";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { Alert, AlertTitle, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Icon, TextField } from '@mui/material';
import OwnerInput from "./OwnerInput";

const columns = [

    { id: 'sr', label: 'Sr No' },
    { id: 'id', label: 'Rent Id' },
    { id: 'amount', label: 'Amount' },
    { id: 'paid', label: 'Paid' },
    { 
        id: 'user_id', 
        label: 'User Id' 
        
    },
    { id: 'year', label: 'Year' },
    { 
        id: 'shop_owner_id', 
        label: 'Shop Owner Id' 
    },
    {
        id: 'status',
        label: 'Status',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'paymentType',
        label: 'Payment Type',
        format: (value) => value.toFixed(2),
    },
];
// const rows = [];
const Rent = () => {
    React.useEffect(() => {
        getRent();
    }, []);

    const getRent = async () => {
        let response = await getListOfRent();
        console.log(response.data);
        setRent(response.data);
    }
    
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRent] = React.useState([0]);
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
            <Header />
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

                        <OwnerInput />
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
                                    // align={column.align}
                                    // style={{ minWidth: column.minWidth }}
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

                                            <TableCell  >
                                                {index + 1}

                                            </TableCell>


                                            <TableCell key={obj.id} >
                                                {obj.id}
                                            </TableCell>
                                            <TableCell key={obj.amount} >
                                                {obj.amount}
                                            </TableCell>
                                            <TableCell key={obj.paid} >
                                                {obj.paid}
                                            </TableCell>
                                          
                                            <TableCell key={obj.user?.id}>
                                                {obj.user?.id}
                                            </TableCell>
                                            <TableCell key={obj.year} >
                                                {obj.year}
                                            </TableCell>    

                                            <TableCell key={obj.shopOwner?.id}>
                                                {obj.shopOwner?.id}
                                            </TableCell>    
                                           
                                            
                                            <TableCell key={obj.status} >
                                                {
                                                    obj.status === 1 ? 'ACTIVATED' : 'DEACTIVATED'
                                                }
                                            </TableCell>

                                            <TableCell key={obj.paymentType} >
                                                {obj.paymentType}
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
        
    )
}

export default Rent;