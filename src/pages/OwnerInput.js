import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { addOwner, getListOwners } from '../Service/OwnerService';
import { getListOfShop } from '../Service/ShopService';

let initialValues = {
  // id: 0,
  ownerName: '',
  mobileNo: '',
  address: '',
  forWork:'',
  date:''
  
}
const shop = [];


const OwnerInput=()=> {
  const [owner, setOwner] = React.useState(initialValues)
  const [shop, setShop] = React.useState([0])
  const onValueChange = (e) => {
    setOwner({ ...owner, [e.target.name]: e.target.value });
}

const addOwnerDetails = async () => { 
      await addOwner(owner);
}

React.useEffect(() => {
  getShopList();
}, []);

const getShopList = async () => {
  let response = await getListOfShop();
  setShop(response.data)
 
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
              name=''
              label="Shop Name"
              id="outlined-size-small"
              size="small"     
              onChange={(e) => onValueChange(e)}        
      /> 
       <TextField 
              required
              name='ownerName'
              label="Tenants Name"
              id="outlined-size-small"
              size="small" 
              onChange={(e) => onValueChange(e)} 
              value={owner.ownerName}           
      />   
       <TextField 
              required
              name='mobileNo'
              type='number'
              label="Moble number"
              id="outlined-size-small"
              size="small"    
              onChange={(e) => onValueChange(e)}       
              value={owner.mobileNo}   
      />   
       <TextField 
              required
              name='address'
              label="Address"
              id="outlined-size-small"
              size="small"    
              onChange={(e) => onValueChange(e)}     
              value={owner.address}     
      /> 
       <TextField 
              required
              name='forWork'
              label="Purpose"
              id="outlined-size-small"
              size="small"   
              onChange={(e) => onValueChange(e)}     
              value={owner.forWork}      
      />   
       <TextField 
              required
              name='date'
              type='date'
              id="outlined-size-small"
              size="small"  
              onChange={(e) => onValueChange(e)} 
              value={owner.date}                          
      />      
       <FormControl sx={{ width: "220px", marginLeft: "10px" }}>
                            {/* {errors.empPosition && <p style={{ color: "red" }}>{errors.empPosition}</p>} */}
                            <InputLabel id="demo-simple-select-label">Select Shop</InputLabel>
                            <Select
                                style={{ width: '199px', height: '40px', marginTop: '8px' }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Position"
                                name='empPosition'
                                onChange={(e) => onValueChange(e)}
                            >
                              {shop.map(item =>{
                                return(
                                  <MenuItem value={item.id}>{item.nameofshop}</MenuItem>
                                )
                              })}
                            </Select>
                        </FormControl>
      <Button onClick={() => addOwnerDetails()}>Save</Button>   
    </Box>
  );
}
export default OwnerInput;