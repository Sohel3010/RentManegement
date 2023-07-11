import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Alert, AlertTitle, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField, styled } from '@mui/material';
import { addUser, successMsg, updateUser } from '../Service/Api';
import { getUser } from '../Service/Api';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useParams } from 'react-router-dom';
let initialValues = {
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



function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Admin = () => {
    const [user, setUser] = React.useState(initialValues)
    const [users, setUsers] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const { id } = useParams();

    const onValueChange = (e) => {
        // console.log(e.target.name, e.target.value);
        setUser({ ...user, [e.target.name]: e.target.value });
    }
    const addUserDetails = async (event) => {
        await addUser(user);
        setOpen(true);
    }

    React.useEffect(() => {
        getUserDetails();
    }, [])

    const getUserDetails = async () => {
        let response = await getUser();
        console.log(response);
        setUsers(response.data)
    }

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // pop-up
    const handleClose = () => {
        getUserDetails();
        setOpen(false);
    };

    React.useEffect(() => {
        getUserData();
    }, [])

    const getUserData = async () => {
        let response = await updateUser(id);
        console.log(response);
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} variant='fullWidth' onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="User Details" {...a11yProps(0)} />
                    <Tab label="Item Three" {...a11yProps(1)} />
                    <Tab label="User" {...a11yProps(2)} />
                    <Tab label="User Details" {...a11yProps(3)} />
                    <Tab label="Item Three" {...a11yProps(4)} />
                </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
                
                    <Box display="flex"
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },

                        }}
                        noValidate
                        autoComplete="off"
                    >


                        <div>

                            <TextField
                                onChange={(e) => onValueChange(e)}
                                name='firstName'
                                label="First Name"
                                id="outlined-size-small"
                                size="small"
                            />
                        </div>

                        <div>
                            <TextField
                                onChange={(e) => onValueChange(e)}
                                name='middleName'
                                label="First Name"
                                id="outlined-size-small"
                                size="small"
                            />
                        </div>
                        <div>
                            <TextField onChange={(e) => onValueChange(e)}
                                name='lastName'
                                label="Last Name"
                                id="outlined-size-small"
                                size="small"
                            />
                        </div>


                        <div>
                            {/* <TextField onChange={(e)=>onValueChange(e)}
                            name='position'
                            label="Position"
                            id="outlined-size-small"
                            size="small"
                        /> */}

                            <FormControl sx={{ width: "220px", marginLeft: "10px" }}>
                                <InputLabel id="demo-simple-select-label">Position</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    // value={FormData.position}
                                    label="Position"
                                    name='position'
                                    // onChange={handleChange}
                                    onChange={(e) => onValueChange(e)}
                                >
                                    <MenuItem value={"Developer"}>Developer</MenuItem>
                                    <MenuItem value={"Bussiness"}>Bussiness</MenuItem>
                                    <MenuItem value={"Classes"}>Classes</MenuItem>
                                    <MenuItem value={"Classes"}>Home</MenuItem>
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
                            <TextField onChange={(e) => onValueChange(e)}
                                name='email'
                                label="Email"
                                id="outlined-size-small"
                                size="small"
                                type='email'
                            />
                        </div>
                        <div>
                            <TextField onChange={(e) => onValueChange(e)}
                                name='password'
                                label="Password"
                                id="outlined-size-small"
                                size="small"
                                type='password'
                            />

                        </div>
                        <div>
                            <TextField onChange={(e) => onValueChange(e)}
                                name='mobileNo'
                                label="Mobile Number"
                                id="outlined-size-small"
                                size="small"
                                type='number'
                            />
                        </div>
                        <div>
                            <TextField onChange={(e) => onValueChange(e)}
                                name='salary'
                                label="Salary"
                                id="outlined-size-small"
                                size="small"
                                type='number'
                            />
                        </div>
                    </Box>

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
                    <Button type='submit' variant="contained" onClick={()=>addUserDetails()}>
                        SAVE
                    </Button>
                <br />
                <br />
                <hr />
                <br />
                <br />

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
                                        <DeleteIcon style={{ marginRight: "50px" }} />
                                        <EditIcon onClick={() => getUserData()} />
                                    </TableCell>

                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TabPanel>

            <TabPanel value={value} index={1}>
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item One
            </TabPanel>
            <TabPanel value={value} index={3}>

            </TabPanel>
            <TabPanel value={value} index={4}>

            </TabPanel>
        </Box>

    );
}
export default Admin;