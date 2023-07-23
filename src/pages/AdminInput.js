import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Alert, AlertTitle, Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { addUser } from '../Service/Api';


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
const AdminInput=()=>{
  const [admin, setAdmin] = React.useState(initialValues)
  const [save,setSave] = React.useState(false);

  const onValueChange = (e) => {
    setAdmin({...admin, [e.target.name]: e.target.value });
}

// Add Admin
const addAdminDetails = async () => {
      await addUser(admin);
      setSave(true);

}


// close pop-up to save
const closeSave=()=>{
  setSave(false);
  window.location.reload();
  
}
  return (
    <>
    <form>
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
    <TextField 
              onChange={(e) => onValueChange(e)}      
              required
              name='firstName'
              label="First Name"
              id="outlined-size-small"
              size="small"     
              value={admin.firstName}   
      /> 
       <TextField 
              onChange={(e) => onValueChange(e)} 
              required
              name='middleName'
              label="Middle Name"
              id="outlined-size-small"
              size="small" 
              value={admin.middleName}           
      />   
       <TextField 
              onChange={(e) => onValueChange(e)}       
              required
              name='lastName'
              label="Last Name"
              id="outlined-size-small"
              size="small"    
              value={admin.lastName}   
      />   
       <TextField 
              required
              name='empPosition'
              label="Position"
              id="outlined-size-small"
              size="small"    
              onChange={(e) => onValueChange(e)}     
              value={admin.empPosition}     
      /> 
       <TextField 
              required
              name='email'
              label="Email"
              id="outlined-size-small"
              size="small"   
              onChange={(e) => onValueChange(e)}     
              value={admin.email}      
      />   
       <TextField 
              required
              name='mobileNo'
              type='number'
              id="outlined-size-small"
              size="small" 
              label="Mobile number" 
              onChange={(e) => onValueChange(e)} 
              value={admin.mobileNo}                          
      />      
       <div style={{marginTop:"10px"}}>
      <Button onClick={() => addAdminDetails()} style={{marginRight:"30px"}}>Save</Button>   
      <Button onClick={closeSave}>Cancel</Button>
      </div>

      <Dialog open={save}>
                    <DialogTitle>
                        <Alert severity="success">
                            <AlertTitle>Success</AlertTitle>
                            Admin Registered — <strong>check it out!</strong>
                        </Alert>

                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={closeSave}>Okay</Button>
                    </DialogActions>
                </Dialog>
    </Box>
    </form>
    </>
  );
}
export default AdminInput;