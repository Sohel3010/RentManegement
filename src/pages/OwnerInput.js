import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Alert, AlertTitle, Button, Dialog, DialogActions, DialogTitle, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { addOwner, getListOwners } from '../Service/OwnerService';
import { getListOfShop } from '../Service/ShopService';

let initialValues = {
  id: 0,
  ownerName: '',
  mobileNo: '',
  address: '',
  forWork:'',
  date:'',
  shopId:0
  
}
const shop = [];


const OwnerInput=()=> {
  const [owner, setOwner] = React.useState(initialValues)
  const [shop, setShop] = React.useState([0])
  const [save,setSave] = React.useState(false);

  const onValueChange = (e) => {
    setOwner({ ...owner, [e.target.name]: e.target.value });
}

const addOwnerDetails = async () => { 
      await addOwner(owner);
      setSave(true);
}

// close save
const closeSave=()=>{
  setSave(false);
  window.location.reload();
}

React.useEffect(() => {
  getShopList();
}, []);

const getShopList = async () => {
  let response = await getListOfShop();
  setShop(response.data)
 
}
const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
    {/* <TextField 
              required
              name=''
              label="Shop Name"
              id="outlined-size-small"
              size="small"     
              onChange={(e) => onValueChange(e)}        
      />  */}
       <TextField 
              required
              name='ownerName'
              label="Tenants Name"
              id="outlined-size-small"
              size="small" 
              onChange={(e) => onValueChange(e)} 
              value={owner.ownerName}  
              error={owner.ownerName==" "} 
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
                                name='shopId'
                                onChange={(e) => onValueChange(e)}
                                MenuProps={MenuProps}
                            >
                              {shop.map(item =>{
                                return(
                                  <MenuItem value={item.id}>{item.shopName}</MenuItem>
                                )
                              })}
                            </Select>
                        </FormControl>
      <Button onClick={() => addOwnerDetails()}>Save</Button>   

      <Dialog open={save}>
                    <DialogTitle>
                        <Alert severity="success">
                            <AlertTitle>Success</AlertTitle>
                            Owner Registered — <strong>check it out!</strong>
                        </Alert>

                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={closeSave}>Okay</Button>
                    </DialogActions>
                </Dialog>
    </Box>
  );
}
export default OwnerInput;