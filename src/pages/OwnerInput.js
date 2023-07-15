import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

let initialValues = {
  id: 0,
  ownerName: '',
  mobileNo: '',
  address: '',
  forWork:'',
  date:''
  
}

const OwnerInput=()=> {
  const [owner, setOwner] = React.useState(initialValues)
  const onValueChange = (e) => {
    setOwner({ ...owner, [e.target.name]: e.target.value });
    console.log();
}
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
    <TextField 
              required
              label="Shop Name"
              id="outlined-size-small"
              size="small"     
              onChange={(e) => onValueChange(e)}        
      /> 
       <TextField 
              required
              label="Tenants Name"
              id="outlined-size-small"
              size="small" 
              onChange={(e) => onValueChange(e)}            
      />   
       <TextField 
              required
              type='number'
              label="Moble number"
              id="outlined-size-small"
              size="small"    
              onChange={(e) => onValueChange(e)}         
      />   
       <TextField 
              required
              label="Address"
              id="outlined-size-small"
              size="small"    
              onChange={(e) => onValueChange(e)}         
      /> 
       <TextField 
              required
              label="Purpose"
              id="outlined-size-small"
              size="small"   
              onChange={(e) => onValueChange(e)}          
      />   
       <TextField 
              type='date'
              required
              id="outlined-size-small"
              size="small"  
              onChange={(e) => onValueChange(e)}                          
      />         
    </Box>
  );
}
export default OwnerInput;