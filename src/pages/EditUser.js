import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { getUser} from '../Service/Api';
import { useParams } from 'react-router-dom';

const initialValues = {
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



const EditUser = () => {
    const [user, setUser] = React.useState(initialValues)
    const {id} = useParams();

    const onValueChange = (e) => {
        console.log(e.target.name, e.target.value);
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // React.useEffect(()=>{
    //     addUpdateData();
    // },[])
    // update data
    // const addUpdateData = async () => {
    //    let response =  await updateUser(id);
    //    setUser(response.data);
    //    console.log(response);
    //     // await addUser(user);
       
    // }
    return (
        <Box sx={{ width: '100%' }}>


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
                        <TextField onChange={(e) => onValueChange(e)}
                            name='middelName'
                            label="Middel Name"
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
                                // value={user}
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
            <Button variant="contained" >Done</Button>
            {/* onClick={() => addUpdateData()} */}
            </TabPanel>
        </Box>

    );
}
export default EditUser;