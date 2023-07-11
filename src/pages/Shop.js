import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, TextField } from '@mui/material';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    const [post, setPost] = React.useState(null);
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

export default function Shop() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
                            label="First Name"
                            id="outlined-size-small"
                            size="small"
                        />
                    </div>
                    <div>
                        <TextField
                            label="Middel Name"
                            id="outlined-size-small"
                            size="small"
                        />
                    </div>
                    <div>
                        <TextField
                            label="Last Name"
                            id="outlined-size-small"
                            size="small"
                        />
                    </div>


                    <div>
                        <TextField
                            label="Position"
                            id="outlined-size-small"
                            size="small"
                        />
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
                        <TextField
                            label="Email"
                            id="outlined-size-small"
                            size="small"
                        />
                    </div>
                    <div>
                        <TextField
                            label="Password"
                            id="outlined-size-small"
                            size="small"
                        />

                    </div>
                    <div>
                        <TextField
                            label="Mobile Number"
                            id="outlined-size-small"
                            size="small"
                        />
                    </div>
                    <div>
                        <TextField 
                            label="Salary"
                            id="outlined-size-small"
                            size="small"
                        />
                    </div>
                </Box>
                <Button variant="contained" >
                    Send
                </Button>
                <br />
                <br />
                <hr />
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