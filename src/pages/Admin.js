import * as React from 'react';
import Box from '@mui/material/Box';
import { Alert, AlertTitle, Button, Dialog, DialogActions, DialogTitle, FormControl, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import { addUser, deleteUser, updateUser } from '../Service/Api';
import { getUser } from '../Service/Api';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Validation from './Validation';

let initialValues = {
    id: 0,
    firstName: '',
    middleName: '',
    lastName: '',
    empPosition: '',
    email: '',
    password: '',
    mobileNo: '',
    salary: '',
    status: '1'
}
const Admin = () => {
    const [user, setUser] = React.useState(initialValues)
    const [users, setUsers] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [deletes, setDeletes] = React.useState(false);


    const onValueChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }
    const addUserDetails = async () => {
        if (user.firstName !== "" && user.middleName !== "" && user.lastName !== "" && user.email !== ""
            && user.password !== "" && user.mobileNo !== "" && user.salary !== "" && user.empPosition !== "") {
            await addUser(user);
            setOpen(true);
        }
    }

    React.useEffect(() => {
        getUserDetails();
    }, [])

    const getUserDetails = async () => {
        let response = await getUser();
        setUsers(response.data)
    }

    const [value, setValue] = React.useState(0);

    function refreshPage() {
        window.location.reload(false);
    }
    // pop-up
    const handleClose = () => {
        refreshPage();
    };

    const getUserData = async (id) => {
        let response = await updateUser(id);
        setUserById(response.data);
    }

    const deleteUserData = async (id) => {
        setDeletes(true);
        await deleteUser(id);
        getUserDetails();
    }

    function setUserById(data) {
        initialValues.id = data.id;
        initialValues.firstName = data.firstName;
        initialValues.middleName = data.middleName;
        initialValues.lastName = data.lastName;
        initialValues.email = data.email;
        initialValues.password = data.password;
        initialValues.mobileNo = data.mobileNo;
        initialValues.empPosition = data.empPosition;
        initialValues.salary = data.salary;
        setValue(initialValues);
    }
    const [errors, setErrors] = React.useState({})
    function handleValidation(e) {
        e.preventDefault();
        setErrors(Validation(user));
    }
    return (
        <>
            <h1>User</h1>
            <hr></hr>
            <form onSubmit={handleValidation}>

                <Box display="flex"
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },

                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        {errors.firstName && <p style={{ color: "red" }}>{errors.firstName}</p>}
                        <TextField
                            onChange={(e) => onValueChange(e)}
                            name='firstName'
                            label="First Name"
                            id="outlined-size-small"
                            size="small"
                            value={user.firstName}
                        />
                    </div>

                    <div>
                        {errors.middleName && <p style={{ color: "red" }}>{errors.middleName}</p>}
                        <TextField
                            onChange={(e) => onValueChange(e)}
                            name='middleName'
                            label="Middle Name"
                            id="outlined-size-small"
                            size="small"
                            value={user.middleName}
                        />
                    </div>
                    <div>
                        {errors.lastName && <p style={{ color: "red" }}>{errors.lastName}</p>}
                        <TextField onChange={(e) => onValueChange(e)}
                            name='lastName'
                            label="Last Name"
                            id="outlined-size-small"
                            size="small"
                            value={user.lastName}
                        />
                    </div>


                    <div>
                        <FormControl sx={{ width: "220px", marginLeft: "10px" }}>
                            {errors.empPosition && <p style={{ color: "red" }}>{errors.empPosition}</p>}
                            <InputLabel id="demo-simple-select-label">Position</InputLabel>
                            <Select
                                style={{ width: '199px', height: '40px', marginTop: '8px' }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Position"
                                name='empPosition'
                                onChange={(e) => onValueChange(e)}
                            >
                                <MenuItem value={"Developer"}>Developer</MenuItem>
                                <MenuItem value={"Bussiness"}>Bussiness</MenuItem>
                                <MenuItem value={"Classes"}>Classes</MenuItem>
                                <MenuItem value={"Home"}>Home</MenuItem>
                                <MenuItem value={"Store"}>Store</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </Box>

                <Box display="flex"
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },

                    }}
                    noValidate
                    autoComplete="off">
                    <div>
                        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
                        <TextField onChange={(e) => onValueChange(e)}
                            name='email'
                            label="Email"
                            id="outlined-size-small"
                            size="small"
                            type='email'
                            value={user.email}
                        />
                    </div>
                    <div>
                        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
                        <TextField onChange={(e) => onValueChange(e)}
                            name='password'
                            label="Password"
                            id="outlined-size-small"
                            size="small"
                            type='password'
                            value={user.password}
                        />

                    </div>
                    <div>
                        {errors.mobileNo && <p style={{ color: "red" }}>{errors.mobileNo}</p>}
                        <TextField onChange={(e) => onValueChange(e)}
                            name='mobileNo'
                            label="Mobile Number"
                            id="outlined-size-small"
                            size="small"
                            type='number'
                            value={user.mobileNo}
                        />
                    </div>
                    <div>
                        {errors.salary && <p style={{ color: "red" }}>{errors.salary}</p>}
                        <TextField onChange={(e) => onValueChange(e)}
                            name='salary'
                            label="Salary"
                            id="outlined-size-small"
                            size="small"
                            type='number'
                            value={user.salary}
                        />
                    </div>

                </Box>
                <div>
                    <Button type='submit' variant="contained" onClick={() => addUserDetails()}
                        style={{ width: '50px', height: '40px', marginTop: '8px' }}>
                        SAVE
                    </Button>
                </div>
            </form>
            <Box sx={{ width: '100%' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Middel Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Position</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Mobile Number</TableCell>
                            <TableCell>Marks</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            users.map(user => (
                                <TableRow>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.firstName}</TableCell>
                                    <TableCell>{user.middleName}</TableCell>
                                    <TableCell>{user.lastName}</TableCell>
                                    <TableCell>{user.empPosition}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.mobileNo}</TableCell>
                                    <TableCell>
                                        <DeleteIcon onClick={() => deleteUserData(user.id)} style={{ marginRight: "50px" }} />
                                        <EditIcon onClick={() => getUserData(user.id)} />
                                    </TableCell>

                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
                <Dialog open={open}>
                    <DialogTitle>
                        <Alert severity="success">
                            <AlertTitle>Success</AlertTitle>
                            Shop Registered — <strong>check it out!</strong>
                        </Alert>

                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={handleClose}>Okay</Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={deletes}>
                    <DialogTitle>
                        <Alert severity="success">
                            <AlertTitle>Delete successfully ! </AlertTitle>
                        </Alert>

                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={handleClose}>Okay</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </>
    );
}
export default Admin;